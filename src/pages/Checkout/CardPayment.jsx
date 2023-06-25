import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, Suspense, lazy, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
import { REMOVE_ALL_ITEM_FROM_CART } from "../../Context/Actions/ActionType";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Toast_Config_Option } from "../../global/Toast_Config";
import { BASE_URL } from "../../global/Base_URL";
import ConfirmPaymentIntent from "../../utils/ConfirmPaymentIntent";
import OrderSuccess from "../../Components/OrderSuccess";

export default function CardPayment() {
  //   ---------------- All state goes here  ---------------------------- //
  const { productItems } = useSelector((state) => state.Cart);
  const [formErrors, setFormErrors] = useState({});
  const [formComplete, setFormComplete] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [payment_type, setPayment_type] = useState("CARD");
  const payment_btn = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const [searchParams] = useSearchParams();
  const [ProductId, setProductId] = useState(searchParams.get('ProductId'))
  const [quantity, setQuantity] = useState(Number(searchParams.get('quantity')))
  const [varientId, setVarientId] = useState(searchParams.get('varientId'))
  const { user_address } = useSelector(state => state.Address)
  const { user_data } = useSelector(state => state.User)
  const [orderModal, setOrderModal] = useState(true)


  const ToggleOrderModal = (state) => {
    setOrderModal(!state)
  }

  const products = [];

  if (ProductId) {
    if (varientId) {
      products.push({
        ProductId,
        quantity,
        varientId,
      })
    }
    else {
      products.push({
        ProductId,
        quantity,
      })
    }

  }


  const CartProduct = () => {
    if (productItems.length > 0) {
      productItems.forEach((element) => {
        if (element.hasOwnProperty('ProductvarientId')) {
          products.push({
            ProductId: element.ProductId,
            varientId: element.ProductvarientId,
            quantity: element.quantity,
          });
        }
        else {
          products.push({
            ProductId: element.ProductId,
            quantity: element.quantity
          })
        }
      });
    }
  }

  if (!ProductId) {
    CartProduct();
  }


  function handleServerResponse(response) {
    if (response.error) {
      toast.error(error, Toast_Config_Option)
      return;
    } else if (response.next_action) {
      handle3DSecureAction(response)
      return;
    } else {
      if (!ProductId) {
        dispatch({ type: REMOVE_ALL_ITEM_FROM_CART });
      }
      const NewSearchParams = new URLSearchParams();
      NewSearchParams.set('payment', 'online')
      navigate({ pathname: "/v2/order/response", search: `?${NewSearchParams}` })
      sessionStorage.removeItem('checkOutSession')
    }
  }

  const handle3DSecureAction = async (response) => {
    const { error, paymentIntent } = await stripe.handleCardAction(response.client_secret);
    if (error) {
      toast.error(error.message, Toast_Config_Option)
      ConfirmPaymentIntent(error.payment_intent.id,error.payment_method.id);
      return;
    }
    const ConfirmPayment = await ConfirmPaymentIntent(paymentIntent.id, paymentIntent.payment_method);

    if (!ConfirmPayment.ok) {
      const { error } = await confirmOrderResponse.json();
      setIsLoading(false);
      toast.error(error, Toast_Config_Option);
      return;
    }

    const { data } = await ConfirmPayment.json();
    handleServerResponse(data)
  }

  const SubmitHandler = async () => {
    setIsLoading(true);

    try {
      if (!stripe || !elements) return;

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city: user_address.city,
            state: user_address.State,
            line1: user_address.Street,
            line2: user_address.Area,
            postal_code: user_address.pincode,
            country: 'IN'
          },
          name: user_data.name,
          email: user_data.email
        }
      })

      if (error) {
        toast.error(error.message, Toast_Config_Option)
        payment_btn.current.disabled = false
        return;
      }

      const paymentIntentResponse = await fetch(`${BASE_URL}/v3/api/order/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          payment_type,
          paymentMethodId: paymentMethod.id
        }),
        credentials: "include",
      });

      if (!paymentIntentResponse.ok) {
        const { error } = await paymentIntentResponse.json();
        setIsLoading(false);
        toast.error(error, Toast_Config_Option);
        return;
      }

      const { client_secret, paymentIntentId } = await paymentIntentResponse.json();

      const ConfirmPayment = await ConfirmPaymentIntent(paymentIntentId, paymentMethod.id);

      if (!ConfirmPayment.ok) {
        const { error } = await confirmOrderResponse.json();
        setIsLoading(false);
        return toast.error(error, Toast_Config_Option);
      }

      const { data } = await ConfirmPayment.json();
      handleServerResponse(data)
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message ? error.message : error, Toast_Config_Option);
      setIsLoading(false);
    }
  };


  return (
    <Fragment>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          SubmitHandler();
        }}
      >
        <div className="card_number_field my-2">
          <label className="text-sm block font-medium">Card Number</label>
          <CardNumberElement
            onChange={(event) => {
              if (event.error) {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  CardNumberError: event.error.message,
                }));
              } else {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  CardNumberError: "",
                }));
                setFormComplete((prevState) => ({
                  ...prevState,
                  CardNumberComplete: true
                }))
              }
            }}
            className="border border-gray-500 px-4 py-3 rounded-md"
          />
          {formErrors.CardNumberError && (
            <span style={{ color: "red" }} role={"alert"}>
              {formErrors.CardNumberError}
            </span>
          )}
        </div>
        <div className="expiry_date_field my-2">
          <label className="text-sm block font-medium">Valid thru</label>
          <CardExpiryElement
            onChange={(event) => {
              if (event.error) {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  CardExpirydateError: event.error.message,
                }));
                payment_btn.current.disabled = true;
              } else {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  CardExpirydateError: "",
                }));
                setFormComplete((prevState) => ({
                  ...prevState,
                  CardExpiryComplete: true
                }))
              }
            }}
            className="border border-gray-500 px-4 py-3 rounded-md"
          />
          {formErrors.CardExpirydateError && (
            <span style={{ color: "red" }} role={"alert"}>
              {formErrors.CardExpirydateError}
            </span>
          )}
        </div>
        <div className="cvv_field my-2">
          <label className="text-sm block font-medium">Cvv Number</label>
          <CardCvcElement
            onChange={(event) => {
              if (event.error) {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  cvvError: event.error.message,
                }));
                payment_btn.current.disabled = true;
              } else {
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  cvvError: "",
                }));
                setFormComplete((prevState) => ({
                  ...prevState,
                  CardCvvComplete: true
                }))
              }
            }}
            className="border border-gray-500 px-4 py-3 rounded-md"
          />
          {formErrors.cvvError && (
            <span style={{ color: "red" }} role={"alert"}>
              {formErrors.cvvError}
            </span>
          )}
        </div>
        <div className="submit_btn my-6 ">
          {!isLoading ? (
            <button
              type="submit"
              ref={payment_btn}
              disabled={formErrors.CardExpirydateError ||
                formErrors.cvvError ||
                formErrors.CardNumberError ||
                !elements ||
                !stripe ||
                !formComplete.CardNumberComplete ||
                !formComplete.CardCvvComplete ||
                !formComplete.CardExpiryComplete}
              className="disabled:cursor-not-allowed px-4 py-3 bg-indigo-800 hover:bg-indigo-900
              rounded-md w-full text-white font-bold"
            >
              Pay
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-full text-center transition ease-in-out duration-150 cursor-not-allowed"
              disabled=""
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="pacity-25 text-white"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 
                                    018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                                    3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing ...
            </button>
          )}
        </div>
      </form>
    </Fragment>
  );
}


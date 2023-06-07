import React, { Fragment, useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { REMOVE_ALL_ITEM_FROM_CART } from "../../Context/Actions/ActionType";
import { Toast_Config_Option } from '../../global/Toast_Config'
import { BASE_URL } from '../../global/Base_URL'

export default function CashOnDelivary() {
  const recaptchaRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const SITE_KEY = import.meta.env.VITE_GOOGLE_SITE_KEY;
  const { productItems } = useSelector((state) => state.Cart);
  const [payment_type, setPayment_type] = useState("CASHONDELIVERY");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SearchParams = new URLSearchParams(location.search)
  const ProductId = SearchParams.get('ProductId')
  const varientId = SearchParams.get('varientId')
  const quantity = Number(SearchParams.get('quantity'))
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

  // validate the captcha
  const handleRecaptchaChange = (value) => {
    value
      ? (submitButtonRef.current.disabled = false)
      : (submitButtonRef.current.disabled = true);
  };

  // Call Google's API to get score
  // const res = await axios.post(
  //     `https://www.google.com/recaptcha/api/siteverify?secret=${YOUR_PRIVATE_KEY}&response=${captchaToken}`
  //   );

  const submitHandler = async () => {
    setisLoading(true);
    const captchaToken = await recaptchaRef.current.getValue();
    if (!captchaToken) {
      recaptchaRef.current.reset();
      setisLoading(false);
      return;
    }

    const response = await fetch(
      `${BASE_URL}/v3/api/user/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          captchaToken,
          payment_type,
        }),
        credentials: "include",
      }
    )
    const { error, data } = await response.json();
    if (response.status !== 200) {
      setisLoading(false);
      toast.error(error, Toast_Config_Option);
      submitButtonRef.current.disabled = false
      return;
    }
    if (!ProductId) {
      dispatch({ type: REMOVE_ALL_ITEM_FROM_CART });
    }
    setisLoading(false);
    const NewSearchParams = new URLSearchParams();
    NewSearchParams.set('payement', payment_type)
    navigate({ pathname: "/v2/order/response", search: `?${NewSearchParams}` })
    sessionStorage.removeItem('checkOutSession')
  };
  return (
    <Fragment>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <ReCAPTCHA
          onChange={handleRecaptchaChange}
          ref={recaptchaRef}
          sitekey={SITE_KEY}
          execute={() => recaptchaRef.current.execute()}
        />
        <div className="sumbit-btn my-5">
          {!isLoading ? (
            <button
              ref={submitButtonRef}
              type="submit"
              className="w-72 h-14 text-center
            text-white outline-none text-bold bg-indigo-800 rounded-md
             hover:bg-indigo-700 disabled:cursor-not-allowed "
              disabled
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center justify-center py-2  leading-4 
            text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
            w-72 text-center transition ease-in-out duration-150 cursor-not-allowed"
              disabled
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

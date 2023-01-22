import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";

export default function CardPayment() {
  //   ---------------- All state goes here  ---------------------------- //
  const [isLoading, setIsLoading] = useState(false);
  const { productItems } = useSelector((state) => state.Cart);
  const [CardNumberError, setCardNumberError] = useState('')
  const [CardExpirydateError, setCardExpirydateError] = useState('')
  const [cvvError, setCvvError] = useState('')

  const products = [];
  productItems.forEach((element) => {
    products.push({
      varientId: element._id,
      quantity: element.quantity,
    });
  });
  const elements = useElements();
  const stripe = useStripe();
  const StripeState = useSelector((state) => state.Stripe);
  const payment_btn = useRef(null) ;
  const SubmitHandler = async () => {
    try {
      payment_btn.current.disabled = true ;
      if (!stripe || !elements) return;
      setIsLoading(!isLoading)
      const paymentIntent = await fetch('http://localhost:5000/v3/api/user/shop/order', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          products
        }),
        credentials: 'include'
      })
      const { error, data } = await paymentIntent.json();
      console.log(error, data)
      if (paymentIntent.status !== 200) {
        toast.error(error, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setIsLoading(!isLoading)
        payment_btn.current.disabled= false;
        return;
      }
      const result = await stripe.createToken(elements.getElement(CardNumberElement))
      console.log(result.token)
      if (result.error) {
        toast.error(result.error.message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        setIsLoading(!isLoading)
        payment_btn.current.disabled= false;
        return;
      }
      await fetch('http://localhost:5000/v3/api/user/shop/confirm/payment', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payment_intentId: data,
          token: result.token
        }),
        credentials: 'include'
      }).then(async (res) => {
        const confirmOrder = await res.json();
        console.log(confirmOrder)
        setIsLoading(!isLoading)
        if (res.status !== 200) {
          toast.error(confirmOrder.error, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          payment_btn.current.disabled= false;
        }
        else{
          setIsLoading(false)
          toast.success(confirmOrder.data, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          payment_btn.current.disabled= false;
        }
        
      })
     
    } catch (error) {
      console.log(error)
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
              if(event.error){
                setCardNumberError(event.error.message)
              }
              else{
                setCardNumberError('')
              }
            }}
            className="border border-gray-500 px-4 py-3 rounded-md"
          />
          {CardNumberError.length> 0 ?  <span style={{color:'red'}} role={'alert'}>{CardNumberError}</span> :null }
        </div>
        <div className="expiry_date_field my-2">
          <label className="text-sm block font-medium">Valid thru</label>
          <CardExpiryElement
            onChange={(event) => {
              if(event.error){
                setCardExpirydateError(event.error.message)
              }
              else{
                setCardExpirydateError('')
              }
            }}
            className="border border-gray-500 px-4 py-3 rounded-md"
          />
          {CardExpirydateError.length > 0 ?  <span style={{color:'red'}} role={'alert'}>{CardExpirydateError}</span> :null }
        </div>
        <div className="cvv_field my-2">
          <label className="text-sm block font-medium">Cvv Number</label>
          <CardCvcElement
            onChange={(event) => {
              if(event.error){
                setCvvError(event.error.message)
              }
              else{
                setCvvError('')
              }
             }}
            className="border border-gray-500 px-4 py-3 rounded-md"
          />
          {cvvError.length > 0 ?  <span style={{color:'red'}} role={'alert'}>{cvvError}</span> :null }
         
        </div>
        <div className="submit_btn my-6 ">
          {!isLoading ? (
            <button
              type="submit"
              ref={payment_btn}
              disabled={CardExpirydateError || cvvError || CardNumberError ? true : false}
              className="px-4 py-3 bg-indigo-800 hover:bg-indigo-900
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

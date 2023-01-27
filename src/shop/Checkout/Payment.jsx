import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
const Navbar = lazy(() => import("../../UsableComponent/Navbar"));
import NavbarSkeleton from "../../Skeleton/NavbarSkeleton";
const OrderSummary = lazy(() => import("../Cart/OrderSummary"));
import Stepper from "../Steps";
import { useSelector } from "react-redux";
import "../../index.css";
import { BsCheckCircle } from "react-icons/bs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPayment from "./CardPayment";
import { toast } from "react-toastify";
const CashOnDelivary = lazy(()=>import('./CashOnDelivary'))

export default function Payment() {
  const { IsLogdin } = useSelector((state) => state.Signin);
  const [CARD, setCARD] = useState("CARDOPTION");
  const [CashOnDelivery, setCashOnDelivery] = useState("cashondelivery");
  const [selectedoption, setSelectedoption] = useState(null);


  useEffect(() => {
    !IsLogdin ? navigate({
      pathname: "/V2/auth/sign_in",
      search: `?${createSearchParams({ 'next': Location.pathname })}`
    }) : null;
  }, [])

 


  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <div className="stepper_container my-10">
        <Stepper activestep={2} />
      </div>
      <section className="payment_container grid grid-cols-1 md:grid-cols-3 mx-5 md:mx-10 my-10 gap-5">
        <div className="payment_option_box md:col-span-2">
          <h3 className="text-xl px-5 mb-5">Choose a payment method</h3>
          <label className="my-5 ">
            <input
              type="radio"
              name="test"
              value={CARD}
              checked={selectedoption === CARD}
              onChange={(e) => setSelectedoption(e.target.value)}
            />
            <div className="box_container my-5 py-3 border border-gray-300 px-4 rounded-lg">
              <div className="option_name_checked_btn option_name flex items-center justify-between">
                <h3 className="option_value">Credit / Debit / ATM Card</h3>
                <span className="checked_btn">
                  <BsCheckCircle className="text-green-800 text-2xl shadow-xl" />
                </span>
              </div>
              <section
                className={`form_container my-5 ${selectedoption === CARD ? "visible" : "hidden"
                  }`}
              >
                {/*  ---------------- card payment method  -------------- */}
                <Elements
                  stripe={loadStripe(
                    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
                  )}
                >
                  <CardPayment />
                </Elements>
              </section>
            </div>
          </label>

          <label className="my-5">
            <input
              type="radio"
              name="test"
              value={CashOnDelivery}
              checked={selectedoption === CashOnDelivery}
              onChange={(e) => setSelectedoption(e.target.value)}
            />
            <div className="my-5 box_container py-3  px-4 rounded-lg">
              <div className="option_name_checked_btn option_name flex items-center justify-between">
                <h3> Cash on Delivery</h3>
                <span className="checked_btn">
                  <BsCheckCircle className="text-green-800 text-2xl shadow-xl" />
                </span>
              </div>
              <section
                className={`form_container my-5 ${selectedoption === CashOnDelivery ? "visible" : "hidden"
                  }`}
              >
               <Suspense fallback={<p>loading...</p>}>
                  <CashOnDelivary />
               </Suspense>
              </section>
            </div>
          </label>
        </div>
        <Suspense fallback={<p>loadingg..</p>}>
          <OrderSummary />
        </Suspense>
      </section>
    </Fragment>
  );
}

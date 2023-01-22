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

export default function Payment() {
  const { IsLogdin } = useSelector((state) => state.Signin);
  const [isLoading, setIsLoading] = useState(false);
  const [CARD, setCARD] = useState("CARDOPTION");
  const [CashOnDelivery, setCashOnDelivery] = useState("cashondelivery");
  const [selectedoption, setSelectedoption] = useState(null);

  console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  useEffect(() => {
    const MakeOrder = async () => {
      await fetch("http://localhost:5000/v3/api/user/create/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productVarientId: [],
          quantity: 34,
        }),
        credentials: "include",
      })
        .then(async (res) => {
          const { data, error } = await res.json();
          if (res.status === 200) {
            console.log(data);
          }
           else {
            toast.error(error, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    };
  }, []);

  useEffect(() => {
      !IsLogdin ? navigate({
          pathname: "/V2/auth/sign_in",
          search: `?${createSearchParams({ 'next': Location.pathname })}`
      }) : null;
  }, [])
  console.log(selectedoption);

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
                className={`form_container my-5 ${
                  selectedoption === CARD ? "visible" : "hidden"
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
                className={`form_container my-5 ${
                  selectedoption === CashOnDelivery ? "visible" : "hidden"
                }`}
              >
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                    // submitHandler()
                  }}
                >
                  <div>
                    <label className="text-sm font-medium block ">
                      Enter the catpcha
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="Enter the above catpcha"
                      className="border border-gray-500 
                                            rounded-md my-2 py-3 focus:border-indigo-600
                                             focus:ring-indigo-700 bg-inherit focus:border w-72 px-3 outline-none 
                                             text-sm text-gray-700 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="sumbit-btn my-2">
                    {!isLoading ? (
                      <button
                        type="submit"
                        className="w-72 h-10 py-2 text-center
                             text-white outline-none text-bold bg-indigo-800 rounded-md
                              hover:bg-indigo-700"
                      >
                        Pay
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-flex items-center justify-center py-2  leading-4 
                              text-sm shadow rounded-md text-white bg-indigo-800 hover:bg-indigo-900
                               w-72 text-center transition ease-in-out duration-150 cursor-not-allowed"
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

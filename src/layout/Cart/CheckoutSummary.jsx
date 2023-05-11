import React, { Fragment,useState } from "react";
import PrimaryButton from "../../Components/PrimaryButton";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";

export default function CheckoutSummary() {
  const [shippingestimate, setShippingestimate] = useState(200);
  const [tax_percentage, settax_percentage] = useState(0.5);
  const Cartdata = useSelector((state) => state.Cart.productItems);
  if (Cartdata.length > 0) {
    var subtotal = Cartdata.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);

    // tax applied according to the total price of shopping
    var tax_amount = Math.trunc((tax_percentage / 100) * subtotal);

    var total_amount = tax_amount + subtotal + shippingestimate;
  }
  return (
    <Fragment>
      <div className="checkout_Subtotal">
        <section className="subtotal h-60 mx-4 shadow-lg px-2 bg-gray-100 rounded-md my-5 md:my-0 ">
          <h3 className="order-summary-text py-2 text-xl text-indigo-700">
            Order Summary
          </h3>
          <div className="subtotal flex items-center border-b border-slate-300 pb-3 my-2 justify-between">
            <h3 className="subtotaltext">Subtotal</h3>
            <span className="amount">Rs {subtotal}</span>
          </div>
          <div className="shiping-estimate  my-2 border-b border-slate-300 pb-3 items-center justify-between flex">
            <h3 className="shipingtext">Shipping estimate</h3>
            <span className="amount">Rs 200</span>
          </div>
          <div className="tax-estimate items-center border-b border-slate-300 pb-3 my-2 justify-between flex">
            <h3 className="tax-text ">Tax estimate</h3>
            <span className="amount">Rs {tax_amount}</span>
          </div>
          <div className="total flex items-center pb-2 justify-between mb-5">
            <h3 className="order-total">Total</h3>
            <span className="amount">Rs {total_amount}</span>
          </div>
        </section>
        <div className="checkout mx-4 my-5">
          <PrimaryButton>
            <Link to="/V2/shop/checkout?component=shipping">
              Place order now
            </Link>
          </PrimaryButton>
        </div>
      </div>
    </Fragment>
  );
}

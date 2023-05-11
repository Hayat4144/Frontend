import React, { Fragment } from "react";

export default function PrimaryButton({ children }) {
  return (
    <Fragment>
      <button
        className="checkout_btn px-5 w-full py-3 hover:border
            hover:bg-transparent hover:border-indigo-700 bg-indigo-700
            text-white shadow-md outline-none hover:text-black text-xl
            rounded-md"
      >
        {children}
      </button>
    </Fragment>
  );
}

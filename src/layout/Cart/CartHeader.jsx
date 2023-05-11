import React, { Fragment } from "react";
import { BiShoppingBag } from 'react-icons/bi'

export default function CartHeader() {
  return <Fragment>
       <h1 className="page-indicator flex justify-center my-10 space-x-5 cursor-pointer
        tracking-tight">
        <BiShoppingBag fontSize={"30px"} className="hover:text-indigo-700" />
        <span className="Page-title font-semibold text-2xl hover:text-indigo-800">My Cart
        </span>
      </h1>
  </Fragment>;
}

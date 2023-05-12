import React, { Fragment } from "react";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";

export default function ProductIncrementDecrement({
  quantity,
  DicreaseQuantity,
  IncreaseQuantity,
}) {
  return (
    <Fragment>
      <div className="product-quantity my-4">
        <div
          className="quantity-value flex 
          justify-between lg:mx-0 bg-gray-200 py-1 rounded-md 
          items-center lg:justify-between space-x-24 lg:space-x-20 
          px-5"
        >
          <button
            className="decrease-btn bg-indigo-900 text-white rounded-full 
            indigo-700 focus:border-none"
            disabled={quantity == 10 || quantity < 10 ? true : false}
          >
            <AiOutlineMinus fontSize={"20px"} onClick={DicreaseQuantity} />
          </button>
          <input
            type={"text"}
            className="focus:outline-none focus:border
             focus:border-indigo-600 focus:shadow-lg focus:bg-indigo-700                            
             focus:text-white w-10 border rounded-md border-indigo-800 
             outline-none bg-transparent text-black  text-center"
            value={quantity}
            onChange={(e) => {
              e.preventDefault();
              ManualQuantityChange(e);
            }}
          />
          <button className="plus-icon bg-indigo-900 focus:outline-none focus:shadow-lg focus:bg-indigo-700 focus:border-none text-white rounded-full ">
            <BiPlus fontSize={"20px"} onClick={IncreaseQuantity} />
          </button>
        </div>
        <span
          id="quantity-limit"
          className={`text-sm text-red-700 ${
            quantity < 10 ? "block" : "hidden"
          }`}
        >
          You should have to buy at least 10 pcs.
        </span>
      </div>
    </Fragment>
  );
}

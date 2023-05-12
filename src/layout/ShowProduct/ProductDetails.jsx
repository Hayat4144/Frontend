import React, { Fragment } from "react";

export default function ProductDetails({ product }) {
  return (
    <Fragment>
        <div className="prouduct-name-price font-semibold">
          <h3 className="Proudct-name capitalize lg:text-4xl text-xl">
            {product.name}
          </h3>
          <span className="text-indigo-800  hover:text-indigo-700 text-sm">
            Special price
          </span>
          <h5 className="product-price font-[800] text-2xl">
            Rs {product.price}
            <span
              className="discount-price mx-3 text-sm text-slate-600 
         line-through font-[600]"
            >
              8903
            </span>
            <span className="text-indigo-700 text-sm"> 45 % off</span>
          </h5>
          <p className="product-description text-sm text-gray-800 pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            consectetur perferendis optio pariatur suscipit fugit, quae tempore
            dolor ut ab beatae exercitationem ratione fuga libero qui nihil
            iusto. Obcaecati, praesentium!
          </p>
        </div>
    </Fragment>
  );
}

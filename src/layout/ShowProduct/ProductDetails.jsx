import React, { Fragment } from "react";

export default function ProductDetails({ product }) {
  return (
    <Fragment>
      <div className="prouduct-name-price font-semibold">
        <h3 className="Proudct-name capitalize lg:text-4xl text-2xl">
          {product.name}
        </h3>
        <h5 className="product-price text-xl font-[800] lg:text-3xl my-2">
          Rs {product.price}
        </h5>
        <p className="product-description  text-gray-800 pb-4">
          {product.description}
        </p>
      </div>
    </Fragment>
  );
}

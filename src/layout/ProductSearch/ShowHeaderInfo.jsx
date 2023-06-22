import React, { Fragment } from "react";
import { useSearchParams } from "react-router-dom";

export default function ShowHeaderInfo({ startingProductNumber, lastProductNumber, totalProduct }) {
  const [searchParams] = useSearchParams();
  return (
    <Fragment>
      <h2 className="product_total_info">
        Showing{" "}
        <span className="product_count">
          {startingProductNumber} - {lastProductNumber} of {totalProduct}
        </span>{" "}
        for result{" "}
        <span className="text-indigo-700 hover:cursor-pointer hover:text-indigo-900">
          "{searchParams.get("keyword") ?? searchParams.get('category') }"
        </span>
      </h2>
    </Fragment>
  );
}

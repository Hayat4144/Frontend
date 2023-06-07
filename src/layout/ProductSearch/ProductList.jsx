import React, { Fragment } from "react";
import NoResult from "../../assets/images/no-results.png";
import { Rating, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList({ ProductsData, noProduct }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Fragment>
        {!noProduct || ProductsData.length > 0 ? (
          <section className="mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ProductsData.map((item) => (
              <div key={item._id} className="cursor-pointer">
                <figure className="overflow-hidden rounded-md">
                  <img
                    src={item.assets.images[0].url}
                    alt="product-pic"
                    className="w-full h-56 rounded-md hover:scale-125  transition ease-in-out duration-500"
                  />
                </figure>
                <Link to={`/V2/shop/product/${item._id}/${item.name}/${encodeURIComponent(item.category)}`}
                  className="product_details my-2"

                >
                  <p
                    className="product_name capitalize w-full 
                    text-[17px] font-extrabold hover:text-indigo-700"
                  >
                    {item.name}
                  </p>
                  <p className="product_description">
                    {item.description.length > 80
                      ? `${item.description.slice(0, 60)} ...`
                      : item.description}
                  </p>
                  <Rating value={item.average_rating} />
                  <p className="product_price text-xl">
                    <span className="currency_symbol"> Rs </span>
                    {item.price}
                  </p>
                </Link>
              </div>
            ))}
          </section>
        ) : (
          <Fragment>
            <div className="w-full h-screen grid grid-rows-2 my-20">
              <div className="no-serach-result md:flex md:items-center md:space-x-5 justify-center">
                <figure className="no-search-result-image-container mx-32 md:mx-0 ">
                  <img
                    src={NoResult}
                    alt="not found pic"
                    className="cursor-pointer md:w-full"
                  />
                </figure>
                <div className="no_result_text_box text-center">
                  <div className="no_result_found">
                    <h1 className="font-bold text-3xl my-5">
                      Results not found
                    </h1>
                    <p className="my-5">
                      Sorry! we could not found the information at that moment
                      which you want.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
}

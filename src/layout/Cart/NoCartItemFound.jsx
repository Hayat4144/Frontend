import React, { Fragment } from "react";
import EmptyCartImage from '../../assets/images/EmptyCart.webp'
import { Link } from "react-router-dom";


export default function NoCartItemFound() {
  return (
    <Fragment>
      <div className="empty-cart md:mx-auto lg:flex md:justify-center lg:items-center md:mt-24">
        <figure className="empty-cart-image mt-20  md:mt-3">
          <img
            src={EmptyCartImage}
            alt="empty-cart-image"
            className="w-full h-full"
          />
        </figure>
        <section className="info-area pb-5 px-5">
          <h3 className="text-xl my-5">
            It's seems like you haven't added any product to your cart.
          </h3>
          <p className="my-3">
            Explore our website to purchase your favaourite product and enjoy.
          </p>
          <div className="my-10 md:px-0 w-full flex gap-5  items-center  md:justify-start md:gap-10 ">
            <Link
              to="/"
              className="bg-orange-500 px-5 py-3   rounded-md
             text-white cursor-pointer shadow-2xl hover:text-black 
             hover:border hover:border-orange-400 hover:bg-transparent"
            >
              Explore the site
            </Link>
            <Link
              to="/"
              className="bg-orange-500 px-5  py-3   rounded-md
            text-white cursor-pointer shadow-2xl hover:text-black 
              hover:border hover:border-orange-400 hover:bg-transparent"
            >
              Add items to cart
            </Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

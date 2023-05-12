import React, { Fragment } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default function SmallScreenImages({slideindex,nextSlide,backslide,images}) {
  return (
    <Fragment>
      {images.map((image, index) => (
        <figure
          className={`${slideindex === index + 1 ? "relative" : "hidden"} md:hidden mb-10`}
          key={index}
        >
          <img
            alt="product-img"
            src={image.url}
            className="w-full rounded-lg h-[20em] lg:h-[38em] "
          />
          <div
            className="md:hidden w-[90%] justify-between  
            absolute top-40 text-white font-bold text-4xl flex mx-2"
          >
            <h3
              className="mx-2 cursor-pointer"
              onClick={() => {
                backslide(images);
              }}
            >
              <BsArrowLeftCircle className="" />
            </h3>
            <h3
              className="mx-5 cursor-pointer"
              onClick={() => {
                nextSlide(images);
              }}
            >
              <BsArrowRightCircle className="" />
            </h3>
          </div>
        </figure>
      ))}
    </Fragment>
  );
}

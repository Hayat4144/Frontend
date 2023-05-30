import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Rating } from "@mui/material";
import SampleProductSkeleton from "../Skeleton/SampleProductSkeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function SimilarProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [product_detail, setProduct_detail] = useState([]);
  const [noProduct, setNoProduct] = useState(false);
  const { id, name, category } = useParams();



  // --------- fetching products ----------------- //
  const fetchData = async () => {
    setIsLoading(!isLoading);
    await fetch(
      `${import.meta.env.DEV
        ? import.meta.env.VITE_BACKEND_DEV_URL
        : import.meta.env.VITE_BACKEND_URL
      }/v4/api/get/similar/product?productId=${id}&category=${category}&search=${name}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then(async (res) => {
        const { data, error } = await res.json();
        if (error) {
          setNoProduct(true);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setProduct_detail(data.result);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const responsive = {
    '2xl': {
      breakpoint: { max: 1535, min: 1280 },
      items: 5,
      slidesToSlide: 5
    },
    xl: {
      breakpoint: { max: 1279, min: 1024 },
      items: 4,
      slidesToSlide: 4
    },
    lg: {
      breakpoint: { max: 1023, min: 768 },
      items: 3,
      slidesToSlide: 4
    },
    md: {
      breakpoint: { max: 767, min: 640 },
      items: 2,
      slidesToSlide: 2
    },
    sm: {
      breakpoint: { max: 639, min: 0 },
      items: 2,
      slidesToSlide: 2
    },
  };


  return (
    <Fragment>
      <div className="similar_products_box mx-2  my-10">
        <div className="similar_products_text flex md:mx-3 items-center justify-between my-5">
          <h3 className="text-xl font-bold lg:text-2xl">Similar products</h3>
          <h3
            className="text-indigo-700 hover:border-b hover:border-indigo-700 text-xl hover:text-indigo-800
                    cursor-pointer flex items-center space-x-2"
          >
            <Link to={"/V2/shop/products/category"}>view all</Link>
            <AiOutlineArrowRight />
          </h3>
        </div>
        {isLoading ? (
          <SampleProductSkeleton />
        ) : noProduct ? (
          <div className="my-10 h-20 ">
            <h2 className="text-xl text-center mb-5">No product found</h2>
          </div>
        ) : (
          <Fragment>

            <Carousel responsive={responsive} ssr={true} removeArrowOnDeviceType={["md", "sm"]} itemClass="carousel-item-padding-40-px">
              {product_detail.map((item, index) => (
                <div className="product_detaiils mx-2" key={item._id}>
                  <Link
                    to={`/V2/shop/product/${item._id}/${item.name
                      }/${encodeURIComponent(item.category)}`}
                  >
                    <figure className="overflow-hidden rounded-md">
                      <img
                        src={item.assets.images[0].url}
                        alt="product-pic"
                        className="w-full h-56  hover:scale-125  transition ease-in-out duration-500"
                      />
                    </figure>
                    <div className="product_details my-2">
                      <p
                        className="product_name capitalize w-full sm:justify-between cursor-pointer
                                     hover:text-indigo-700 sm:flex items-center sm:text-bold sm:text-bold"
                      >
                        <span className="product_name">
                          {item.name.length > 30
                            ? `${item.name.substring(0, 30).charAt(0).toUpperCase() +
                            item.name.slice(1)}...`
                            : item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </span>

                      </p>
                      <h1 className="product_rating text-[18px]">
                        <Rating value={item.average_rating} />
                      </h1>
                      <p className="font-bold text-xl">
                        Rs{item.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>

          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

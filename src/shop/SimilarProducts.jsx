import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Rating } from "@mui/material";
import SampleProductSkeleton from "../Skeleton/SampleProductSkeleton";
import SliderProduct from "../layout/SliderProduct";


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
            <SliderProduct product_detail={product_detail} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

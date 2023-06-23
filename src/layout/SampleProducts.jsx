import React, { Fragment, useState, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";
import SampleProductSkeleton from "../Skeleton/SampleProductSkeleton";
import SliderProduct from "./SliderProduct";


export default function SampleProducts({ name }) {
  //  -------------------- product details ------------------------ //
  const [product_detail, setProduct_detail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noProduct, setNoProduct] = useState(false);
  const navigate = useNavigate();

  // --------- fetching products ----------------- //
  const fetchData = async () => {
    setIsLoading(!isLoading);
    await fetch(
      `${import.meta.env.DEV
        ? import.meta.env.VITE_BACKEND_DEV_URL
        : import.meta.env.VITE_BACKEND_URL
      }/v4/api/get/sample/product?search=${name}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then(async (res) => {
        const { data } = await res.json();
        if (data.length < 1) {
          setNoProduct(true);
          setIsLoading(false);
          return;
        }

        setProduct_detail(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Fragment>
      {isLoading ? (
        <SampleProductSkeleton />
      ) : noProduct ? (
        <div className="my-10 h-20 ">
          <h2 className="text-xl text-center mb-5">
            No product found has been
          </h2>
        </div>
      ) : (
        <Fragment>
          <div className="mx-2 my-5">
            <SliderProduct product_detail={product_detail} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

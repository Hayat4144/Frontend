import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Suspense } from "react";
import { lazy } from "react";
const Footer = lazy(() => import("../../layout/Footer"));
const Navbar = lazy(() => import("../../layout/Nav/Navbar"));
import NavbarSkeleton from "../../Skeleton/NavbarSkeleton";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FcProcess } from "react-icons/fc";
import NoOrderImage from "../../assets/images/NoOrder.webp";
import OrderLoading from "../../Skeleton/OrderLoading";
import { BASE_URL } from "../../global/Base_URL";

export default function Order() {
  //  -------------------- All states --------------------- //
  const [Orderdata, setOrderdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { IsLogdin } = useSelector((state) => state.Signin);
  const [productItem, setProductItem] = useState([])
  const Location = useLocation();
  const navigate = useNavigate();

  // ------------------------ check is user Logdin or not -------------- //

  useEffect(() => {
    !IsLogdin
      ? navigate({
        pathname: "/V2/auth/sign_in",
        search: `?${createSearchParams({ next: Location.pathname })}`,
      })
      : null;
  }, []);

  //  ---------------------- fetch order of user --------------------- //
  const FetchOrderHistory = async () => {
    const OrderResponse = await fetch(`${BASE_URL}/v3/api/user/orders/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!OrderResponse.ok) {
      setIsLoading(false);
      return
    }
    const { data } = await OrderResponse.json();

    //  ------------------- make the human readable date formate and push in the existing data --------- //
    const result = data.map((item) => {
      const date = new Date(item.created_at);
      const updateData = new Date(item.updated_at);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const humanReadableDate = date.toLocaleDateString("en-US", options);
      const updated_at = date.toLocaleDateString("en-us", options);
      return { ...item, created_at: humanReadableDate, updated_at };
    });

    //  -------------------- iterating over data to get varient and push into an array for fetching products ----------- //
    const product = []
    result.forEach((element) => {
      element.products.forEach((item) => {
        product.push({ ...item.ProductId, ...item.varientId })
      });
    });
    setOrderdata(result);
    setProductItem(product)
    setIsLoading(false);

  };
  useEffect(() => {
    FetchOrderHistory();
  }, []);



  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <section className="order_history_container my-10 mx-5 md:mx-auto md:w-[80%]">
        {isLoading ? (
          <section className="w-full h-screen">
            <OrderLoading />
          </section>
        ) : Orderdata.length > 0 ? (
          Orderdata.map((item) => (
            <div
              key={item._id}
              className="order_history_box border my-10 border-gray-300 shadow-sm rounded-md"
            >
              <div className="order_history_box_header border-b border-gray-300 flex justify-between items-center px-2 md:px-5 h-24 py-10 ">
                <div className="order_id">
                  <h3 className="orderId_text font-extrabold">Order Id</h3>
                  <span className="order_number text-gray-600 text-sm sm:text-[15px]">{item._id}</span>
                </div>
                <div className="order_totalPrice">
                  <h3 className="ordertotalPrice_text font-extrabold">
                    Total Amount
                  </h3>
                  <span className="order_totalpriceValue text-gray-600">
                    {item.totalPrice}
                  </span>
                </div>
                <div className="order_date hidden sm:block">
                  <h3 className="orderDate_text font-extrabold">Order Date</h3>
                  <span className="order_OrderDate text-gray-600">
                    {item.created_at}
                  </span>
                </div>
              </div>
              <div className="order_products_display_area my-5 mx-5">
                {item.products !== null
                  ? item.products.map((product, index) => (
                    <div
                      className="order_product border-b border-gray-300 my-5 pb-5"
                      key={index}
                    >
                      {product.ProductId !== null ? (
                        <div className="product_image_container flex space-x-6">
                          <figure className="w-28 sm:w-56">
                            <img
                              src={
                                product.ProductId.assets.images[0].url
                              }
                              alt="product_pic"
                              className="h-28 w-full rounded-sm"
                            />
                          </figure>
                          <div className="product_name_description px-2 w-full">
                            <div className="product_name_price sm:flex space-y-4 sm:space-y-0 sm:items-center w-full sm:justify-between">
                              <h2 className="product_name md:text-xl font-bold capitalize">
                                {product.ProductId.name}
                              </h2>
                              <h2 className="product_varient_price text-xl font-bold space-x-2">
                                <span className="currency_symbol">Rs</span>
                                <span className="amount_value">
                                  {product.price}
                                </span>
                              </h2>
                            </div>
                            {product.varientId && product.varientId.attribute.map((attr) => (
                              <Fragment key={attr._id}>
                                <h2 className="attribute_name_value">
                                  {attr.name}
                                  <span className="mx-2 capitalize text-gray-700">
                                    {attr.value}
                                  </span>
                                </h2>
                              </Fragment>
                            ))}
                            <div className="my-1">
                              <p className="quantity">Quantiy: <span className="">{product.quantity}</span></p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Fragment>
                          <div className="no-product_found flex justify-center items-center pt-5">
                            <h1 className="font-bold text-xl">
                              Sorry, for the inconvinience,Product is no
                              longer exist.{" "}
                            </h1>
                          </div>
                        </Fragment>
                      )}

                      <section className="delivary_info my-2">
                        <div className="order_status flex items-center space-x-2">
                          {item.status == "delivered" ? (
                            <div className="flex space-x-3 items-center">
                              <BsFillCheckCircleFill className="text-green-900 text-xl" />
                              <span className="status_text">
                                {" "}
                                Deliverd on{" "}
                              </span>
                              <h1 className="status">{item.updated_at}</h1>
                            </div>
                          ) : (
                            <div className="flex space-x-3 items-center">
                              <FcProcess className="text-2xl" />
                              <span className="status_text">Processing </span>
                            </div>
                          )}
                        </div>
                        <div className="payment-status flex space-x-3 items-center">
                          <h1 className="text-[15px]">Payment status:</h1>
                          <span className={`${item.paymentStatus === 'failed' ? 'text-red-700' : item.paymentStatus === 'paid' ? 'text-green-800 font-bold' : '' } capitalize font-bold`}>{item.paymentStatus}</span>
                        </div>
                      </section>
                    </div>
                  ))
                  : null}
              </div>
            </div>
          ))
        ) : (
          // ---------------------------- if order not found ----------------------- //
          <article className="order_not_found lg:flex  md:justify-center lg:items-center w-full h-screen">
            <div className="order_not_found_image">
              <figure className="">
                <img src={NoOrderImage} alt="orderr_not_found_pic" />
              </figure>
            </div>
            <div className="order_not_found_info">
              <h1 className="text-2xl my-2 md:text-4xl">Orders not found</h1>
              <p className="font-bold md:text-[16px]">
                We couldn't find any orders associated with your account Please ensure that you have
                placed an order.
              </p>
              <p className="font-bold my-2 md:text-[16px]">
                If you haven't placed an order yet, you can browse our products and add items
                to your cart to initiate a new order.
              </p>
            </div>
          </article>
        )}
      </section>
      <div className="my-10 mb-0 w-full">
        <Suspense fallback={<p>loading....</p>}>
          <Footer />
        </Suspense>
      </div>
    </Fragment>
  );
}

import React, { Fragment, lazy, Suspense, useState, useEffect } from "react";
const Navbar = lazy(() => import("../../layout/Nav/Navbar"));
import Stepper from "./Steps";
import NavbarSkeleton from "../../Skeleton/NavbarSkeleton";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import { useSelector } from "react-redux";
import AddressDetails from "./AddressDetails";
import { useDispatch } from "react-redux";
import {
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
} from "../../Context/Actions/ActionType";
import FetchCartDetails from "../../utils/FetchCartDetails";
const OrderSummary = lazy(() => import("./OrderSummary"));
import UpdateCartItem from "../../utils/UpdateCartItem";
import { toast } from 'react-toastify'
import { Toast_Config_Option } from '../../global/Toast_Config'
import FetchProduct from '../../utils/FetchProductById'
const CheckoutProduct = lazy(() => import('./CheckoutProduct'))

export default function ConfrimOrder() {
  const Cartdata = useSelector((state) => state.Cart.productItems);
  const [productDetails, setProductDetails] = useState([]);
  const [variantDetails, setVariantDetails] = useState([]);
  const [searchParams] = useSearchParams();
  const [ProductId, setProductId] = useState(searchParams.get('ProductId'))
  const [quantity, setQuantity] = useState(searchParams.get('quantity'))
  const [varientId, setVarientId] = useState(searchParams.get('varientId'))

  const next_Url = `?${new URLSearchParams(location.search)}`

  useEffect(() => {
    const cartDetails = async () => {
      const { _Product_Details, _Product_Varient_Details } =
        await FetchCartDetails(Cartdata);
      setProductDetails(_Product_Details);
      setVariantDetails(_Product_Varient_Details);
    };
    if (Cartdata.length > 0) {
      cartDetails();
    }

  }, [Cartdata]);


  const GetProductDetails = async () => {
    const { Products, Varients } = await FetchProduct(ProductId);
    if (Products) {
      setProductDetails([Products])
    }
    if (varientId) {
      const variant = Varients.find(
        (varient) => varient._id === varientId
      );
      variant ? setVariantDetails([variant]) : setVariantDetails(null)
    }
  }

  useEffect(() => {
    const checkoutSession = sessionStorage.getItem('checkOutSession');
    if (checkoutSession !== 'active') {
      navigate('/checkout/session-expired')
    }
  }, [])

  useEffect(() => {
    if (ProductId) {
      GetProductDetails()
    }
  }, [ProductId, quantity, varientId])

  return (
    <Fragment>
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <div className="stepper_container my-10">
        <Stepper activestep={1} />
      </div>
      <div className="confirm_order_container my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="comfirm_box_data px-5 my-5 md:col-span-2">
          <div className="shipping&product_details ">
            <div className="shipping_info ">
              <AddressDetails />
            </div>
          </div>
          <section className="product_details my-5">
            <h3 className="YourProductItems text-xl border-b border-gray-300 pb-5">
              Your product items
            </h3>
            <div className="product_details my-5">
              {ProductId ? <Suspense fallback={'loadding....'}>
                <CheckoutProduct productDetails={productDetails} variantDetails={variantDetails} />
              </Suspense> : <CartItemDetails Cartdata={Cartdata} productDetails={productDetails} variantDetails={variantDetails} />}


            </div>
          </section>
        </div>
        <div className="pricing w-full">
          <Suspense fallback={<p>loading...</p>}>
            <OrderSummary />
          </Suspense>
          <div className="my-10 w-full px-5">
            <Link to={`/V2/shop/checkout/payment${ProductId ? next_Url : ''}`}>
              <button
                className="px-5 w-full my-5 py-3 hover:border
                    hover:bg-transparent hover:border-indigo-700 bg-indigo-700
                    text-white shadow-md outline-none hover:text-black text-xl
                    rounded-md"
              >
                Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


const CartItemDetails = ({ Cartdata, productDetails, variantDetails }) => {
  const { IsLogdin } = useSelector((state) => state.Signin);
  const dispatch = useDispatch();
  //  ---- Decrease qunatity of cart item ---- //
  const DescreaseQuantity = (id, quantity) => {
    const newquantity = quantity - 1;
    if (newquantity < 10) {
    } else {
      if (IsLogdin) {
        const CartItem = Cartdata.find(
          (i) =>
            i.ProductvarientId === id ||
            (i.ProductId === id && !i.ProductvarientId)
        );
        CartItem && UpdateCartItem(CartItem._id, quantity - 1);
      }

      dispatch({
        type: DECREASE_QUANTITY,
        payload: { ProductId: id, quantity: newquantity },
      });
    }
  };


  //  ---- Increase qunatity of cart item ---- //
  const IncreaseQuantity = (id, quantity, stock) => {
    if (quantity === stock) {
      toast.info(
        `Sorry for inconvenience, there is no more stock than ${stock}`,
        Toast_Config_Option
      );
      return;
    }
    if (IsLogdin) {
      const CartItem = Cartdata.find(
        (i) =>
          i.ProductvarientId === id ||
          (i.ProductId === id && !i.ProductvarientId)
      );
      CartItem && UpdateCartItem(CartItem._id, quantity + 1);
    }
    const newquantity = quantity + 1;

    dispatch({
      type: INCREASE_QUANTITY,
      payload: { ProductId: id, quantity: newquantity },
    });
  };

  return <Fragment>

    {
      Cartdata.map((item, index) => {
        let product = productDetails[index];
        let variant = variantDetails[index];
        return (
          <div
            key={item.ProductId}
            className="product-image&detailst px-2 my-5"
          >
            <div className="product-details flex space-x-2">
              <figure className="product-imaga-contianer overflow-hidden w-[20%] rounded-md">
                <img
                  src={item.image.url}
                  className="h-28 w-full hover:scale-125 rounded-md "
                />
              </figure>
              <div className="product-name&quantity px-2 w-[60%] grid grid-cols-1 md:grid-cols-2 ">
                <div className="product-info">
                  <div className="name-info-container lg:px-5">
                    <h2 className="product-name text-xl capitalize">
                      {product?.name}
                    </h2>
                    {variant && (
                      <Fragment>
                        {variant.attribute.map((attr) => (
                          <Fragment key={attr._id}>
                            <h2 className="attribute_name_value">
                              {attr.name}
                              <span className="mx-2 capitalize text-gray-700">
                                {attr.value}
                              </span>
                            </h2>
                          </Fragment>
                        ))}
                      </Fragment>
                    )}
                  </div>
                </div>

                {/*  ---- Quantitty */}
                <div
                  className="product-quantity-show my-2 bg-gray-100 flex 
            items-center justify-between px-2 h-8 rounded-md "
                >
                  <button
                    className="decrease-btn disabled:cursor-not-allowed bg-indigo-800 rounded-full text-white"
                    disabled={item.quantity === 10 ? true : false}
                    onClick={() => {
                      DescreaseQuantity(item.ProductId, item.quantity);
                    }}
                  >
                    <AiOutlineMinus fontSize={"22px"} />
                  </button>
                  <input
                    type={"text"}
                    className="w-10 border border-indigo-800 outline-none bg-transparent text-black px-1
              text-center"
                    value={item.quantity}
                    onChange={(e) => { }}
                  />
                  <button className="increase-button text-white bg-indigo-800 rounded-full">
                    <BiPlus
                      fontSize={"22px"}
                      onClick={() => {
                        IncreaseQuantity(
                          item.ProductId,
                          item.quantity,
                          variant ? variant.stock : product.stock
                        );
                      }}
                    />
                  </button>
                </div>
              </div>
              <div className="each-price text-end ml-32 sm:w-[23%]">
                <h2 className="price">
                  Rs{" "}
                  <span className="price-vlaue">
                    {variant ? variant.price : product?.price}
                  </span>
                </h2>
              </div>
            </div>
            {/*  ----- Total price of particular item */}
            <div
              className="total-price-of-individual-product flex items-center my-2 
       border-b border-gray-300 pb-5 justify-between"
            >
              <h2 className="product-subtotal-text text-xl">Total</h2>
              <h2 className="product-total-price">
                <span className="total-price-value font-bold text-xl">
                  Rs{" "}
                  {(variant && variant.price
                    ? variant.price
                    : product
                      ? product.price
                      : 0) * item.quantity}
                </span>
              </h2>
            </div>
          </div>
        );
      })
    }
  </Fragment>
}
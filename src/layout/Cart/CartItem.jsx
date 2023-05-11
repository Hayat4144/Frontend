import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_ITEM_FROM_CART,
} from "../../Context/Actions/ActionType";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import CartRemoveModal from "./CartRemoveModal";

export default function CartItem() {
  const Cartdata = useSelector((state) => state.Cart.productItems);
  const [quantityalert, setQuantityalert] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  if (IsModalOpen) {
    document.body.classList.toggle("cancel-modal");
  } else {
    document.body.classList.remove("cancel-modal");
  }

  //  ---- Increase qunatity of cart item ---- //
  const IncreaseQuantity = (id, quantity) => {
    const newquantity = quantity + 1;
    if (newquantity < 10) {
      setQuantityalert(true);
    } else {
      dispatch({
        type: INCREASE_QUANTITY,
        payload: { _id: id, quantity: newquantity },
      });
    }
  };

  //  ---- Decrease qunatity of cart item ---- //
  const DescreaseQuantity = (id, quantity) => {
    const newquantity = quantity - 1;
    if (newquantity < 10) {
      setQuantityalert(true);
    } else {
      dispatch({
        type: DECREASE_QUANTITY,
        payload: { _id: id, quantity: newquantity },
      });
    }
  };

  //  ---- Remove Item from cart ---- //
  const RemoveCartItem = (id) => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: id,
    });
  };


  const toggleModal = (state)=>{
    setIsModalOpen(!state)
  }

  return (
    <Fragment>
      <section className="product-items-details md:col-span-2 rounded-lg">
        <div className="product-top-banner flex text-white bg-indigo-700 h-10 items-center px-2 justify-between">
          <h1 className="product-item cursor-pointer">Product</h1>
          <h1 className="proudct-banner-quantity hidden md:block cursor-pointer ml-24">
            Quantity
          </h1>
          <h1 className="proudct-banner-price cursor-pointer">Each Price</h1>
        </div>
        {Cartdata.map((item) => (
          //  ---- product info ---- //
          <div className="product-image&detailst px-2 my-5" key={item._id}>
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
                    <h2 className="product-name text-xl">{item.name}</h2>
                    <h2 className="Colour">
                      {" "}
                      Colour
                      <span className="mx-2 capitalize text-gray-700">
                        {item.product_attribute.color}
                      </span>
                    </h2>
                    <h2 className="size">
                      Size
                      <span className="mx-2 capitalize text-gray-700">
                        {item.product_attribute.size}
                      </span>
                    </h2>
                  </div>
                </div>

                {/*  ---- Quantitty */}
                <div
                  className="product-quantity-show my-2 bg-gray-100 flex 
                  items-center justify-between px-2 h-8 rounded-md "
                >
                  <button
                    className="decrease-btn bg-indigo-800 rounded-full text-white"
                    disabled={
                      item.quanity == 10 || item.quanity < 10 ? true : false
                    }
                    onClick={() => {
                      DescreaseQuantity(item._id, item.quantity);
                    }}
                  >
                    <AiOutlineMinus fontSize={"22px"} onClick={() => {}} />
                  </button>
                  <input
                    type={"text"}
                    className="w-10 border border-indigo-800 outline-none bg-transparent text-black px-1
                    text-center"
                    value={item.quantity}
                    onChange={(e) => {}}
                  />
                  <button className="increase-button text-white bg-indigo-800 rounded-full">
                    <BiPlus
                      fontSize={"22px"}
                      onClick={() => {
                        IncreaseQuantity(item._id, item.quantity);
                      }}
                    />
                  </button>
                </div>
              </div>
              <div className="each-price text-end ml-32 sm:w-[23%]">
                <h2 className="price">
                  Rs <span className="price-vlaue">{item.price}</span>
                </h2>
              </div>
            </div>

            {/*  ---- Remove Button */}
            <div className="remove_item text-end my-5 ">
              <button
                className="remove_item_button uppercase text-xl hover:text-indigo-700 cursor-pointer"
                onClick={() => {
                  setIsModalOpen(!IsModalOpen);
                }}
              >
                Remove Item
              </button>
            </div>

            {/* ----- Confirm Modal ----- */}
            <CartRemoveModal IsModalOpen={IsModalOpen} ToggleModal={toggleModal} cart_id={item._id}/>


            {/*  ----- Total price of particular item */}
            <div
              className="total-price-of-individual-product flex items-center my-2 
             border-b border-gray-300 pb-5 justify-between"
            >
              <h2 className="product-subtotal-text text-xl">Total</h2>
              <h2 className="product-total-price">
                <span className="total-price-value font-bold text-xl">
                  Rs {item.price * item.quantity}
                </span>
              </h2>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
}

import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_ALL_ITEM_FROM_CART,
} from "../../Context/Actions/ActionType";
import { BiPlus } from "react-icons/bi";
import { AiOutlineMinus } from "react-icons/ai";
import { toast } from "react-toastify";
import { Toast_Config_Option } from "../../global/Toast_Config";
import CartRemoveModal from "./CartRemoveModal";
import FetchCartDetails from "../../utils/FetchCartDetails";
import DeleteCartItem from "../../utils/DeleteCartItem";
import UpdateCartItem from "../../utils/UpdateCartItem";

export default function CartItem() {
  const [quantityalert, setQuantityalert] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState({});
  const CartData = useSelector((state) => state.Cart.productItems);
  const [productDetails, setProductDetails] = useState([]);
  const [variantDetails, setVariantDetails] = useState([]);
  const dispatch = useDispatch();
  const { IsLogdin } = useSelector((state) => state.Signin);

  useEffect(() => {
    const cartDetails = async () => {
      const { _Product_Details, _Product_Varient_Details } =
        await FetchCartDetails(CartData);
      setProductDetails(_Product_Details);
      setVariantDetails(_Product_Varient_Details);
    };
    cartDetails();
  }, [CartData]);

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
      const CartItem = CartData.find(
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

  //  ---- Decrease qunatity of cart item ---- //
  const DescreaseQuantity = (id, quantity) => {
    const newquantity = quantity - 1;
    if (newquantity < 10) {
      setQuantityalert(true);
    } else {
      if (IsLogdin) {
        const CartItem = CartData.find(
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

  const toggleModal = (itemId, isOpen) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [itemId]: isOpen,
    }));
    if (isOpen) {
      document.body.classList.add("cancel-modal");
    } else {
      document.body.classList.remove("cancel-modal");
    }
  };
  const DeletAllItems = async () => {
    dispatch({ type: REMOVE_ALL_ITEM_FROM_CART });
    toast.success(`All items has been removed.`, Toast_Config_Option);
    if (IsLogdin) {
      const DeleteItemsPromises = Promise.all(
        CartData.map((item) => DeleteCartItem(item._id))
      );
      DeleteItemsPromises.then((item) => {
        console.log(item);
      }).catch((error) => console.error(error));
    }
  };
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

        {CartData.map((item, index) => {
          let product = productDetails[index];
          let variant = variantDetails.find(vart => vart._id === item.ProductvarientId)
          return (
            <div
              key={item.ProductvarientId ? item.ProductvarientId : item.ProductId}
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
                      className="decrease-btn bg-indigo-800 rounded-full text-white"
                      disabled={
                        item.quanity == 10 || item.quanity < 10 ? true : false
                      }
                      onClick={() => {
                        DescreaseQuantity(item.ProductId, item.quantity);
                      }}
                    >
                      <AiOutlineMinus fontSize={"22px"} onClick={() => { }} />
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
              {/*  ---- Remove Button */}
              <div className="remove_item text-end my-5 ">
                <button
                  className="remove_item_button uppercase text-xl hover:text-indigo-700 cursor-pointer"
                  onClick={() => {
                    toggleModal(item.ProductId, true);
                  }}
                >
                  Remove Item
                </button>
              </div>

              {/* ----- Confirm Modal ----- */}
              <CartRemoveModal
                IsModalOpen={IsModalOpen[item.ProductId]}
                ToggleModal={(isOpen) => toggleModal(item.ProductId, isOpen)}
                cart_id={
                  item.ProductvarientId ? item.ProductvarientId : item.ProductId
                }
                name={product?.name}
              />

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
        })}
        <div className="remove_all_items flex justify-end">
          <button
            className="border-gray-300 border px-5 py-2 rounded-md text-center hover:bg-indigo-700
                    hover:text-white focus:outline-none cursor-pointer hover:border-none shadow-md"
            onClick={DeletAllItems}
          >
            Remove all items
          </button>
        </div>
      </section>
    </Fragment>
  );
}

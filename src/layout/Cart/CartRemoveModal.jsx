import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ITEM_FROM_CART } from "../../Context/Actions/ActionType";
import { toast } from "react-toastify";
import { Toast_Config_Option } from "../../global/Toast_Config";
import DeleteCartItem from "../../utils/DeleteCartItem";

export default function CartRemoveModal({
  IsModalOpen,
  ToggleModal,
  cart_id,
  name,
}) {
  const dispatch = useDispatch();
  const { IsLogdin } = useSelector((state) => state.Signin);
  const CartData = useSelector((state) => state.Cart.productItems);

  const RemoveCartItem = async (Itemid) => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: Itemid,
    });
    if (IsLogdin) {
      const IsCartExist = CartData.find(
        (i) =>
          i.ProductvarientId === Itemid ||
          (i.ProductId === Itemid && !i.ProductvarientId)
      );
      if (IsCartExist) {
        const { data, error } = await DeleteCartItem(IsCartExist._id);
        if (error) return toast.error(error, Toast_Config_Option);
        return toast.success(
          `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } has been removed successfully.`,
          Toast_Config_Option
        );
      }
    }
    return toast.success(
      `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } has been removed successfully.`,
      Toast_Config_Option
    );
  };

  const toggleModal = () => {
    ToggleModal(!IsModalOpen);
  };

  return (
    <Fragment>
      <div
        className={`Modal_container fixed inset-0 bg-black bg-opacity-20 ${
          IsModalOpen ? "grid" : "hidden"
        } h-screen place-items-center`}
      >
        <div className="modal_body sm:mx-auto mx-2 h-36 bg-white rounded-md px-2 md:px-5">
          <div className="modal_title my-5">
            <h3 className="modal_title_text text-[16px] font-bold">
              Do you really want to remove this item?
            </h3>
            <div className="button_groups flex items-center space-x-10 relative top-10">
              <button
                onClick={toggleModal}
                className="cancel_button px-5 py-2 cursor-pointer rounded-md bg-red-700  text-white
                      hover:bg-red-800 "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  RemoveCartItem(cart_id);
                  toggleModal();
                }}
                className="remove_button px-5 py-2 border
                border-gray-300 cursor-pointer rounded-md hover:bg-indigo-700 hover:text-white hover:border-none"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

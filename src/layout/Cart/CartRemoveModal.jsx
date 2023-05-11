import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {REMOVE_ITEM_FROM_CART} from "../../Context/Actions/ActionType";

export default function CartRemoveModal({IsModalOpen,ToggleModal,cart_id}) {
    const [modal_open,setmodal_open] = useState(IsModalOpen);
    const dispatch = useDispatch();

    const RemoveCartItem = (id) => {
        dispatch({
          type: REMOVE_ITEM_FROM_CART,
          payload: id,
        });
      };

    // toggle modal state
    useEffect(()=>{
        setmodal_open(IsModalOpen)
    },[IsModalOpen])
  return (
    <Fragment>
      <div
        className={`Modal_container fixed inset-0 bg-black bg-opacity-20 ${
          modal_open ? "grid" : "hidden"
        } h-screen place-items-center`}
      >
        <div className="modal_body sm:mx-auto mx-2 h-36 bg-white rounded-md px-2 md:px-5">
          <div className="modal_title my-5">
            <h3 className="modal_title_text text-[16px] font-bold">
              Do you really want to remove this item?
            </h3>
            <div className="button_groups flex items-center space-x-10 relative top-10">
              <button
                onClick={() => ToggleModal(modal_open)}
                className="cancel_button px-5 py-2 cursor-pointer rounded-md bg-red-700  text-white
                      hover:bg-red-800 "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                    RemoveCartItem(cart_id)
                    ToggleModal(modal_open)
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

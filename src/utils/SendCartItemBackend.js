import { BASE_URL } from "../global/Base_URL";
import { toast } from "react-toastify";
import { Toast_Config_Option } from "../global/Toast_Config";

export const SendCartItemBackend = async (cartitem) => {
  try {
    const response = await fetch(`${BASE_URL}/v3/api/user/create/cart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(cartitem),
    });
    const { data, error } = await response.json();
    if (response.status !== 200) {
      return toast.error(error, Toast_Config_Option);
    }
    return data ;
  } catch (error) {
    console.log(error);
  }
};

import { BASE_URL } from "../global/Base_URL";

const UpdateCartItem = async (cart_item_id, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/v3/api/user/update/cartitem`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ cart_item_id, quantity }),
    });
    if (response.status === 200) return true;
    return false;
  } catch (error) {
    console.error(error);
  }
};

export default UpdateCartItem;

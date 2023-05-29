import { BASE_URL } from "../global/Base_URL";

const DeleteCartItem = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/v3/api/user/delete/cartitem`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        cartItemIds: [id],
      }),
      credentials: "include",
    });
    const { data, error } = await response.json();
    if (response.status !== 200) return { error };
    return { data };
  } catch (error) {
    console.error(error.message);
  }
};

export default DeleteCartItem;

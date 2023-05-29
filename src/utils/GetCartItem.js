import { BASE_URL } from "../global/Base_URL";

const GetCartItem = async () => {
  try {
    const response = await fetch(`${BASE_URL}/v3/api/user/read/cartitem`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const { data, error } = await response.json();
    if (response.status !== 200) return error;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default GetCartItem;

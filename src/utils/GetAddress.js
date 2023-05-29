import { BASE_URL } from "../global/Base_URL";

const GetAddress = async () => {
  try {
    const response = await fetch(`${BASE_URL}/v3/api/user/read/address`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const { data, error } = await response.json();
    if (response.status === 200) return data[0];
    return error;
  } catch (error) {
    console.error(error);
  }
};

export default GetAddress;

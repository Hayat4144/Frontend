import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { SIGNIN, USERINFO } from "../Context/Actions/ActionType";
import { toast } from "react-toastify";

const DecodeJwtToken = (dispatch,navigate,token,data,searchParams ,error) => {
   const jwt_token = Cookies.get(import.meta.env.DEV ? "token_dev" : "token"); // this will work in only local host because we cannot get the cookie of cors by javascript
   const decoded_token = jwt_decode(token);
  if (decoded_token) {
    dispatch({ type: SIGNIN });
    dispatch({ type: USERINFO, payload: decoded_token });
    toast.success(data, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    searchParams.get("next")
      ? navigate(searchParams.get("next"))
      : navigate("/");
  } else {
    toast.error(decoded_token.message, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export default DecodeJwtToken;

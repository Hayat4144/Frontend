import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { SIGNIN, USERINFO } from '../Context/Actions/ActionType';
const DecodeJwtToken = (dispatch) => {
    const jwt_token = Cookies.get(import.meta.env.DEV ? 'token_dev' : 'token_production');
    if (jwt_token) {
        const decoded_token = jwt_decode(jwt_token);
        dispatch({ type: SIGNIN })
        dispatch({ type: USERINFO, payload: decoded_token })
    }


}

export default DecodeJwtToken;
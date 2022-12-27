import { ADD_TO_CART } from "./ActionType"

export const ADD_TO_CART_ACTION = (data) => {
    return {
        type: ADD_TO_CART,
        payload: data
    }
}
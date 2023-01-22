import { ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, REMOVE_ALL_ITEM_FROM_CART } from "./ActionType"

export const ADD_TO_CART_ACTION = (data) => {
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export const REMOVE_ITEM_FROM_CART_ACTION = (varient_id) => {
    return {
        type: 'REMOVE_ITEM_FROM_CART',
        payload: varient_id
    }
}

export const INCREASE_QUANTITY_ACTION = (quantity) => {
    return {
        type: INCREASE_QUANTITY,
        payload: quantity
    }
}


export const DECREASE_QUANTITY_ACTION = (quantity) => {
    return {
        type: DECREASE_QUANTITY,
        payload: quantity
    }
}

export const REMOVE_ALL_ITEM_FROM_CART_ACTION = ()=>{
    return {
        type:REMOVE_ALL_ITEM_FROM_CART
    }
}


import { ADD_TO_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, REMOVE_ITEM_FROM_CART }
    from "../Actions/ActionType";

const initialState = {
    productItems: [],
    Shipping_Address: {}
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const IsItemExist = state.productItems.find((i) => i._id == item._id ? true : false);
            if (IsItemExist) {
                return {
                    ...state,
                    productItems: state.productItems.map((i) =>
                        i._id === IsItemExist._id ? item : i
                    ),
                };
            }
            else {
                return {
                    ...state,
                    productItems: [...state.productItems, item]
                }
            }

        case REMOVE_ITEM_FROM_CART:
            return {
                ...state, productItems: state.productItems.filter((i) => i._id !== action.payload)
            }
        case INCREASE_QUANTITY:
            return {
                ...state, productItems: state.productItems.map((i) => i._id === action.payload._id ? { ...i, quantity: action.payload.quantity } : i)
            }

        case DECREASE_QUANTITY:
            return {
                ...state, productItems: state.productItems.map((i) => i._id === action.payload._id ? { ...i, quantity: action.payload.quantity } : i)
            }
        default:
            return state;
    }

}

export default CartReducer;
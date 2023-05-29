import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_ALL_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
} from "../Actions/ActionType";

const initialState = {
  productItems: [],
  Shipping_Address: {},
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      let isVariantExist = false;
      let isProductExist = false;

      if (item.ProductvarientId) {
        isVariantExist = state.productItems.some(
          (i) => i.ProductvarientId === item.ProductvarientId
        );
      }

      if (!isVariantExist) {
        isProductExist = state.productItems.some(
          (i) => i.ProductId === item.ProductId && !i.ProductvarientId
        );
      }

      if (isVariantExist || isProductExist) {
        return {
          ...state,
          productItems: state.productItems.map((i) => {
            if (i.ProductvarientId === item.ProductvarientId) {
              return item;
            } else {
              return i;
            }
          }),
        };
      } else {
        return {
          ...state,
          productItems: [...state.productItems, item],
        };
      }

    case UPDATE_CART_ITEM:
      const updatedItem = action.payload;

      // Find the index of the cart item based on productId and variantId
      let index = -1;
      if (updatedItem.ProductvarientId) {
        index = state.productItems.findIndex(
          (item) => item.ProductvarientId === updatedItem.ProductvarientId
        );
      } else {
        index = state.productItems.findIndex(
          (item) =>
            item.ProductId === updatedItem.ProductId && !item.ProductvarientId
        );
      }

      // If the index is found, update the cart item at that index
      if (index !== -1) {
        const updatedProductItems = [...state.productItems];
        updatedProductItems[index] = {
          ...updatedProductItems[index],
          _id: updatedItem._id,
          CartId: updatedItem.CartId,
        };

        // Return the updated state object with the new productItems array
        return {
          ...state,
          productItems: updatedProductItems,
        };
      }

      // If the index is not found, return the current state without any changes
      return state;
    case REMOVE_ITEM_FROM_CART:
      let IsProductId = false;
      let IsVarientId = false;
      IsVarientId = state.productItems.some(
        (i) => i.ProductvarientId === action.payload
      );
      IsProductId = state.productItems.some(
        (i) => i.ProductId === action.payload
      );
      if (IsVarientId) {
        return {
          ...state,
          productItems: state.productItems.filter(
            (i) => i.ProductvarientId !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          productItems: state.productItems.filter(
            (i) => i.ProductId !== action.payload
          ),
        };
      }

    case INCREASE_QUANTITY:
      return {
        ...state,
        productItems: state.productItems.map((i) =>
          i.ProductId === action.payload.ProductId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        productItems: state.productItems.map((i) =>
          i.ProductId === action.payload.ProductId
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case REMOVE_ALL_ITEM_FROM_CART:
      return {
        ...state,
        productItems: [],
      };
    default:
      return state;
  }
};

export default CartReducer;

import { CART_ACTION_TYPES } from "./cart.types";
export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM: {
      return payload;
    }
    case CART_ACTION_TYPES.TOGGLE_CART:
      const { isCartOpen } = state;
      return {
        ...state,
        isCartOpen: !isCartOpen,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

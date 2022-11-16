import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM: {
      return { ...state, cartItems: payload };
    }
    case CART_ACTION_TYPES.SET_CART_COUNT: {
      return { ...state, cartCount: payload };
    }
    case CART_ACTION_TYPES.SET_CART_TOTAL: {
      return { ...state, cartTotal: payload };
    }
    case CART_ACTION_TYPES.TOGGLE_CART: {
      const { isCartOpen } = state;
      return {
        ...state,
        isCartOpen: !isCartOpen,
      };
    }
    default:
      return state;
  }
};

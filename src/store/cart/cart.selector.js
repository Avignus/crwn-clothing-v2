import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

const newCartTotal = (cartItems) =>
  cartItems?.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );

// const selectCartTotalReducer = (state) => state.cartTotal;

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  newCartTotal(cartItems)
);

const newCartCount = (cartItems) =>
  cartItems?.reduce((total, cartItem) => total + cartItem.quantity, 0);

// const selectCartCountReducer = (state) => state.cartCount;

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  newCartCount(cartItems)
);

// const selectIsCartOpenReducer = (state) => state.isCartOpen;
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// const selectIsOpenCartReducer = (state) =>

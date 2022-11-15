import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;
export const selectCart = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cart
);

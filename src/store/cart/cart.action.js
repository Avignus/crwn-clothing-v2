import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartItems = (cartArray) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEM, cartArray);

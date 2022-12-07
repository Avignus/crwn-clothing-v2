import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import { CartItem } from "./cart.types";

export const addCartItem = (
  cartItems: CartItem[],
  cartItemToAdd: CategoryItem
): CartItem[] | void => {
  console.log(cartItems);
  console.log(cartItemToAdd);
  console.log(cartItems);
  const existingCartItem = cartItems?.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  if (cartItems) {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
};

const clearCartItem = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  return cartItems?.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems?.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems?.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems?.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.TOGGLE_CART,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEM,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEM, cartItems)
);

export const toggleCart = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.TOGGLE_CART, boolean)
);

export const addItemToCart = withMatcher(
  (cartItemToAdd: CategoryItem, cartItems: CartItem[]): SetCartItems => {
    console.log(cartItems);
    const newCartItems = addCartItem(cartItems, cartItemToAdd);

    return setCartItems(newCartItems as CartItem[]);
  }
);
export const removeItemFromCart = withMatcher(
  (cartItemToRemove: CartItem, cartItems: CartItem[]): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
  }
);
export const clearItemFromCart = withMatcher(
  (cartItemToClear: CartItem, cartItems: CartItem[]): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return setCartItems(newCartItems);
  }
);

import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeCartItem: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const addCartItem = (cartItems, cartItemToAdd) => {
  console.log(cartItemToAdd);
  console.log(cartItems);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
export const CART_ACTION_TYPES = {
  SET_CART_ITEM: "SET_CART_ITEM",
  TOGGLE_CART: "TOGGLE_CART",
};

export const CartProvider = ({ children }) => {
  const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false,
  };

  const cartReducer = (state, action) => {
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

  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);
  const updateCartItemsReducer = (newCartItems) => {
    const newCartTotal = (cartItems) =>
      cartItems?.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      );

    const newCartCount = (cartItems) =>
      cartItems?.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const payload = {
      cartItems: newCartItems,
      cartCount: newCartCount(newCartItems),
      cartTotal: newCartTotal(newCartItems),
    };
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEM, payload));
  };
  const addItemToCart = (cartItemToAdd) => {
    console.log(cartItems);
    const newCartItems = addCartItem(cartItems, cartItemToAdd);
    console.log(newCartItems);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART, bool));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

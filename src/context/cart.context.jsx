import { createContext, useEffect, useReducer, useState } from "react";

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
};
export const SET_CART_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_ITEM: "CLEAR_ITEM",
};
export const CartProvider = ({ children }) => {
  const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    isCartOpen: false,
  };

  const newCartCount = (cartItems) =>
    cartItems?.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const newCartTotal = (cartItems) =>
    cartItems?.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
  const updateCartItem = (type, listItems, cartItem) => {
    let newCartItems = {};

    if (type === "ADD_ITEM") {
      newCartItems = addCartItem(listItems, cartItem);
    } else if (type === "REMOVE_ITEM") {
      newCartItems = removeCartItem(listItems, cartItem);
    } else if (type === "CLEAR_ITEM") {
      newCartItems = clearCartItem(listItems, cartItem);
    } else {
      throw new Error(`Unhandled type ${type} in condition to create payload`);
    }

    return {
      cartItems: newCartItems,
      cartCount: newCartCount(newCartItems),
      cartTotal: newCartTotal(newCartItems),
    };
  };
  const cartReducer = (state, action) => {
    const { type, payload } = action;
    const { cartItemToAdd } = payload;
    console.log(cartItemToAdd);
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

  const addItemToCart = (cartItemToAdd) => {
    const payload = updateCartItem(
      SET_CART_TYPES.ADD_ITEM,
      cartItems,
      cartItemToAdd
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEM,
      payload,
    });
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const payload = updateCartItem(
      SET_CART_TYPES.REMOVE_ITEM,
      cartItems,
      cartItemToRemove
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEM,
      payload,
    });
  };
  const clearItemFromCart = (cartItemToClear) => {
    const payload = updateCartItem(
      SET_CART_TYPES.CLEAR_ITEM,
      cartItems,
      cartItemToClear
    );
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_CART_ITEM,
      payload,
    });
  };

  const setIsCartOpen = () => {
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_CART,
      payload: !isCartOpen,
    });
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

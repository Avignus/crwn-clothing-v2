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
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  CLEAR_CART_ITEM: "CLEAR_CART_ITEM",
  CLEAR_CART: "CLEAR_CART",
  TOGGLE_CART: "TOGGLE_CART",
};
export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
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
  // setCartTotal(newCartTotal);
  // setCartCount(newCartCount);
  const cartReducer = (state, action) => {
    const { type, payload } = action;
    const { cartItemToAdd } = payload;
    const { cartItems } = state;
    console.log(cartItemToAdd);
    switch (type) {
      case CART_ACTION_TYPES.ADD_ITEM_TO_CART: {
        console.log(cartItems);
        const newCartItems = addCartItem(cartItems, cartItemToAdd);
        return {
          ...state,
          cartTotal: newCartTotal(newCartItems),
          cartCount: newCartCount(newCartItems),
          cartItems: newCartItems,
        };
      }
      case CART_ACTION_TYPES.REMOVE_CART_ITEM: {
        const { cartItemToRemove } = payload;
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        console.log(newCartItems);
        return {
          ...state,
          cartTotal: newCartTotal(newCartItems),
          cartCount: newCartCount(newCartItems),
          cartItems: newCartItems,
        };
      }
      case CART_ACTION_TYPES.CLEAR_CART_ITEM: {
        const { cartItemToClear } = payload;
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        return {
          ...state,
          cartTotal: newCartTotal(newCartItems),
          cartCount: newCartCount(newCartItems),
          cartItems: newCartItems,
        };
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
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const addItemToCart = (cartItemToAdd) => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: { cartItemToAdd },
    });
    // setCartItems(addCartItem(cartItems, cartItemToAdd));
  };
  const removeItemFromCart = (cartItemToRemove) => {
    console.log(cartItemToRemove);
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
      payload: { cartItemToRemove },
    });
    // setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFromCart = (cartItemToClear) => {
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_CART_ITEM,
      payload: { cartItemToClear },
    });
    // setCartItems(clearCartItem(cartItems, cartItemToClear));
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

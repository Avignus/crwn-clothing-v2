import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES {
  SET_CART_ITEM = "cart/SET_CART_ITEM",
  SET_CART_COUNT = "cart/SET_CART_COUNT",
  SET_CART_TOTAL = "cart/SET_CART_TOTAL",
  TOGGLE_CART = "cart/TOGGLE_CART",
}

export type CartItem = CategoryItem & {
  quantity: number;
};

import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

export const setIsCartOpen = withMatcher(
  (bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], prodoctToAdd: CartItem) => {
  const newCartItems = addCartItem(cartItems, prodoctToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

const addCartItem = (cartItems: CartItem[], prodoctToAdd: CategoryItem): CartItem[] => {
  // find if cartItems contains prodoctToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === prodoctToAdd.id);

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === prodoctToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  return [...cartItems, { ...prodoctToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  // check if quantity is equal to 1, if yes, then remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

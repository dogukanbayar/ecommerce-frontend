export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_COUNT = "UPDATE_CART_ITEM_COUNT";
export const TOGGLE_CART_ITEM_CHECK = "TOGGLE_CART_ITEM_CHECK";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const updateCartItemCount = (productId, count) => ({
  type: UPDATE_CART_ITEM_COUNT,
  payload: { productId, count },
});

export const toggleCartItemCheck = (productId) => ({
  type: TOGGLE_CART_ITEM_CHECK,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

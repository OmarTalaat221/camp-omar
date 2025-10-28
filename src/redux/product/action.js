import {
  GET_SINGLE_ITEM,
  DECREMENT_QTY,
  REMOVE_FROM_CART,
  ADD_TO_CART,
} from "../actionType";

export const getSingleItem = (productId) => ({
  type: GET_SINGLE_ITEM,
  payload: { productId },
});

export const addToCart = (product, qty) => (dispatch) => {
  dispatch(addToCartUnsafe(product, qty));
};

export const addToCartUnsafe = (product, qty) => ({
  type: ADD_TO_CART,
  payload: { product, qty },
});

export const removeFromCart = (product_id) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    product_id,
  });
};

export const decrementQty = (productId) => (dispatch) => {
  dispatch({
    type: DECREMENT_QTY,
    productId,
  });
};

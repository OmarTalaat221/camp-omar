import { REMOVE_FROM_WISHLIST } from "../actionType";
export const removeFromWishlist = (product_id) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    product_id,
  });
};

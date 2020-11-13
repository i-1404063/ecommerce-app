import * as types from "./constants";

const cartItemReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      const item = action.payload;
      const exist = state.cartItems.find((x) => x.product === item.product);
      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exist.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case types.SHIPPING_TO_CART:
      return { ...state, shippingAddress: action.payload };

    case types.PAYMENT_TO_CART:
      return { ...state, paymentInfo: action.payload };

    case types.CART_EMPTY:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

export { cartItemReducer };

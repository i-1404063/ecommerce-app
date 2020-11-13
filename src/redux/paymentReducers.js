import * as types from "./constants";

const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PAYMENT_REQUEST:
      return { loading: true };

    case types.PAYMENT_SUCCESS:
      return { loading: true, success: true };

    case types.PAYMENT_FALI:
      return { loading: false, error: action.payload };

    case types.PAYMENT_RESET:
      return {};

    default:
      return state;
  }
};

export { orderPaymentReducer };

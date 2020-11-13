import * as types from "./constants";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ORDER_REQUEST:
      return { loading: true };

    case types.ORDER_SUCCESS:
      return { loading: false, success: true, orderInfo: action.payload };

    case types.ORDER_FAIL:
      return { loading: false, error: action.payload };

    case types.ORDER_RESET:
      return {};

    default:
      return state;
  }
};

const orderDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case types.ORDER_DETAIL_REQUEST:
      return { loading: true };

    case types.ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload };

    case types.ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { orderReducer, orderDetailReducer };

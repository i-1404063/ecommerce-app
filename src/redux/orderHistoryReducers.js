import * as types from "./constants";

const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.ORDER_LIST_MINE_REQUEST:
      return { loading: true };

    case types.ORDER_LIST_MINE_SUCCESS:
      return { loading: false, orders: action.payload };

    case types.ORDER_LIST_MINE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { orderMineListReducer };

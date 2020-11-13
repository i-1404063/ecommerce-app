import * as types from "./constants";

const userDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case types.USER_DETAIL_REQUEST:
      return { loading: true };

    case types.USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };

    case types.USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { userDetailReducer };

import * as types from "./constants";

const userSignInReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case types.USER_REQUEST:
      return { loading: true };

    case types.USER_SUCCESS:
      return { laoding: false, userInfo: action.payload };

    case types.USER_FAIL:
      return { loading: false, error: action.payload };

    case types.USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

const signUpReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case types.USER_SIGNUP_REQUEST:
      return { loading: true };

    case types.USER_SIGNUP_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case types.USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const userProfileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_USERINFO_REQUEST:
      return { loading: true };

    case types.UPDATE_USERINFO_SUCCESS:
      return { loading: false, success: true };

    case types.UPDATE_USERINFO_FAIL:
      return { loading: false, error: action.payload };

    case types.UPDATE_USERINFO_RESET:
      return {};

    default:
      return state;
  }
};

export { userSignInReducer, signUpReducer, userProfileUpdateReducer };

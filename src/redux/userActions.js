import * as types from "./constants";
import axios from "axios";
import jwt_decode from "jwt-decode";
import _ from "lodash";

const userSignIn = (email, password) => (dispatch) => {
  dispatch({ type: types.USER_REQUEST, payload: { email, password } });

  axios({
    method: "POST",
    data: {
      email: email,
      password: password,
    },
    withCredentials: true,
    url: "http://localhost:5000/api/users/signin",
  })
    .then((res) => {
      const decoded = jwt_decode(res.data);
      const user = _.pick(decoded, ["_id", "name", "email", "isAdmin"]);
      dispatch({ type: types.USER_SUCCESS, payload: user });
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(res.data));
    })
    .catch((err) => {
      dispatch({
        type: types.USER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const userSignOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("token");
  dispatch({ type: types.USER_SIGNOUT });
};

export { userSignIn, userSignOut };

import * as types from "./constants";
import axios from "axios";

const signUp = (name, email, password) => (dispatch) => {
  dispatch({
    type: types.USER_SIGNUP_REQUEST,
    payload: { email, password },
  });

  axios({
    method: "POST",
    data: {
      name: name,
      email: email,
      password: password,
    },
    withCredentials: true,
    url: "http://localhost:5000/api/users/signup",
  })
    .then((res) => {
      dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res.data });
      dispatch({ type: types.USER_SUCCESS, payload: res.data });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      localStorage.setItem(
        "token",
        JSON.stringify(res.headers["x-auth-token"])
      );
    })
    .catch((err) => {
      dispatch({
        type: types.USER_SIGNUP_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

export { signUp };

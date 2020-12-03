import * as types from "./constants";
import axios from "axios";

const detailUser = (id) => async (dispatch) => {
  dispatch({ type: types.USER_DETAIL_REQUEST, payload: id });
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const { data } = await axios.get(`${types.api}/api/users/${id}`, {
      headers: { "x-auth-token": token },
    });
    dispatch({ type: types.USER_DETAIL_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({ type: types.USER_DETAIL_FAIL, payload: message });
  }
};

const updateUserProfile = (user) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USERINFO_REQUEST, payload: user });

  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.put(`${types.api}/api/users/profile`, user, {
      headers: { "x-auth-token": token },
    });
    dispatch({ type: types.UPDATE_USERINFO_SUCCESS, payload: res.data });
    dispatch({ type: types.USER_SUCCESS, payload: res.data });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    localStorage.setItem("token", JSON.stringify(res.headers["x-auth-token"]));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({ type: types.UPDATE_USERINFO_FAIL, payload: message });
  }
};

export { detailUser, updateUserProfile };

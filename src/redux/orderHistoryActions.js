import axios from "axios";
import * as types from "./constants";

const orderMineList = () => async (dispatch) => {
  dispatch({ type: types.ORDER_LIST_MINE_REQUEST });

  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const { data } = await axios.get("http://localhost:5000/api/orders/mine", {
      headers: { "x-auth-token": token },
    });
    dispatch({ type: types.ORDER_LIST_MINE_SUCCESS, payload: data });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({ type: types.ORDER_LIST_MINE_FAIL, payload: message });
  }
};

export { orderMineList };

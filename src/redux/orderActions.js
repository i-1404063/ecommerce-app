import * as types from "./constants";
import axios from "axios";

const createOrder = (order) => async (dispatch) => {
  dispatch({ type: types.ORDER_REQUEST, payload: order });
  const token = JSON.parse(localStorage.getItem("token")); //must extract as the json parse because we stored the token using json.stringify.

  axios({
    method: "POST",
    data: order,
    withCredentials: true,
    url: "http://localhost:5000/api/orders",
    headers: { "x-auth-token": token },
  })
    .then((res) => {
      dispatch({ type: types.ORDER_SUCCESS, payload: res.data.orderInfo });
      dispatch({ type: types.CART_EMPTY }); //to empty the cartItems after send order to backend
      localStorage.removeItem("cartItems"); //also remove cartItems from the storage
    })
    .catch((err) => {
      dispatch({
        type: types.ORDER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const detailOrder = (orderId) => (dispatch) => {
  dispatch({ type: types.ORDER_DETAIL_REQUEST, payload: orderId });

  const token = JSON.parse(localStorage.getItem("token"));
  axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:5000/api/orders/${orderId}`,
    headers: { "x-auth-token": token },
  })
    .then((res) => {
      dispatch({ type: types.ORDER_DETAIL_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: types.ORDER_DETAIL_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

const orderPayment = (order, paymentResult) => async (dispatch) => {
  dispatch({ type: types.PAYMENT_REQUEST, payload: { order, paymentResult } });
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("payment: ", paymentResult);

  axios({
    method: "PUT",
    data: paymentResult,
    withCredentials: true,
    url: `http://localhost:5000/api/orders/${order._id}/pay`,
    headers: { "x-auth-token": token },
  })
    .then((res) => {
      dispatch({ type: types.PAYMENT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: types.PAYMENT_FALI,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

export { createOrder, detailOrder, orderPayment };

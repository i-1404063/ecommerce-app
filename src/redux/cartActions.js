import * as types from "./constants";
import axios from "axios";

const cartItem = (id, qty) => (dispatch, getState) => {
  axios({
    method: "GET",
    withCredentials: true,
    url: `http://localhost:5000/api/products/${id}`,
  })
    .then((res) => {
      dispatch({
        type: types.ADD_TO_CART,
        payload: {
          title: res.data.title,
          price: res.data.price,
          image: res.data.image,
          countInStock: res.data.countInStock,
          product: res.data._id,
          qty,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    })
    .catch((err) => console.log(err.message));
};

const removeItem = (id) => (dispatch, getState) => {
  dispatch({ type: types.REMOVE_FROM_CART, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: types.SHIPPING_TO_CART, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

const savePayment = (payment) => (dispatch) => {
  dispatch({ type: types.PAYMENT_TO_CART, payload: payment });
};

export { cartItem, removeItem, saveShipping, savePayment };

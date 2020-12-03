import * as types from "./constants";
import axios from "axios";

const listProducts = () => (dispatch) => {
  dispatch({
    type: types.PRODUCT_LIST_REQUEST,
  });

  axios({
    method: "GET",
    withCredentials: true,
    url: `${types.api}/api/products`,
  })
    .then((res) => {
      dispatch({ type: types.PRODUCT_LIST_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: types.PRODUCT_LIST_FAIL, payload: err.message });
    });
};

const productDetail = (id) => (dispatch) => {
  dispatch({ type: types.PRODUCT_REQUEST, payload: id });

  axios({
    method: "GET",
    withCredentials: true,
    url: `${types.api}/api/products/${id}`,
  })
    .then((res) => {
      dispatch({ type: types.PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: types.PRODUCT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    });
};

export { listProducts, productDetail };

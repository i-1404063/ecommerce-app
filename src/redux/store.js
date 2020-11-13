import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { productDetailReducer, productListReducer } from "./productReducers";
import {
  signUpReducer,
  userProfileUpdateReducer,
  userSignInReducer,
} from "./userReducers";
import { orderDetailReducer, orderReducer } from "./orderReducers";
import { orderPaymentReducer } from "./paymentReducers";
import { cartItemReducer } from "./cartReducers";
import thunk from "redux-thunk";
import { orderMineListReducer } from "./orderHistoryReducers";
import { userDetailReducer } from "./userDetailReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},

    paymentInfo: "Paypal",
  },

  SignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  SignUp: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartItemReducer,
  SignIn: userSignInReducer,
  SignUp: signUpReducer,
  Order: orderReducer,
  orderDetails: orderDetailReducer,
  payOrder: orderPaymentReducer,
  orderListMine: orderMineListReducer,
  userDetails: userDetailReducer,
  UpdateProfile: userProfileUpdateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

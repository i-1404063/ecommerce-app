import React, { useEffect } from "react";
import * as types from "../redux/constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CheckOut from "./CheckOut";
import { createOrder } from "../redux/orderActions";
import MessageBox from "./Message";
import LoadingBox from "./Loading";

const PlaceOrder = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems, paymentInfo } = cart;

  if (!paymentInfo) {
    props.history.push("/payment");
  }

  const Order = useSelector((state) => state.Order);
  const { loading, success, orderInfo, error } = Order;

  const priceConvert = (number) => Number(number.toFixed(2));
  cart.itemsPrice = priceConvert(
    cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingCost =
    cart.itemsPrice > 100 ? priceConvert(0) : priceConvert(20);
  cart.taxPrice = priceConvert(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingCost + cart.taxPrice;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Todo: action dispatching to save order to backend
    dispatch(createOrder({ ...cart, orderItems: cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/orders/${orderInfo._id}`);
    }
    dispatch({ type: types.ORDER_RESET });
  }, [dispatch, success, orderInfo, props.history]);

  return (
    <div>
      <CheckOut step1 step2 step3 step4 />
      <div className="header__row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card__body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {shippingAddress.fullname} <br />
                  <strong>Address:</strong> {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalcode},{" "}
                  {shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card__body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {paymentInfo}
                </p>
              </div>
            </li>
            <li>
              <div className="card card__body">
                <h2>Order Items</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="header__row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`products/${item.product}`}>
                            {item.title}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card__body">
            <ul>
              <li>
                <h2>Order Summery</h2>
              </li>
              <li>
                <div className="header__row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="header__row">
                  <div>Shipping</div>
                  <div>${cart.shippingCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="header__row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="header__row">
                  <div>
                    <hr />
                    <h2>
                      <strong>Order Total</strong>
                    </h2>
                  </div>
                  <div>
                    <hr />
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="submit"
                  className="primary block"
                  onClick={handleSubmit}
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox>Loading...</LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

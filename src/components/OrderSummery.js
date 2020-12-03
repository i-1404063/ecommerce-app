import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../redux/constants";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { detailOrder, orderPayment } from "../redux/orderActions";
import MessageBox from "./Message";
import LoadingBox from "./Loading";
import axios from "axios";

const PlaceOrder = (props) => {
  const orderId = props.match.params.id;
  const [sdk, setSdk] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const payOrder = useSelector((state) => state.payOrder);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = payOrder;

  const dispatch = useDispatch();

  const handlePayment = (paymentResult) => {
    //Todo: dispatch for saving payment
    dispatch(orderPayment(order, paymentResult));
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get(`${types.api}/api/config/paypal`, {
        withCredentials: true,
      });
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: types.PAYMENT_RESET });
      dispatch(detailOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdk(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdk, successPay]);

  return loading ? (
    <LoadingBox>Loading...</LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>OrderId: {order._id}</h1>
      <div className="header__row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card__body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullname} <br />
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalcode},{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at: {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card__body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentInfo}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at: {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card__body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="header__row">
                  <div>Shipping</div>
                  <div>${order.shippingCost.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="header__row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
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
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdk ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={handlePayment}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;

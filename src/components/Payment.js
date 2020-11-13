import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../redux/cartActions";
import CheckOut from "./CheckOut";

const Payment = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentInfo } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const [payment, setPayment] = useState(paymentInfo);

  const handleChange = (e) => {
    setPayment(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Todo: action dispatching to save paymentMehtod in redux store
    dispatch(savePayment(payment));
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckOut step1 step2 step3 />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <label htmlFor="paypal">
            <input
              type="radio"
              value="Paypal"
              name="paymentInfo" //to select all of the radio button must have the same name attribute
              onChange={handleChange}
              checked
            />
            Paypal
          </label>
        </div>
        <div>
          <label htmlFor="stripe">
            <input
              type="radio"
              value="Stripe"
              name="paymentInfo" //to select all of the radio button must have the same name attribute
              onChange={handleChange}
            />
            Stripe
          </label>
        </div>
        <div>
          <button type="submit" className="primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;

import React, { useState } from "react";
import CheckOut from "./CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../redux/cartActions";

const Shipping = (props) => {
  const SignIn = useSelector((state) => state.SignIn);
  const { userInfo } = SignIn;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shipping, setShipping] = useState({
    fullname: shippingAddress.fullname,
    city: shippingAddress.city,
    postalcode: shippingAddress.postalcode,
    address: shippingAddress.address,
    country: shippingAddress.country,
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Todo: action dispatching to save shipping address in the redux store
    dispatch(saveShipping({ ...shipping }));
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckOut step1 step2 />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={shipping.fullname}
            onChange={handleChange}
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={shipping.address}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={shipping.city}
            onChange={handleChange}
            placeholder="Enter City"
            required
          />
        </div>
        <div>
          <label htmlFor="postalcode">Postal Code</label>
          <input
            type="text"
            name="postalcode"
            value={shipping.postalcode}
            onChange={handleChange}
            placeholder="Enter Postal Code"
            required
          />
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            value={shipping.country}
            onChange={handleChange}
            placeholder="Enter Country"
            required
          />
        </div>
        <div>
          <label></label>
          <button type="submit" className="primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shipping;

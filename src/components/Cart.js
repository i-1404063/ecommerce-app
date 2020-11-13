import React, { useEffect } from "react";
import { cartItem, removeItem } from "../redux/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "./Message";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const id = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const handleRemoveCartItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (id) {
      dispatch(cartItem(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div className="header__row">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is Empty{" "}
            <Link to="/" className="go-shopping">
              Go Shopping
            </Link>
          </MessageBox>
        ) : (
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
                    <Link to={`products/${item.product}`}>{item.title}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          cartItem(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCartItem(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card__body">
          <ul>
            <li>
              <h2>
                SubTotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="primary block"
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;

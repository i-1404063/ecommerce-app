import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import HomeScreen from "./components/HomeScreen";
import ProductScreen from "./components/ProductScreen";
import Signin from "./components/Signin";
import Register from "./components/Register";
import { userSignOut } from "./redux/userActions";
import Shipping from "./components/Shipping";
import Payment from "./components/Payment";
import PlaceOrder from "./components/PlaceOrder";
import OrderSummery from "./components/OrderSummery";
import OrderHistory from "./components/OrderHistory";
import Profile from "./components/Profile";

function App() {
  const cart = useSelector((state) => state.cart);
  const SignIn = useSelector((state) => state.SignIn);
  const { cartItems } = cart;
  const { userInfo } = SignIn;

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(userSignOut());
  };

  return (
    <div className="grid__container">
      <header className="header__row">
        <div>
          <a className="header__brand" href="/">
            Home
          </a>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="/" onClick={handleSignout}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <main>
        <Switch>
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/products/:id" component={ProductScreen} />
          <Route path="/orders/:id" component={OrderSummery} />
          <Route path="/signin" component={Signin} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/orderhistory" component={OrderHistory} />
          <Route path="/" component={HomeScreen} />
        </Switch>
      </main>
      <footer className="header__row center">All rights reserved</footer>
    </div>
  );
}

export default App;

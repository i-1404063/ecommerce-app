import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userSignIn } from "../redux/userActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "./Message";
import LoadingBox from "./Loading";

const Signin = (props) => {
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const SignIn = useSelector((state) => state.SignIn);
  const { userInfo, loading, error } = SignIn;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userSignIn(login.email, login.password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h2>Sing In</h2>
          {loading && <LoadingBox>loading...</LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sing In
          </button>
        </div>
        <div>
          <label />
          <div>
            New user?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create a new account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;

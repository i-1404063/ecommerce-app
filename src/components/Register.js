import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "./Message";
import LoadingBox from "./Loading";
import { signUp } from "../redux/registerActions";

const Register = (props) => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [flag, setFlag] = useState(false);

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const SignUp = useSelector((state) => state.SignUp);
  const { userInfo, loading, error } = SignUp;
  console.log("firsttime: ", SignUp);

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (register.password !== register.confirm) {
      setFlag(true);
    } else {
      setFlag(false);
      dispatch(signUp(register.name, register.email, register.password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo,props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h2>Register</h2>
          {loading && <LoadingBox>Loading...</LoadingBox>}
          {flag && (
            <MessageBox variant="danger">
              password and corfirm password did not match.
            </MessageBox>
          )}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div>
          <label htmlFor="name">Nick Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already hava an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

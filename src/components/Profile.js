import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from "../redux/constants";
import { detailUser, updateUserProfile } from "../redux/userDetailActions";
import MessageBox from "./Message";
import LoadingBox from "./Loading";

const Profile = (props) => {
  const SignIn = useSelector((state) => state.SignIn);
  const { userInfo } = SignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const UpdateProfile = useSelector((state) => state.UpdateProfile);
  const { loading: loadingUpdate, error: errorUpdate, success } = UpdateProfile;

  const [update, setUpdate] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (update.password !== update.confirm) {
      setMessage("password and confirm password are not matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name: update.name,
          email: update.email,
          password: update.password,
        })
      );
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: types.UPDATE_USERINFO_RESET });
      dispatch(detailUser(userInfo._id));
    } else {
      setUpdate({ name: user.name, email: user.email });
    }
  }, [dispatch, userInfo._id, user]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h2>Update Profile</h2>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {success && (
              <MessageBox variant="success">
                Profile Updated Successfully.
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Nick Name</label>
              <input
                type="text"
                name="name"
                value={update.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={update.email}
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
              {message && <MessageBox variant="danger">{message}</MessageBox>}
            </div>
            <div>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="confirm"
                onChange={handleChange}
                placeholder="Enter confirm password"
              />
            </div>
            <div>
              <label />
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Profile;

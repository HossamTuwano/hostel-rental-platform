import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { newPassword } from "../../actions/authActions";

function NewPassword() {
  const dispatch = useDispatch();

  const { token } = useParams();

  const errors = useSelector((state) => state.error.msg.message);

  //   const check = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  //   console.log(check);

  const [user, setUser] = useState({
    password: "",
    token,
  });
  //   state = {
  //     email: "",
  //     password: "",
  //     msg: null,
  //   };

  //   static propTypes = {
  //     isAuthenticated: PropTypes.bool,
  //     error: PropTypes.object.isRequired,
  //     login: PropTypes.func.isRequired,
  //     // clearError: PropTypes.func.isRequired
  //   };

  //   componentDidUpdate(prevState) {
  //     const { error } = this.props;
  //     if (error !== prevState.error) {
  //       // check for login error
  //       if (error.id === "LOGIN_FAIL") {
  //         this.setState({ msg: error.msg.msg });
  //       } else {
  //         this.setState({ msg: null });
  //       }
  //     }
  //   }

  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new user object

    const result = Object.assign(user);

    dispatch(newPassword(result));

    // if (check) {
    //   navigate("/");
    // }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //   console.log(isLoading);
  return (
    <div className="border w-full h-screen flex justify-center flex-col items-center bg-[#f7f5f5]">
      <div
        className={`form flex justify-center mt-16  w-[600px] shadow-lg p-[60px] rounded-lg bg-white mb-[10em] ${
          errors && "bg-red-900/20"
        } `}
      >
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="title mb-5">
            <h1 className="text-4xl px-10">
              <span className="text-cyan-900  font-bold">Welcome.</span>{" "}
              <span className="font-light text-gray-700">Please Login</span>
            </h1>
          </div>
          {errors ? <span className="text-red-700">{errors}</span> : null}
          <div className="mb-4">
            <label htmlFor="password" className="block"></label>
            <input
              className="shadow appearance-none rounded w-full text-gray-700 leading-tight focuse:shadow-outline py-1 px-3 border outline-none "
              type="password"
              name="password"
              placeholder="Enter New Password"
              onChange={onChange}
            />
          </div>

          <div className="submit mb-2">
            <button
              type="submit"
              className="bg-cyan-800 text-white font-bold py-1 px-4 rounded w-full cursor-pointer"
            >
              {isLoading ? "Loading..." : "Change Password"}
            </button>
          </div>

          <div className="px-3">
            <span>
              <hr />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   // called from root reducer
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// });

export default NewPassword;

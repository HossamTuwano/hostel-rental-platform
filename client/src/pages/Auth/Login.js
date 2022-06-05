import React from "react";
import { Link } from "react-router-dom";

function Login() {
  const handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  return (
    <div className="border w-full h-screen flex justify-center flex-col items-center bg-[#f7f5f5]">
      <div className="form flex justify-center mt-16 border-black w-[600px] shadow-lg p-[60px] rounded-lg bg-white mb-[10em] ">
        <form className="flex flex-col">
          <div className="title mb-5">
            <h1 className="text-4xl px-10">
              <span className="text-cyan-900  font-bold">Welcome.</span>{" "}
              <span className="font-light text-gray-700">Please Login</span>
            </h1>
          </div>

          <div className="email mb-4">
            <label htmlFor="email" className="block"></label>
            <input
              className="shadow appearance-none rounded w-full text-gray-700 leading-tight focuse:shadow-outline py-1 px-3 border outline-none "
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="password mb-4">
            <label htmlFor="password" className="block"></label>
            <input
              className="shadow appearance-none rounded w-full text-gray-700 leading-tight focuse:shadow-outline py-1 px-3 border outline-none"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <div className="submit mb-2">
            <input
              type="submit"
              value="Login"
              className="bg-cyan-800 text-white font-bold py-1 px-4 rounded w-full cursor-pointer"
            />
          </div>
          <div className="sign-in px-4 text-center mb-5">
            <span className="text-gray-700 text-sm font-light">
              Dont have an account?
              <Link
                to="/Signup"
                className="text-red-500 text-sm font-normal hover:text-red-900 hover:underline px-1"
              >
                Signup
              </Link>
            </span>
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

export default Login;

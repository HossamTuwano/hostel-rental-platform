import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../API/index";

function Login() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", user.email);
    formData.append("password", user.password);

    const loginUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${login}`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
        console.log(data);
        console.log(data.success);

        if (data.success) {
          navigate("/");
        } else {
          alert("wrong email or password");
        }
      } catch (error) {
        
      }
    };

    loginUser();
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="border w-full h-screen flex justify-center flex-col items-center bg-[#f7f5f5]">
      <div className="form flex justify-center mt-16 border-black w-[600px] shadow-lg p-[60px] rounded-lg bg-white mb-[10em] ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="bg-cyan-800 text-white font-bold py-1 px-4 rounded w-full cursor-pointer"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
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

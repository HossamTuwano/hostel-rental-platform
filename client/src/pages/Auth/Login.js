import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../API/index";

function Login() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");
    const remainingMilliseconds = new Date(expiryDate) - new Date().getTime();
    setIsAuth(true);
    setToken(token);
    setAutoLogout(remainingMilliseconds);
  }, []);

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

        if (data.success) {
          setUser(data);
          setToken(data.token);
          setIsLoading(false);
          setIsAuth(true);
          console.log(data);
          localStorage.setItem("success", true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("role", data.user.role.role_name);
          console.log(data.user.id);
          const remainingMilliseconds = 100000000000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem("expiryDate", expiryDate.toISOString());
          setAutoLogout(remainingMilliseconds);
          navigate("/");
        } else {
          alert("wrong email or password");
        }
      } catch (error) {
        console.log(error);
      }
    };

    loginUser();
  }

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    console.log("timeout");
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("success");
    localStorage.removeItem("role");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="border w-full h-screen flex justify-center flex-col items-center bg-[#f7f5f5]">
      <div className="form flex justify-center mt-16 border-black w-[600px] shadow-lg p-[60px] rounded-lg bg-white mb-[10em] ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="title mb-5">
            <h1 className="text-4xl px-10">
              <span className="text-cyan-900  font-bold">Welcome</span>{" "}
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

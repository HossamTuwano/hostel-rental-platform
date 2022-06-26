import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks";
import { GlobalContext } from "../../context/global-context";
import { useSelector } from "react-redux";

function Header({ success }) {
  const [token, setToken] = useState();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const role = useSelector((state) => state.auth.user?.role?.role_name);

  useState(() => {
    setToken(localStorage.getItem(token));
  });

  const handleLogout = () => {
    localStorage.clear();

    window.location.reload();
  };

  return (
    <div className="header w-full ">
      <div className="navigation  w-full">
        <ul className="flex justify-between px-5 py-5 bg-cyan-800 text-white ">
          <div className="logo">
            <Link to="/" className="uppercase">
              hrs
            </Link>
          </div>

          <div className="md:hidden visible text-lg"></div>

          <div className="md:flex hidden justify-between">
            {/* Register */}
            <div className="flex">
              {" "}
              <Link to="/" className="mx-2">
                {/* Logout */}
              </Link>
              <Link to="/manage-hostel" className="mx-2 ">
                {role === "landlord" ? "Manage Hostel" : ""}
              </Link>
            </div>

            <Link to="/Signup" className="mx-2">
              {!isAuthenticated && "Sign Up"}
            </Link>

            {isAuthenticated ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;

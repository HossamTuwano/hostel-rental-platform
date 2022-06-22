import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks";

function Header({ success }) {
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
                {localStorage.getItem("role") === "landlord"
                  ? "Manage Hostel"
                  : ""}
              </Link>
            </div>

            <Link to="/Signup" className="mx-2">
              Signup
            </Link>

            {success ? <button>Logout</button> : ""}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;

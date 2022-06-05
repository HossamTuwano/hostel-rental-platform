import React from "react";
import { Link } from "react-router-dom";
import { BsFillHouseDoorFill, BsHouseDoor } from "react-icons/bs";

function Signup() {
  const handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  return (
    <div className="form w-full h-screen flex justify-center items-center bg-[#f7f5f5] ">
      <div className="flex min-w-[800px] min-h-[450px] border rounded-md shadow">
        <div className="basis-[450px] bg-white flex justify-center ">
          <form className="flex flex-col justify-center">
            <div className="flex flex-col  ">
              <div className="title mb-5">
                <h1 className="text-4xl px-10">
                  <span className="text-cyan-900  font-bold">Create</span>{" "}
                  <span className="font-light text-gray-700">Account</span>
                </h1>
              </div>

              <div className="name mb-4">
                <label htmlFor="name" className="block"></label>

                <input
                  className="shadow appearance-none rounded w-full text-gray-700 leading-tight focuse:shadow-outline py-1 px-3 border outline-none"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
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
              <div className="phone mb-4">
                <label htmlFor="phone" className="block"></label>
                <input
                  className="shadow appearance-none rounded w-full text-gray-700 leading-tight focuse:shadow-outline py-1 px-3 border outline-none"
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block"></label>
                <select
                  className="shadow rounded w-full  leading-tight focuse:shadow-outline py-1 px-2 border outline-none text-[#9ca3af] text-md"
                  aria-label=".form-select-sm example"
                >
                  <option className="text-gray-700 bg-black">
                    Are you a Student or a Landlord?
                  </option>
                  <option value="student">Student</option>
                  <option value="owner">Hostel Owner</option>
                </select>
              </div>
              <div className="submit mb-2">
                <input
                  type="submit"
                  value="Register"
                  className="bg-cyan-800 text-white font-bold py-1 px-4 rounded w-full cursor-pointer"
                />
              </div>

              <div className="sign-in px-4 text-center">
                <span className="text-gray-700 text-sm font-light">
                  Already have an account?
                  <Link
                    to="/Login"
                    className="text-red-500 text-sm font-normal hover:text-red-900 hover:underline px-1"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>

        <div className="bg-main basis-[390px] flex justify-center flex-col items-center text-white text-[10rem]">
          <BsHouseDoor />
        </div>
      </div>
    </div>
  );
}

export default Signup;

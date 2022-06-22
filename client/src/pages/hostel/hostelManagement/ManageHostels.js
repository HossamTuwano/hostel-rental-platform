import React, { useState } from "react";

import { BsFillCalendarCheckFill } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { RiHomeGearFill } from "react-icons/ri";
import AddHostel from "../AddHostel";
import MyHostels from "./MyHostels";
import BookingListing from "./BookingListing";

const dropDown = [
  { id: 0, icon: <IoAddCircleOutline />, option: "post hostel" },
  { id: 2, icon: <AiOutlineHome />, option: "my hostels" },
  { id: 2, icon: <BsFillCalendarCheckFill />, option: "booking listing" },
];

function ManageHostels() {
  const [showManager, setShowManager] = useState(false);
  return (
    <div>
      <div>
        <div>
          <div className="addAccommodation w-full h-full flex flex-row p-0 m-0">
            <div className="flex w-2/12 flex-col px-4 border ">
              <div className="flex flex-col items-center justify-center space-y-3">
                <button className="flex items-center border-0 mt-9 outline-none text-lg tracking-wide">
                  <RiHomeGearFill className="mr-4 text-xl text-cyan-800" />
                  <div>Manage Hostels</div>
                </button>

                <div className=" w-full">
                  {dropDown.map((dropDown, i) => {
                    return (
                      <ul key={i} className=" w-full flex justify-start space-y-9 flex-col ">
                        {" "}
                        <button
                          onClick={() => setShowManager(dropDown?.option)}
                        >
                          <li className=" w-full flex font-medium text-xl space-x-3 items-center ">
                            <div className="text-cyan-900">
                              {dropDown?.icon}{" "}
                            </div>
                            <div> {dropDown?.option}</div>
                          </li>
                        </button>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-10/12 border-none  outline-none h-screen bg-[#F1F2F7] ">
              <div className="mb-9">
                <div className="edit-accommodation_header mb-1 border bg-white flex justify-between py-6 px-9">
                  <div className="logo">HOSTEL RENTING SYSTEM</div>
                  <div className="profile">
                    <i className="fas fa-user"></i>
                  </div>
                </div>

                <div>
                  {/* <!-- Add new Hostel Div --> */}
                  <div className="border rounded-lg h-4/5 w-12/12 m-5 bg-white">
                    <div>
                      {showManager === " " && " welcome to admin portal"}
                    </div>
                    {/* <!-- div header -->  */}
                    <div className=" px-3 py-3 border-b">
                      <h1 className="font-medium tracking-wide uppercase ">
                        {showManager}
                      </h1>
                    </div>
                    {showManager === "post hostel" && <AddHostel />}
                    {showManager === "my hostels" && <MyHostels />}
                    {showManager === "booking listing" && <BookingListing />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageHostels;

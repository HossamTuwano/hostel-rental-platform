import React from "react";
import { SearchIcon, CheckIcon } from "@heroicons/react/solid";

const howData = {
  stepOne: {
    id: 1,
    data: "Looking for safe and nice place to stay? Search and check the list of available hostels",
  },

  stepTwo: {
    id: 2,
    data: "allows Landlord to submit their properties and and registered users to get the informations about the hostels",
  },
  stepThree: {
    id: 3,
    data: "Contact the Landlord for bookings and visit appointments",
  },
};

const HowTo = () => {
  return (
    <div className="flex  justify-center ">
      <div className="flex bg-[#fff] flex-col w-[900px] shadow-md px-4 py-2 border-t-cyan-800 border-3 border">
        <div className="text-2xl mb-2">
          {" "}
          <span className="text-cyan-900 font-medium ">see</span> how it works
        </div>
        <div className="flex  justify-between ">
          <div className="flex flex-col w-[300px]  px-2 py-2">
            {/* step one */}
            <div className="flex items-center justify-between px-2">
              <div>
                <SearchIcon className="h-8 w-8 text-blue-500 opacity-80" />

                {/* <CheckIcon className="h-6 w-6 text-blue-500 absolute top-[662px] left-[433px] z-100" /> */}
              </div>
              <div className="font-medium w-[230px]  ">
                <span className="capitalize">choose where</span> you want
              </div>
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="text-3xl font-medium text-gray-300 ">
                {howData.stepOne.id}
              </div>
              <div className="text-sm w-[230px]">{howData.stepOne.data}</div>
            </div>
          </div>
          <div className="flex flex-col w-[300px]  px-2 py-2">
            {/* step one */}
            <div className="flex items-center justify-between px-2">
              <div>
                <SearchIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="font-medium w-[230px]  ">
                <span className="capitalize">
                  register as a student/Landlord
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="text-3xl font-medium text-gray-300 ">
                {howData.stepTwo.id}
              </div>
              <div className="text-sm w-[230px]">{howData.stepTwo.data}</div>
            </div>
          </div>{" "}
          <div className="flex flex-col w-[300px]  px-2 py-2">
            <div className="flex items-center justify-between px-2">
              <div>
                <SearchIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="font-medium w-[230px]  ">
                <span className="capitalize">Contact and Details</span>
              </div>
            </div>
            <div className="flex items-center justify-between px-2">
              <div className="text-3xl font-medium text-gray-300 ">
                {howData.stepThree.id}
              </div>
              <div className="text-sm w-[230px]">{howData.stepThree.data}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowTo;

import React from "react";
import { HiLocationMarker } from "react-icons/hi";

function ViewHostel() {
  return (
    <div className="flex justify-center flex-col items-center space-y-4">
      <div className="mt-3 bg-[#fff] w-[1400px] border px-3 py-4 rounded">
        <div className="">
          <div className="font-medium text-3xl mb-2">
            <pre>name</pre>
          </div>{" "}
          <div className="flex">
            <div>posted in 1 months</div>{" "}
            <span className="ml-3 capitalize">
              <pre>region</pre> :&nbsp; <pre>city</pre>
            </span>
            <HiLocationMarker className=" h-5 w-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[270px] mt-2">
          <div className="border-none overflow-hidden bg-gray-400 w-[800px] h-[500px] rounded">
            <img
              src=""
              alt=""
              className="h-full w-full object-cover bg-no-repeat"
            />
          </div>
          <div className="bg-[#f8f9fa] w-[550px] h-[500px] rounded ">
            <div className="px-3 py-3">
              <div></div>
              <div className="capitalize font-medium">property type</div>
              <div>room_type</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto border flex rounded-md p-3">
        <div className="rounded-md w-[100px] h-[100px] bg-gray-500 overflow-hidden">
          <img
            src=""
            alt=""
            className="bg-center h-full w-full bg-repeat bg-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ViewHostel;

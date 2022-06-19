import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { get_hostel } from "../../API";
import { localhost } from "../../API";
import useFetch from "../../hooks/useFetch";

const id = localStorage.getItem("id");
const url = `${get_hostel}/${id}`;

function ViewHostel() {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading ...</div>;
  if (error) return <pre>error</pre>;
  const hostel = data.hostel;
  // console.log(hostel);

  return (
    <div className="flex justify-center flex-col items-center space-y-4">
      <div className="mt-3 bg-[#fff] w-[1400px] border px-3 py-4 rounded">
        <div className="">
          <div className="font-medium text-3xl mb-2">
            <pre>{hostel?.hostel_name}</pre>
          </div>{" "}
          <div className="flex">
            <div>2 months ago</div>{" "}
            <div className="ml-3 capitalize">Dar es salaam :&nbsp; Mwenge</div>
            <HiLocationMarker className=" h-5 w-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[270px] mt-2">
          <div className="border-none overflow-hidden bg-gray-400 w-[800px] h-[500px] rounded">
            <img
              src={`${localhost}${hostel?.image[2]}`}
              alt=""
              className="h-full w-full object-cover bg-no-repeat"
            />
          </div>
          <div className="bg-[#f8f9fa] w-[550px] h-[500px] rounded ">
            <div className="px-3 py-3">
              <div></div>
              <div className="capitalize font-medium  flex justify-between mb-2">
                <div>status</div>
                <div>Available</div>
              </div>
              <div className="capitalize font-medium  flex justify-between mb-2">
                <div>bed options</div>
                <div>{hostel?.bed_options}</div>
              </div>
              <div className="capitalize font-medium  flex justify-between mb-2">
                <div>number of beds</div>
                <div>{hostel?.no_of_beds}</div>
              </div>
              <div className="capitalize font-medium  flex justify-between mb-2">
                <div>Room price</div>
                <div>{hostel?.price} Tsh/months</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto border flex space-x-3 rounded-md p-3">
        {hostel?.image.map((img) => (
          <div className="rounded-md w-[100px] h-[100px] bg-gray-500 overflow-hidden">
            <img
              src={`${localhost}${img}`}
              alt=""
              className="w-full h-full bg-center bg-cover bg-no-repeat"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewHostel;

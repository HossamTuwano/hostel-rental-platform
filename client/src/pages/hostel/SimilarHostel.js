import React from "react";
import { localhost } from "../../API/index";
import { FaBed } from "react-icons/fa";

function SimilarHostel({
  name,
  price,
  district,
  region,
  roomType,
  phone,
  contactName,
  bedOption,
  noOfBeds,
  imgUrl,
}) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <div className="h-[200px]  ">
        <img
          src={`${localhost}${imgUrl}`}
          alt=""
          className="w-full h-full bg-cover bg-no-repeat bg-center"
        />
      </div>
      <div className="p-2">
        <p className="font-medium text-xl  tracking-wider text-cyan-900">
          {name}
        </p>
        <p className="text-lg">
          <span className="font-medium tracking-wider text-cyan-900">
            {district}, {region}
          </span>
        </p>

        <div className="flex items-center space-x-2">
          <FaBed /> <span>{noOfBeds}</span>
        </div>
      </div>
    </div>
  );
}

export default SimilarHostel;

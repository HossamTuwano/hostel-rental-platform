import React from "react";
import { localhost } from "../../API/index";

function SimilarHostel({
  name,
  price,
  city,
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
        <p className="font-medium text-xl">{name}</p>
        <p className="text-lg">
          <span>
            {city},{region}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SimilarHostel;

import React from "react";

function Hostel({
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
  console.log(name);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-[200px]  ">
        <img
          src={`http://localhost:8000/${imgUrl}`}
          alt=""
          className="w-full h-full bg-cover bg-no-repeat bg-center"
        />
      </div>
      <div>contents</div>
      {name}
    </div>
  );
}

export default Hostel;

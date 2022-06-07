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
}) {
  console.log(name);
  return (
    <div className="container mx-auto width-[900px] flex p-4">
      <div className="border rounded w-[300px] h-[300px] flex flex-col">
        <div className="h-[200px]">
          <img
            src=""
            alt=""
            className="w-full h-full bg-cover bg-no-repeat bg-center"
          />
        </div>
        <div>contents</div>
        {name}
      </div>
    </div>
  );
}

export default Hostel;

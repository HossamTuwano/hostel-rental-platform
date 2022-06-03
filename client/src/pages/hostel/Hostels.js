import React, { useState, useEffect } from "react";
import { add_hostel } from "../../API";

const Hostels = () => {
  const [hostel, setHoste] = useState();

  //   console.log(add_hostel);
  useEffect(() => {
    const getHostel = async () => {
      const response = await fetch(`${add_hostel}`);
      const data = await response.json();
      console.log(data);
    };

    getHostel();
  });
  return <div></div>;
};

export default Hostels;

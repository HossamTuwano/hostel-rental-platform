import React, { useState, useEffect } from "react";
import { add_hostel } from "../../API";

const AddHostel = () => {
  const [hostel, setHoste] = useState();

  useEffect(() => {
    function getHostel() {
      try {
        const response = async () =>
          fetch(`${add_hostel}`, {
            method: "POST",
          });
      } catch {
        console.error();
      }
    }
  });
  return <div></div>;
};

export default AddHostel;

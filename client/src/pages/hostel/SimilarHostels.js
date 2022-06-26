import React, { useState } from "react";
import { Link } from "react-router-dom";
import { get_similar_hostel } from "../../API";
import { useFetch } from "../../hooks/index";
import Hostel from "./Hostel";
import Loader from "../../components/Loader/Loader";
import SimilarHostel from "./SimilarHostel";
import { RiSkipBackMiniLine } from "react-icons/ri";

const SimilarHostels = ({ contact_name }) => {
  const { data, loading, error } = useFetch(
    `${get_similar_hostel}${contact_name}`
  );

  if (loading)
    return (
      <div className="border flex justify-center flex-col items-center absolute left-0 top-0 w-screen h-screen bg-white">
        <Loader />
      </div>
    );
  if (error) <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div className="grid grid-cols-4 gap-5 p-4  container mx-auto ">
      {data?.hostel?.map((hos) => (
        <Link
          to="View-hostel" 
          key={hos._id}
          onClick={() => {
            localStorage.setItem("id", hos._id);
          }}
        >
          <SimilarHostel
            className=""
            name={hos.hostel_name}
            imgUrl={hos?.image[0]}
            region={hos.region}
            district={hos.district}
            noOfBeds={hos.noOfBeds}
          />
        </Link>
      ))}
    </div>
  );
};

export default SimilarHostels;

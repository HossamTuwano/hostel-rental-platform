import React from "react";
import { get_hostels } from "../../API";
import useFetch from "../../hooks/useFetch";
import Hostel from "./Hostel";

const Hostels = () => {
  const { data, loading, error } = useFetch(`${get_hostels}`);

  if (loading) return <h1>Loading...</h1>;
  if (error) <pre>{JSON.stringify(error, null, 2)}</pre>;
  console.log(data);
  return (
    <div className="grid grid-cols-4 gap-5 p-4  container mx-auto ">
      {data?.hostel?.map((hos) => (
        <Hostel className="" key={hos._id} name={hos.hostel_name} imgUrl={hos.image} />
      ))}
    </div>
  ); 
};

export default Hostels;

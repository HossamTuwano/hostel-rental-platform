import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get_post_hostels, regions_api } from "../../API";
import { useFetch } from "../../hooks";
import Hostel from "./Hostel";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import "../../css/overflow.css";
import Filter from "../../components/Filter";
const Hostels = () => {
  // const { data, loading, error } = useFetch(`${get_hostels}`);
  const [isChecked, setIsChecked] = useState();
  const [hostels, setHostels] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const { data } = useFetch(`${regions_api}/dar-es-salaam`);

  const regions = data.districts;

  const getProducts = async () => {
    const formData = new FormData();
    formData.append("checkbox", isChecked);
    setLoading(true);
    // axios.post(`${get_post_hostels}`, variables).then((response) => {
    //   setData(response.data);
    //   setLoading(false);
    // });

    const response = await fetch(`${get_post_hostels}`, {
      method: "POST",
      formData: formData,
    });
    const data = await response.json();
    setHostels(data);
    setLoading(false);
  };

  const handleFilter = () => {
    getProducts();
  };

  const handleChange = (e) => {
    setIsChecked(e.target.value);
    console.log(isChecked);
    if (isChecked) {
      getProducts();
    }
  };

  // useState(() => {
  //   setLoading(true);
  //   const fetch = (filter) =>
  //     axios.post(`${get_post_hostels}`, filter).then((response) => {
  //       // console.log(response.data);
  //       setData(response.data);
  //       setLoading(false);
  //     });
  //   fetch();
  // }, [data]);

  // const updateView = (e) => {
  //   window.onbeforeunload = () => {
  //     e.preventDefault();
  //     setLoading(true);
  //     const fetch = (filter) =>
  //       axios.post(`${get_post_hostels}`, filter).then((response) => {
  //         // console.log(response.data);
  //         setData(response.data);
  //         setLoading(false);
  //       });
  //     fetch();
  //   };
  // };

  // console.log(data);

  // const getData = async (filter) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`{get_hostels}`, {
  //       method: "GET",
  //       // body: filter,
  //     });

  //     const data = await response.json();
  //     setLoading(false);
  //     setData(data);
  //   } catch (error) {
  //     setError(error);
  //     console.log(error);
  //   }
  // };

  // getData();

  if (loading)
    return (
      <div className=" flex justify-center flex-col items-center absolute left-0 top-0 w-screen h-screen bg-white">
        <Loader />
      </div>
    );
  if (error) <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-4 container w-[1200px]  overflow-auto">
        {hostels?.hostel?.map((hos) => (
          <Link
            to="View-hostel"
            key={hos._id}
            onClick={() => {
              localStorage.setItem("hostelId", hos._id);
            }}
          >
            <Hostel
              className=""
              name={hos.hostel_name}
              imgUrl={hos?.image[0]}
              region={hos.region}
              district={hos.district}
              street={hos.street}
              ward={hos.ward}
              noOfBeds={hos.no_of_beds}
            />
          </Link>
        ))}
      </div>
      <div>
        <div className=" flex justify-center px-2 w-[200px] h-[200px]">
          <fieldset className="flex flex-col  justify-center w-full">
            <legend className="flex justify-center">
              <span className="px-4 font-rubik text-xl text-cyan-800 tracking-wider ">
                Districts
              </span>
            </legend>
            {regions?.map((region, i) => {
              return (
                <form key={i}>
                  <div className=" flex items-center space-x-2 justify-start px-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      value={region}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="regions"
                      className="text-cyan-800 text-md"
                    >{`${region}`}</label>
                  </div>
                </form>
              );
            })}
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Hostels;

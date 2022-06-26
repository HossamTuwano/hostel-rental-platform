import React, { useState } from "react";
import { useFetch } from "../../hooks";
import { regions_api, get_post_hostels } from "../../API/index";
import { RiHardDrive2Line } from "react-icons/ri";
import { useEffect } from "react";

function Filter({ updateView }) {
  const [isChecked, setIsChecked] = useState();

  const { data } = useFetch(`${regions_api}/dar-es-salaam`);

  const regions = data.districts;

  // const handleFilter = async () => {
  //   const formData = new FormData();
  //   formData.append("checkbox", isChecked);

  //   try {
  //     const response = await fetch(`${get_post_hostels}`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleChange = (e) => {
    setIsChecked(e.target.value);
    console.log(isChecked);
  };

  return (
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
  );
}

export default Filter;

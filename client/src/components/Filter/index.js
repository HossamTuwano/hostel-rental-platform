import React, { useState } from "react";
import { useFetch } from "../../hooks";
import { regions_api } from "../../API/index";
import { RiHardDrive2Line } from "react-icons/ri";

function Filter({ children, limit }) {
  const [IsReadMoreShown, setIsReadMoreShown] = useState(false);

  const [isChecked, setIsChecked] = useState();

  const { data } = useFetch(regions_api);

  const regions = data.regions;

  const toggle = () => {
    setIsReadMoreShown((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setIsChecked(e.target.  value);
  };

  console.log(isChecked);
  return (
    <div className=" flex justify-center px-2 w-[200px]">
      <fieldset className="flex flex-col shadow-sm justify-center w-full">
        <legend className="flex justify-center">
          <span className="px-4 font-rubik text-xl text-cyan-800 tracking-wider ">
            Region
          </span>
        </legend>
        {regions?.map((region, i) => {
          return (
            <div className=" flex items-center space-x-2 justify-start px-2">
              <input
                type="checkbox"
                value={region}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="regions"
                className="text-cyan-800 text-md"
              >{`${region}`}</label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
}

export default Filter;

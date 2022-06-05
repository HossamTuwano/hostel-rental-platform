import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  return (
    <div className="w-full  md:bg-none md:border-none border-b md:flex justify-center md:absolute md:mt-[-32px] ">
      {/* search bar container */}
      <div className=" bg-[#ffff] flex justify-between px-3 py-3 md:border md:rounded md:w-[70rem]">
        {/* search input */}

        <div className="w-8/12 mr-3 border border-[[#9c9999] rounded flex items-center px-1">
          <div className=" flex items-center text-center">
            <AiOutlineSearch className="text-lg text-[#9c9999]" />
          </div>
          <input
            type="text"
            className="rounded focus:outline-none h-9 w-full px-2 mr-3"
            placeholder="Search for a place or accommodation"
          />
        </div>

        <div className="md:mr-3 hidden md:flex  rounded border px-1 ">
          <input
            type="number"
            className=" focus:outline-none h-9 px-2 w-90"
            placeholder="Price"
          />
        </div>

        <div className="w-28">
          <button className="outline-none w-full bg-inherit h-9 bg-main text-white rounded ">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

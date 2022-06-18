import React, { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

import { search_hostel } from "../../API";
import SearchPage from "../../pages/hostel/SearchPage";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [searchResult, setSearchResult] = useState();
  const [hideSearch, setHideSearch] = useState(true);
  const clear = useRef(null);

  const searchHostel = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${search_hostel}${searchQuery}`);
      const data = await response.json();
      setSearchResult(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setHideSearch(false);
    clear.current();
  };

  return (
    <div className="flex flex-col">
      <div className="w-full  md:bg-none md:border-none border-b md:flex justify-center md:absolute md:mt-[-32px] ">
        {/* search bar container */}
        <form onSubmit={searchHostel}>
          <div className=" bg-[#ffff] flex justify-between px-3 py-3 md:border md:rounded md:w-[70rem]">
            {/* search input */}

            <div className="w-8/12 mr-3 border border-[[#9c9999] rounded flex items-center px-1">
              <div className=" flex items-center text-center">
                <AiOutlineSearch className="text-lg text-[#9c9999]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                className="rounded focus:outline-none h-9 w-full px-2 mr-3"
                placeholder="Search for a place or accommodation"
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={clear}
              />
            </div>

            <div className="md:mr-3 hidden md:flex  rounded border px-1 ">
              <input
                type="number"
                className=" focus:outline-none h-9 px-2 w-90"
                placeholder="Price"
                // onChange={handleChange}
              />
            </div>

            <div className="w-28">
              <button className="outline-none w-full bg-inherit h-9 bg-main text-white rounded ">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="container mx-auto mt-16">
        {searchResult && (
          <div>
            {hideSearch && (
              <SearchPage
                results={searchResult}
                query={searchQuery}
                click={handleSearch}
                loading={loading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

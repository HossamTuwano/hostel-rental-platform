import React from "react";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import HowTo from "../../components/HowTo/Howto";
import SearchBar from "../../components/SearchBar/SearchBar";
import Hostels from "../hostel/Hostels";

function Home() {
  return (
    <div>
      <Header />
      <div>
        <Banner />
        <SearchBar />
      </div>
      <div className="border-none outline-none font-rubik text-gray-500 mt-4 py-2 px-3 text-center font-medium text-lg capitalize flex flex-col items-center md:mt-12 ">
        helping student to easily find places to live
        <div className="bg-cyan-600 w-8 h-1 mt-2"></div>
      </div>
      <div>
        <h4 className="px-2  text-center mt-4 mb-4 capitalize text-gray-500 font-medium flex justify-center">
          browse available hostels
        </h4>

        <div className="mb-[50px]">
          <HowTo />
        </div>
        <div className="">
          <Hostels />
        </div>
      </div>
    </div>
  );
}

export default Home;

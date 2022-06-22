import React from "react";
import { Link } from "react-router-dom";

function SearchPage(props) {
  if (props.loading) return <div>Searching ...</div>;
  return (
    <div
      to="/view-hostel"
      className="border flex flex-col justify-center items-center p-4"
    >
      <div className=" flex justify-end mb-5  w-[1400px] px-2 py-3">
        <p>
          <span className=" mr-[600px]">
            {" "}
            Search Result for{" "}
            <span className="font-medium text-lg capitalize">
              {" "}
              {`"${props.query}"`}{" "}
            </span>
          </span>

          <button
            onClick={props.click}
            className="border-0 outline-none bg-red-300 rounded-sm px-4  font-medium text-white shadow-sm"
          >
            close <span className="text-lg">x</span>
          </button>
        </p>
      </div>

      {props.results?.hostel?.map((hostel) => (
        <Link
          to="View-hostel"
          key={hostel._id}
          className="border rounded-md shadow-md w-[800px] mb-5 flex justify-between overflow-hidden"
          onClick={() => {
            localStorage.setItem("id", hostel._id);
          }}
        >
          <div className="flex">
            <div className=" w-[100px] h-[100px] mr-3">
              <img
                src={`http://localhost:8000/${hostel?.image[0]}`}
                alt=""
                className="w-full h-full bg-no-repeat bg-cover bg-center"
              />
            </div>

            <div>
              <p className="font-medium text-lg uppercase">
                {hostel.hostel_name}
              </p>
              <p className="capitalize">
                {hostel.region}, {hostel.city}
              </p>
              <p className="capitalize mt-4 text-lg font-semibold">
                {hostel?.status === 0 ? "Available" : "Booked"}
              </p>
            </div>
          </div>

          <div className="border-l px-4 flex flex-col justify-around">
            <p className="font font-medium text-lg">
              <div className="flex justify-end">
                {" "}
                <span className="inline">Tsh</span>
                {hostel.price}
              </div>
            </p>
            <button className="border-0 outline-none w-[150px] bg-cyan-500 text-white font-medium rounded-md">
              View
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchPage;

import React from "react";
import { Link } from "react-router-dom";

function SearchPage(props) {
  if (props.loading) return <div>Searching ...</div>;
  return (
    <div
      to="/view-hostel"
      className="border flex flex-col justify-center items-center p-4"
    >
      <div className=" flex justify-center mb-5 ">
        <p>
          Search Result for {`"${props.query}"`}{" "}
          <button onClick={props.click}>
            exit search <span>x</span>
          </button>
        </p>
      </div>

      {props.results?.hostel?.map((hostel) => (
        <Link
          to="/view-hostel"
          key={hostel._id}
          className="border w-[800px] mb-5 flex"
        >
          <div className=" w-[100px] h-[100px] mr-3">
            <img
              src={`http://localhost:8000/${hostel.image}`}
              alt=""
              className="w-full h-full bg-no-repeat bg-cover bg-center"
            />
          </div>

          <div>
            <p className="font-medium text-lg">hostel name</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SearchPage;

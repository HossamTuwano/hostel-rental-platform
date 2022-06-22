import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { get_hostel, update_status, accept_booking } from "../../API";
import { localhost } from "../../API";
import { useFetch } from "../../hooks/index";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import SimilarHostels from "./SimilarHostels";
import ConfirmBooking from "../../components/ConfimBooking";
const id = localStorage.getItem("id");
const url = `${get_hostel}/${id}`;

function ViewHostel(props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const { data, loading, error } = useFetch(
    `${get_hostel}/${localStorage.getItem("id")}`
  );

  const id = {
    id: data.hostel?._id,
  };

  const handleStatus = (e) => {
    e.preventDefault();

    setShowConfirm((prev) => !prev);

    setTimeout(() => {
      setShowConfirm((prev) => !prev);
    }, 1000);

    const formData = new FormData();

    formData.append("id", id.id);

    fetch(`${update_status}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((error) => console.log(error));
  };

  if (loading)
    return (
      <div className="h-[800px] flex justify-center flex-col items-center">
        <Loader />
      </div>
    );
  if (error) return <pre>error</pre>;
  const hostel = data.hostel;

  return (
    <div>
      {showConfirm && (
        <div className="border absolute w-full h-screen flex justify-center flex-col items-center">
          {" "}
          <ConfirmBooking />
        </div>
      )}

      <div className="flex justify-center flex-col items-center space-y-4">
        <div
          key={hostel?._id}
          className="mt-3 bg-[#fff] w-[1400px] border px-3 py-4 rounded"
        >
          <div className="">
            <div className="font-medium text-3xl mb-2">
              <pre>{hostel?.hostel_name}</pre>
            </div>{" "}
            <div className="flex">
              <div>2 months ago</div>{" "}
              <div className="ml-3 capitalize">
                Dar es salaam :&nbsp; Mwenge
              </div>
              <HiLocationMarker className=" h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-[270px] mt-2">
            <div className="border-none overflow-hidden bg-gray-400 w-[800px] h-[500px] rounded">
              <img
                src={`${localhost}${hostel?.image[2]}`}
                alt=""
                className="h-full w-full object-cover bg-no-repeat"
              />
            </div>
            <div className="bg-[#f8f9fa] w-[550px] h-[500px] rounded ">
              <div className="px-3 py-3">
                <div></div>
                <div className="capitalize font-medium  flex justify-between mb-2">
                  <div>status</div>
                  <div>{hostel?.status === 0 ? "Available" : "Booked"}</div>
                </div>
                <div className="capitalize font-medium  flex justify-between mb-2">
                  <div>bed options</div>
                  <div>{hostel?.bed_options}</div>
                </div>
                <div className="capitalize font-medium  flex justify-between mb-2">
                  <div>number of beds</div>
                  <div>{hostel?.no_of_beds}</div>
                </div>
                <div className="capitalize font-medium  flex justify-between mb-2">
                  <div>Room price</div>
                  <div>{hostel?.price} Tsh/months</div>
                </div>
                <div className="capitalize font-medium  flex justify-between mb-2">
                  <div>Owner</div>
                  <div>{hostel?.contact_name} </div>
                </div>
              </div>
              <form action="" onSubmit={handleStatus}>
                <div className="px-3 py-3">
                  <input
                    type="number"
                    value={id.id}
                    className="text-black"
                    name="id"
                    readOnly
                    hidden
                  />

                  <button className="capitalize font-medium shadow-sm rounded-md bg-cyan-800 text-white px-3 py-2 ">
                    book now
                  </button>
                </div>
              </form>
            </div>
            +
          </div>
        </div>

        <div className="container mx-auto border flex space-x-3 rounded-md p-3">
          {hostel?.image.map((img, i) => (
            <div
              key={i}
              className="rounded-md w-[100px] h-[100px] bg-gray-500 overflow-hidden"
            >
              <img
                src={`${localhost}${img}`}
                alt=""
                className="w-full h-full bg-center bg-cover bg-no-repeat"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-9">
        <div className="container mx-auto font-medium tracking-wide ">
          Hostels from Similar Owner
        </div>
        <SimilarHostels contact_name={hostel?.contact_name} />
      </div>

      <div className="mt-[300px]">
        <Footer />
      </div>
    </div>
  );
}

export default ViewHostel;

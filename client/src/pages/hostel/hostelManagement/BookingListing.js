import React, { useState } from "react";
import { useFetch } from "../../../hooks";
import {
  get_booking_listings,
  accept_booking,
  update_status,
} from "../../../API/index";
import Loader from "../../../components/Loader/Loader";

function ManageHostel() {
  const [bookedId, setBookedId] = useState();
  // fetching booking listing
  const { data, loading, error } = useFetch(get_booking_listings);

  if (loading)
    return (
      <div className="flex justify-center py-5">
        <Loader />
      </div>
    );
  if (error) <pre> {JSON.stringify(error, null, 2)} </pre>;

  const id = {
    id: bookedId,
  };

  // accept booking handler

  const handleStatus = (e) => {
    e.preventDefault();
    // console.log(id.id);

    // const getBookedId = async () => {
    //   const bookedHostel = await data.hostel?.map((bookedId, i) => {
    //     setBookedId(bookedId?._id);
    //   });
    // };

    // getBookedId();

    // setShowConfirm((prev) => !prev);

    // setTimeout(() => {
    //   setShowConfirm((prev) => !prev);
    // }, 1000);

    const formData = new FormData();

    formData.append("id", bookedId);

    fetch(`${accept_booking}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((error) => console.log(error));
  };

  const handleId = () => {};

  // console.log(id.id);

  return (
    <div className="flex justify-center px-5 py-3">
      <table className="border-collapse table-fixed w-full">
        <thead>
          <tr>
            <th className="p-3 capitalize tracking-wider" scope="col">
              hostel
            </th>
            <th className="p-3 capitalize tracking-wider" scope="col">
              price
            </th>
            <th className="p-3 capitalize tracking-wider" scope="col">
              status
            </th>
            <th className="p-3 capitalize tracking-wider" scope="col">
              posted
            </th>
            <th className="p-3 capitalize tracking-wider" scope="col">
              Student Name
            </th>
            <th className="p-3 capitalize tracking-wider" scope="col">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {data.hostel?.map((hostel) => (
            <tr
              className="odd:bg-[#f1f2f7]"
              key={hostel._id}
              onClick={() => setBookedId(hostel?._id)}
            >
              <td className="p-3 text-center capitalize tracking-wide">
                {hostel.hostel_name}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                <span>Tsh</span>
                {hostel.price}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                {(hostel?.status === 1 && "Pending") ||
                  (hostel?.status === 2 && "Accepted")}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                2 Months Ago
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                {hostel?.contact_name}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                {hostel?.phone}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                <form onSubmit={handleStatus}>
                  <input
                    type="number"
                    value={id.id}
                    className="text-black"
                    name="id"
                    readOnly
                    hidden
                  />

                  <button
                    title={
                      (hostel?.status === 1 && "Click to send email notification to the student") ||
                      (hostel?.status === 2 && "Email already sent")
                    }
                    disabled={
                      (hostel?.status === 1 && false) ||
                      (hostel?.status === 2 && true)
                    }
                    className={`capitalize font-medium shadow-sm rounded-md ${
                      (hostel?.status === 1 && "bg-cyan-800") ||
                      (hostel?.status === 2 && "bg-gray-400")
                    } text-white px-3 py-2 `}
                  >
                    Accept
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageHostel;

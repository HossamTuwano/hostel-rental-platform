import React from "react";
import useFetch from "../../../hooks/useFetch";
import { get_hostels } from "../../../API/index";
import Loader from "../../../components/Loader/Loader";

function ManageHostel() {
  const { data, loading, error } = useFetch(get_hostels);
  if (loading)
    return <div className="flex justify-center py-5"><Loader/></div>;  
  if (error) <pre> {JSON.stringify(error, null, 2)} </pre>;

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
            <th className="p-3 capitalize tracking-wider" scope="col"></th>
            <th className="p-3 capitalize tracking-wider" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.hostel?.map((hostel) => (
            <tr className="odd:bg-[#f1f2f7]" key={hostel._id}>
              <td className="p-3 text-center capitalize tracking-wide">
                {hostel.hostel_name}
              </td>  
              <td className="p-3 text-center capitalize tracking-wide">
                <span>Tsh</span>
                {hostel.price}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                Available
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                2 Months Ago
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                <button className="capitalize tracking-wide border-0 outline-none rounded-sm shadow-sm bg-cyan-600 px-3 font-semibold text-white">
                  update
                </button>
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                <button className="border-0 capitalize tracking-wide outline-none rounded-sm shadow-sm bg-[#dc3545] px-3 font-semibold text-white">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{
  /* <tr className="odd:bg-[#f1f2f7]"> */
}

{
  /* <td className="p-3 text-center capitalize tracking-wide">
                {hostel.price}
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                Tsh80000
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                Available
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                2 Months Ago
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                <button className="capitalize tracking-wide border-0 outline-none rounded-sm shadow-sm bg-cyan-600 px-3 font-semibold text-white">
                  update
                </button>
              </td>
              <td className="p-3 text-center capitalize tracking-wide">
                <button className="border-0 capitalize tracking-wide outline-none rounded-sm shadow-sm bg-[#dc3545] px-3 font-semibold text-white">
                  delete
                </button>
              </td> */
}
{
  /* </tr> */
}

export default ManageHostel;

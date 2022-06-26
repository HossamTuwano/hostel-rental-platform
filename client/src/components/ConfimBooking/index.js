import React from "react";

function ConfirmBooking({ message }) {
  return (
    <div className="w-[400px] h-[200px] bg-[#30819a] -400 flex flex-col items-center justify-center rounded-md ">
      <div className="text-[white] font-medium tracking-wide text-2xl ">
        {message}
      </div>
    </div>
  );
}

export default ConfirmBooking;

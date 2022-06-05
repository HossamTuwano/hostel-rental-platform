import React from "react";
import bannerImg from "../../assets/images/student.jpg";

function Banner() {
  return (
    <div className="w-full md:h-96">
      <img
        src={bannerImg}
        alt="students in bed"
        className="bg-cover w-full bg-center bg-no-repeat h-full "
      />
    </div>
  );
}

export default Banner;

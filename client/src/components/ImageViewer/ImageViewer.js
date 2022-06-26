import React from "react";
import { localhost } from "../../API";

function ImageViewer({ images, index }) {
  console.log(index);

  return (
    <div className="shadow-md container mx-auto w-[1000px] h-[700px]">
      <img
        src={`${localhost}${images[index]}`}
        alt=""
        className="w-full h-full"
      />
    </div>
  );
}

export default ImageViewer;

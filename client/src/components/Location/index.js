import React, { useState } from "react";
import { useFetch } from "../../hooks";
import { regions_api } from "../../API/index";

function Location({ name }) {
  const [dist, setDist] = useState();
  const { data } = useFetch(regions_api);
  const { district = data } = useFetch(`${regions_api}${dist}`);
  //   const {}

  const regions = data?.regions;

  return (
    <div class="flex justify-center">
      <div class="mb-3 xl:w-96 flex space-x-8">
        <select
          name={name}
          class="form-select form-select-sm

    block
    w-full
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-sm example"
        >
          {regions?.map((region) => {
            return (
              <>
                <option selected="shit">{region}</option>
              </>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Location;

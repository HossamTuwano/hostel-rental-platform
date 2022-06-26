import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiHomeGearFill } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { useFetch } from "../../hooks";
import { regions_api } from "../../API";
import { useDeferredValue } from "react";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import ConfirmBooking from "../../components/ConfimBooking";

const dropDown = ["post hostel", "my hostels", "booking listing"];

function AddHostel() {
  const [hostel, setHostel] = useState({
    hostel_name: "",
    contact_name: "",
    price: "",
    phone: "",
    region: "",
    district: "",
    ward: "",
    street: "",
    image: "",
    room_type: "",
    bed_options: "",
    no_of_beds: "",
    number_of_rooms: "",
  });

  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState([]);

  const { data } = useFetch(regions_api);

  const { district } = useFetch(`${regions_api}/${hostel.region}`);

  const { ward } = useFetch(
    `${regions_api}/${hostel.region}/${hostel.district}`
  );
  const { street } = useFetch(
    `${regions_api}/${hostel.region}/${hostel.district}/${hostel.ward}`
  );

  useEffect(() => {
    const images = [],
      fileReaders = [];
    const imageFiles = hostel.image;
    if (imageFiles) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          setImg(images);
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [hostel.image]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    const files = hostel.image;

    formData.append("hostel_name", hostel.hostel_name);
    formData.append("contact_name", hostel.contact_name);
    formData.append("price", hostel.price);
    formData.append("phone", hostel.phone);
    formData.append("region", hostel.region);
    formData.append("district", hostel.district);
    formData.append("ward", hostel.ward);
    formData.append("street", hostel.street);
    for (let i = 0; i < files?.length; i += 1) {
      formData.append("image", files[i]);
      console.log(files[i]);
    }
    formData.append("room_type", hostel.room_type);
    formData.append("bed_options", hostel.bed_options);
    formData.append("no_of_beds", hostel.no_of_beds);
    formData.append("number_of_rooms", hostel.number_of_rooms);

    const fetchHostel = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/add-hostel", {
          method: "POST",
          headers: {
            auth: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        });
        const data = await res.json();
        setHostel(data);
        setLoading(false);
        localStorage.setItem("hostelId", data.hostel._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHostel();
  }

  const handleChange = (e) => {
    setHostel({ ...hostel, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const { files } = e.target;
    const validImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      validImages.push(file);
    }
    setHostel({ ...hostel, image: validImages });
  };

  const regions = data.regions;
  const dist = district.districts;
  const hostelWard = ward.wards;
  const hostelStreet = street.streets;
  return (
    <div>
      {" "}
      {loading && (
        <div
          className="absolute w-full top-0 left-0 h-screen flex justify-center items-center"
          onClick={() => setLoading((prev) => !prev)}
        >
          {" "}
          <ConfirmBooking message={"hostel added"} />{" "}
        </div>
      )}
      {/* {!showManager ? ( */}
      <div className="px-9 py-3">
        {/* <!-- details --> */}
        <form
          className="flex justify-around mt-4 flex-col"
          onSubmit={handleSubmit}
        >
          {/* <!-- property name --> */}

          <fieldset className="border p-4 rounded-md mb-7">
            <div className="flex flex-col ">
              <legend className="mb-2 text-cyan-800 font-medium">
                What is the name of your Property
              </legend>
              <input
                className="border focus:outline-cyan-800 w-10/12 h-11 mb-2 px-2 bg-[#f1f2f7] rounded"
                type="text"
                placeholder="Name"
                name="hostel_name"
                onChange={handleChange}
              />
              <span className="text-cyan-800 font-medium">
                Guests will see this name when they search for a place to stay
              </span>
            </div>
          </fieldset>

          <fieldset className="border p-3 rounded-md mb-7 flex flex-col">
            <div className="flex justify-between space-x-8">
              <div>
                <legend className="mb-2 text-cyan-800 font-medium">
                  What are the contact details for this property
                </legend>
                <div className="mb-4">
                  <label htmlFor="contact-name"></label>
                  <input
                    type="text"
                    className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2"
                    placeholder="Contact Name"
                    name="contact_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price"></label>
                  <input
                    type="text"
                    className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2"
                    placeholder="Hostel Price"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  {" "}
                  <label htmlFor="phone-number"></label>
                  <input
                    type="text"
                    className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" flex  space-x-20  w-full ">
                <div className="">
                  <legend className="mb-8 text-cyan-800 font-medium ">
                    Where is your property located
                  </legend>
                  <div className="flex space-x-4  w-[400px]">
                    <div className=" w-full">
                      <div className="mb-4 w-full">
                        <select
                          onChange={handleChange}
                          name="region"
                          className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px] text-gray-400"
                          aria-label=".form-select-sm example"
                        >
                          <option defaultValue={true}>Region</option>
                          {regions?.map((region, i) => {
                            return <option key={i}>{region}</option>;
                          })}
                        </select>
                      </div>
                      <div className="mb-4">
                        <select
                          onChange={handleChange}
                          name="district"
                          className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px] text-gray-400"
                          aria-label=".form-select-sm example"
                        >
                          <option defaultValue={true}>District</option>
                          {dist?.map((distr, i) => {
                            return <option key={i}>{distr}</option>;
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="w-[400px]">
                      <div className="mb-4 w-full">
                        <select
                          onChange={handleChange}
                          name="ward"
                          className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px]"
                          aria-label=".form-select-sm example"
                        >
                          <option defaultValue={true}>Ward</option>
                          {hostelWard?.map((ward, i) => {
                            return <option key={i}>{ward}</option>;
                          })}
                        </select>
                      </div>
                      <div className="mb-4">
                        <select
                          onChange={handleChange}
                          name="street"
                          className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px]"
                          aria-label=".form-select-sm example"
                        >
                          <option defaultValue={true}>Street</option>
                          {hostelStreet?.map((street, i) => {
                            return <option key={i}>{street}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {" "}
                  <legend className="mb-8 text-cyan-800 font-medium">
                    How many rooms does your hostel have ?
                  </legend>
                  <div className="mb-4">
                    <label></label>
                    <input
                      type="number"
                      className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px] text-gray-400"
                      placeholder="Enter Number of rooms"
                      name="number_of_rooms"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-4 border-dashed border-[#f1f2f7]  rounded w-full p-2 cursor-pointer bg-cyan-800/20  ">
              <div className=" flex justify-center tracking-wide font-medium text-cyan-900">
                Add picture showing your hostel, should include toilets, room
                inside view, building view and other amenities
              </div>
              <input
                multiple
                type="file"
                name="image"
                className="opacity-0 w-[1420px] h-[115px] absolute border border-red-900 cursor-pointer "
                onChange={handleImage}
              />
              <div className="flex space-x-2  justify-center">
                {img.length > 0
                  ? img.map((im, i) => {
                      return (
                        <div
                          key={i}
                          className="w-[100px] h-[100px] overflow-hidden rounded-sm mt-3 "
                        >
                          <img
                            src={im}
                            alt=""
                            className="w-full h-full bg-center bg-no-repeat bg-cover"
                          />
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </fieldset>

          <fieldset className="border rounded-md p-5 mb-3">
            <div>
              <legend className="mb-1 text-cyan-800 font-medium">
                Room details
              </legend>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <select
                    name="room_type"
                    onChange={handleChange}
                    className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px]"
                  >
                    <option>--Room Type--</option>

                    <option>single</option>
                    <option>double</option>
                    <option>triple</option>
                    <option>quad</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <select
                    name="bed_options"
                    className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px]"
                    onChange={handleChange}
                  >
                    <option value="">--Bed Options--</option>

                    <option value="doulbe-decker">double-decker</option>
                    <option value="full-size">full size</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <select
                    name="no_of_beds"
                    id="beds"
                    className="border focus:outline-cyan-800 bg-[#f1f2f7] rounded px-3 py-2 w-[200px] "
                    onChange={handleChange}
                  >
                    <option value="">--Number of Beds--</option>

                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
          <button
            type="submit"
            className="mt-4 mb-4 cursor-pointer text-center flex border justify-center items-center text-xl space-x-3 hover:bg-cyan-900 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out active:bg-cyan-900 focus:bg-cyan-800  focus:shadow-lg focus:outline-none  focus:ring-0 bg-cyan-800 h-10 BsArrowRight text-white rounded-full  "
          >
            <div className="flex items-center space-x-3 py">
              {" "}
              <span>Submit</span> <BsArrowRight />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHostel;

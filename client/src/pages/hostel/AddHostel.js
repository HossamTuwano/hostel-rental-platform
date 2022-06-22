import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiHomeGearFill } from "react-icons/ri";

const dropDown = ["post hostel", "my hostels", "booking listing"];

function AddHostel() {
  const [hostel, setHostel] = useState({
    hostel_name: "",
    contact_name: "",
    price: "",
    phone: "",
    region: "",
    city: "",
    image: "",
    room_type: "",
    bed_options: "",
    no_of_beds: "",
    number_of_rooms: "",
  });

  const [img, setImg] = useState([]);
  const [showManager, setShowManager] = useState(false);

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
    formData.append("city", hostel.city);
    for (let i = 0; i < files.length; i += 1) {
      formData.append("image", files[i]);
      console.log(files[i]);
    }
    formData.append("room_type", hostel.room_type);
    formData.append("bed_options", hostel.bed_options);
    formData.append("no_of_beds", hostel.no_of_beds);
    formData.append("number_of_rooms", hostel.number_of_rooms);

    const fetchHostel = async () => {
      try {
        const res = await fetch("http://localhost:8000/add-hostel", {
          method: "POST",
          headers: {
            auth: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        });
        const data = await res.json();
        setHostel(data);
        localStorage.setItem("hostelId", data.hostel._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHostel();
    console.log(hostel);
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

  return (
    <div>
      {/* {!showManager ? ( */}
      <div className="px-9">
        {/* <!-- details --> */}
        <form
          className="flex justify-around mt-9 flex-col"
          onSubmit={handleSubmit}
        >
          {/* <!-- property name --> */}

          <fieldset className="border p-7 rounded-md mb-4">
            <div className="flex flex-col ">
              <legend className="mb-2">
                What is the name of your Property
              </legend>
              <input
                className="border focus:outline-none w-10/12 h-11 mb-2 px-2"
                type="text"
                placeholder="Name"
                name="hostel_name"
                onChange={handleChange}
              />
              <span>
                Guest will see this name when they search for a place to stay o
              </span>
            </div>
          </fieldset>

          <fieldset className="border p-5 rounded-md mb-4 flex flex-col">
            <div className="flex justify-between">
              <div>
                <legend className="mb-2">
                  What are the contact details for this property
                </legend>
                <div className="mb-4">
                  <label htmlFor="contact-name"></label>
                  <input
                    type="text"
                    className="border focus:outline-none px-2"
                    placeholder="Contact Name"
                    name="contact_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price"></label>
                  <input
                    type="text"
                    className="border focus:outline-none px-2"
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
                    className="border focus:outline-none px-2"
                    placeholder="Phone Number"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="px-40">
                <legend className="mb-2">Where is your property located</legend>
                <div className="mb-4">
                  <label htmlFor="region"></label>
                  <input
                    type="text"
                    className="border focus:outline-none px-2"
                    placeholder="Region"
                    name="region"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  {" "}
                  <label htmlFor="city"></label>
                  <input
                    type="text"
                    className="border focus:outline-none px-2"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                  />
                </div>

                <legend>How many rooms does your hostel have ?</legend>
                <div className="mb-4">
                  <label htmlFor="region"></label>
                  <input
                    type="number"
                    className="border focus:outline-none px-2"
                    placeholder="Enter Number of rooms"
                    name="number_of_rooms"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="border-t w-full ">
              <input
                multiple
                type="file"
                name="image"
                className="mt-4"
                onChange={handleImage}
              />
              <div className="flex space-x-2">
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

          <fieldset className="border rounded-md p-5">
            <div>
              <legend className="mb-1">Room details</legend>
              <div className="flex justify-between">
                <div>
                  <label htmlFor="">Room Type</label>
                  <select name="room_type" onChange={handleChange}>
                    <option>--select--</option>

                    <option>single</option>
                    <option>double</option>
                    <option>triple</option>
                    <option>quad</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bed-options">Bed Options</label>
                  <select
                    name="bed_options"
                    className="border focus:outline-none px-2 w-44 "
                    onChange={handleChange}
                  >
                    <option value="">--select--</option>

                    <option value="doulbe-decker">double-decker</option>
                    <option value="full-size">full size</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="number-of-beds">Number of Beds</label>
                  <select
                    name="no_of_beds"
                    id="beds"
                    className="border focus:outline-none px-2 w-44 "
                    onChange={handleChange}
                  >
                    <option value="">--select--</option>

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
            className="mt-4  bg-cyan-800 h-8 mb-6 text-white rounded-sm "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHostel;

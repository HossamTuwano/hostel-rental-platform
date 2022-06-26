import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { get_hostel, update_status, accept_booking } from "../../API";
import { localhost } from "../../API";
import { useFetch } from "../../hooks/index";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import SimilarHostels from "./SimilarHostels";
import ConfirmBooking from "../../components/ConfimBooking";
import { booking } from "../../actions/BookingActions";
import { useDispatch, useSelector } from "react-redux";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";

const date = new Date();

function ViewHostel(props) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [hostelId, setHostelId] = useState();
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState();
  const [nextIndex, setNextIndex] = useState(1);
  const [previousIndex, setPreviousIndex] = useState();

  useEffect(() => {
    setHostelId(localStorage.getItem("hostelId"));
    if (showImage === true) {
      document.body.style.overflow = "hidden";
    }
  }, [hostelId]);

  const stuId = useSelector((state) => state.auth.user.id);

  const { data, loading, error } = useFetch(`${get_hostel}/${hostelId}`);

  const id = {
    id: hostelId,
    stuid: stuId,
  };

  const handleStatus = (e) => {
    e.preventDefault();

    const result = Object.assign(id);

    setShowConfirm((prev) => !prev);

    setTimeout(() => {
      setShowConfirm((prev) => !prev);
    }, 1000);

    // const formData = new FormData();

    // formData.append("id", id.id);

    // fetch(`${update_status}`, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((error) => console.log(error));
    dispatch(booking(result));
  };

  if (loading)
    return (
      <div className="h-[800px] flex justify-center flex-col items-center">
        <Loader />
      </div>
    );
  if (error) return <pre>error</pre>;
  const hostel = data.hostel;

  const postDate = hostel?.createdAt?.slice(0, 10);

  const timePassed = new Date(postDate);

  // console.log(new Date(Date.now() - timePassed * 1000));

  // const currT = Date.now()  - timePassed

  // console.log(new Date(currT))

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  var aDay = 24 * 60 * 60 * 1000;

  const hostelDateSince = timeSince(new Date(timePassed - aDay));
  // console.log(currT)
  // console.log(timeSince(new Date(Date.now() - new Date(currT))));
  console.log(hostelId);

  const hadlePrevious = (index) => {
    if (nextIndex === hostel?.image.length - 1) {
      console.log("shit");
      setNextIndex(1);
      console.log("noq" + nextIndex);
    } else {
      setNextIndex(nextIndex + 1);
    }
  };
  const handleNext = () => {
    if (nextIndex === hostel?.image.length - 1) {
      console.log("shit");
      setNextIndex(1);
      console.log("noq" + nextIndex);
    } else {
      setNextIndex(nextIndex + 1);
    }
  };

  console.log(nextIndex);

  return (
    <div>
      {showImage && (
        <>
          <div className="absolute w-full h-screen flex justify-between bg-black/50  items-center ">
            <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => setShowImage((prevState) => !prevState)}
            >
              <GiCancel style={{ fontSize: "2em", color: "white" }} />
            </div>
            <IoChevronBackSharp
              style={{
                fontSize: "3em",
                cursor: "pointer",
                marginLeft: "3em",
              }}
              onClick={hadlePrevious}
            />
            <ImageViewer
              images={hostel?.image}
              index={nextIndex || previousIndex}
            />
            <IoChevronForwardSharp
              style={{
                fontSize: "3em",
                cursor: "pointer",
                marginRight: "3em",
              }}
              onClick={handleNext}
            />
          </div>
        </>
      )}
      {showConfirm && (
        <div className="border absolute w-full h-screen flex justify-center flex-col items-center">
          {" "}
          <ConfirmBooking message={"Booking Placed Wait for Email"} />
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
              <div>Posted {hostelDateSince} Ago</div>{" "}
              <div className="ml-3 capitalize">
                Dar es salaam :&nbsp; Mwenge
              </div>
              <HiLocationMarker className=" h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-[270px] mt-2">
            <div className="border-none overflow-hidden bg-gray-400 w-[800px] h-[500px] rounded">
              <img
                src={`${localhost}${hostel?.image[0]}`}
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
                  {/* <input
                    type="number"
                    className="text-black"
                    name="stuid"
                    readOnly
                    hidden
                  /> */}

                  <button className="capitalize font-medium shadow-sm rounded-md bg-cyan-800 text-white px-3 py-2 ">
                    book now
                  </button>
                </div>
              </form>
            </div>
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
                onClick={() => setShowImage((prevState) => !prevState)}
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

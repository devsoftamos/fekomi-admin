import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
export default function Consultation(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: props.editData?.price,
      name: "editData?.name",
    },
  });
  const [loading, setLoading] = useState();
  const [catData, setCatData] = useState();
  const [images, setImages] = React.useState([]);
  const [formData, setFormData] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [consultDays, setConsultDays] = useState([
    {
      check: false,
      day: "sunday",
      start_time: "08:00 AM",
      end_time: "09:00 AM",
    },
    {
      check: false,
      day: "monday",
      start_time: "08:00 AM",
      end_time: "09:00 AM",
    },
    {
      check: false,
      day: "tuesday",
      start_time: "08:00 AM",
      end_time: "09:00 AM",
    },
    {
      check: false,
      day: "wednesday",
      start_time: "08:00 AM",
      end_time: "09:00 AM",
    },
    {
      check: false,
      day: "thursday",
      start_time: "08:00 AM",
      end_time: "09:00 AM",
    },
    {
      check: false,
      day: "friday",
      start_time: "09:00 AM",
      end_time: "10:00 AM",
    },
    {
      check: false,
      day: "Saturday",
      start_time: "09:00 AM",
      end_time: "10:00 AM",
    },
  ]);

  const createSchedules = (e) => {
    e.preventDefault();
    setLoading("loading");
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const days = consultDays.filter((item) => item.check == true);

    const Payload = {
      ...formData,
      days,
    };

    const options = {
      url: `${process.env.REACT_APP_CONSULTATION}/schedule`,
      method: "POST",
      data: {
        ...Payload,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        console.log(response);
        props.setModalOpen("");
        //  props.setReload(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      })
      .catch((error) => {
        setLoading("");
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    const locale = "en"; // or whatever you want...
    const hours = [];

    moment.locale(locale); // optional - can remove if you are only dealing with one locale

    for (let hour = 0; hour < 24; hour++) {
      hours.push(moment({ hour }).format("h:mm A"));
    }

    setSelectedTime(hours);
  }, []);
  const handleProduct = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const changeStartTime = (e, i) => {
    const days = consultDays;
    const day = days[i];
    day.start_time = e.target.value;
    days[i] = day;

    setConsultDays([...days]);
    console.log(day);
  };
  const changeEndTime = (e, i) => {
    const days = consultDays;
    const day = days[i];
    day.end_time = e.target.value;
    days[i] = day;
    setConsultDays([...days]);
    console.log(day);
  };
  const checkDay = (i) => {
    const days = consultDays;
    const day = days[i];
    day.check = !day.check;
    days[i] = day;
    console.log(days, "Days");
    setConsultDays([...days]);

    //console.log();
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${props.modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA] h-[959px]   max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Create Schedule</div>
            <div
              onClick={() => props.setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form
          //onSubmit={handleSubmit(props.edit ? updateProduct : createProduct)}
          >
            <div className="pt-10 py-3">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter news title"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
            </div>
            <div className="w-full  ">
              <label className="text-black text-sm font-black px-2">
                Type of Appointment
              </label>
              <select
                onChange={handleProduct}
                name="appointment_type"
                className="py-4 border border-[#E8E9EA] bg-white px-2 w-full outline-0 focus:bg-white focus:border-0"
              >
                <option disabled selected>
                  Select One
                </option>
                <option value="ONLINE">Virtual Appointment</option>
                <option value="PHYSICAL">Physical Appointment</option>
              </select>
            </div>
            <div className="py-6">
              <div className="text-black font-black">Availability</div>
              <div className="flex justify-between pt-5 px-14">
                <div>Day</div>
                <div>Time</div>
              </div>
              {consultDays?.map((data, i) => (
                <div className="flex justify-between pt-10 pb-2 px-14">
                  <div>
                    <div className="flex justify-evenly">
                      <div>
                        {" "}
                        <input
                          type="checkbox"
                          //name="day"
                          className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                          onChange={() => checkDay(i)}
                          // value="sunday"
                          checked={data.check}
                          // required
                        />
                      </div>
                      <div className="pl-2">{data?.day}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="">
                        <select
                          name="start_time"
                          onChange={(e) => changeStartTime(e, i)}
                          className="py- bg-white border text-sm border-gray-400 rounded-2xl h-[30px] px-1 w-[96px]  focus:bg-white outline-0  "
                        >
                          <option disabled selected>
                            {selectedTime[0]}
                          </option>
                          {selectedTime?.map((data, i) => (
                            <option value={data}>{data}</option>
                          ))}
                        </select>
                      </div>
                      <div className="">
                        <select
                          name="end_time"
                          onChange={(e) => changeEndTime(e, i)}
                          className="py- bg-white border text-sm border-gray-400 rounded-2xl px-1  h-[30px] w-[96px]  focus:bg-white outline-0  "
                        >
                          <option disabled selected>
                            {selectedTime[0]}
                          </option>
                          {selectedTime?.map((data, i) => (
                            <option value={data}>{data}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between py-4">
              <div>
                <label
                  onClick={() => props.setModalOpen("")}
                  className="border border-[#3b4046] px-5 text-black rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                <button
                  onClick={createSchedules}
                  className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                >
                  Create Schedule
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

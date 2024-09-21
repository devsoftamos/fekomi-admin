import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Reschedule from "./Reschedule";

export default function MySchedule(props) {
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
  const [myScheduleData, setMyScheduleData] = useState();
  const [images, setImages] = React.useState([]);
  const [formData, setFormData] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [openReSchedule, setOpenReSchedule] = useState();
  const [clickedData, setClickedData] = useState();

  const getSchedule = async () => {
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_CONSULTATION}/schedules`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        console.log(response?.data?.data?.data, "ECONS");
        setMyScheduleData(response?.data?.data?.data);
        setLoading("");
        props.setModalOpen("");
      })
      .catch((error) => {
        setLoading("");
      });
  };

  const deleteSchedule = (data) => {
    //e.preventDefault();
    setLoading("loading");
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_CONSULTATION}/schedule/${data.id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {},
    };

    axios(options)
      .then((response) => {
        setLoading("");
        props.setOpenSchedule("");
        // props.setReload(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getSchedule();
        // props.getAllProductsData();
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
    getSchedule();
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
      <Reschedule
        openReSchedule={openReSchedule}
        setOpenReSchedule={setOpenReSchedule}
        setOpenSchedule={props.setOpenSchedule}
        clickedData={clickedData}
      />
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${props.openSchedule}`}>
        <div className="modal-box bg-[#FAFAFA]  max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Create Schedule</div>
            <div
              onClick={() => props.setOpenSchedule("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>
          <div className="pt-5">
            <div className="bg-white shadow rounded-md py-7 px-4">
              {myScheduleData?.schedules?.map((data, i) => (
                <div className="flex items-center pt-5 justify-between">
                  <div>
                    <div className="inline-flex items-center">
                      <div>{data.title}</div>
                      {data.default == 1 && (
                        <div className="pl-2">
                          <div className="bg-[#EBFFF3] rounded text-[#61BB84] px-2 py-2">
                            Default
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="pl-2">
                    <div className="inline-flex">
                      <div
                        onClick={() => {
                          setOpenReSchedule("modal-open");
                          props.setOpenSchedule("");
                          setClickedData(data);
                        }}
                      >
                        <div className="bg-[#FFEFDF] cursor-pointer rounded text-[#E4750D] px-2 py-2">
                          Reschedule
                        </div>
                      </div>
                      <div
                        onClick={() => deleteSchedule(data)}
                        className="pl-2 cursor-pointer"
                      >
                        <div className="bg-[#FFDFE5] text-[#F9395B] px-2 py-2 ">
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

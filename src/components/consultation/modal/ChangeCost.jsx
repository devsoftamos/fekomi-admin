import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Reschedule from "./Reschedule";

export default function ChangeCost(props) {
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
  const [formData, setFormData] = useState();
  const [costForm, setCostForm] = useState();

  const updateCost = () => {
    //e.preventDefault();
    setLoading("loading");
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const payLoad = {
      type: props.data.type,
      ...costForm,
    };
    const options = {
      url: `${process.env.REACT_APP_CONSULTATION}/settings/cost`,
      method: "PATCH",
      headers: headers,
      data: { ...payLoad },
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

  const handleCostChange = (e) => {
    console.log(e.target.value);
    setCostForm({ [e.target.name]: e.target.value });
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
      <div className={`modal ${props.openCost}`}>
        <div className="modal-box bg-[#FAFAFA]  max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Consultation Fee</div>
            <div
              onClick={() => props.setOpenCost("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>
          <div className="pt-5">
            <div className="bg-white shadow rounded-md py-7 px-4">
              <div className="w-full py-4 pl-3">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Consultation Type
                </label>

                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Enter product Url"
                    name="product_url"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    onChange={handleCostChange}
                    value={props.data?.type}
                    // required
                  />
                </div>
              </div>
              <div className="w-full py-4 pl-3">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Consultation Cost
                </label>

                <div className="w-full">
                  <input
                    type="text"
                    placeholder="consultation cost"
                    name="cost"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    onChange={handleCostChange}

                    // required
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={updateCost}
                  className={`${loading} btn bg-[#2F93F6] px-4 border-0 text-[#fff] rounded-lg py-4 cursor-pointer`}
                >
                  Update Fee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

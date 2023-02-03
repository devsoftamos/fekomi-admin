import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateInterestModal({
  interestOpen,
  setInterestOpen,
  datingData,
}) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [singleData, setsingleData] = useState();
  const [interestValue, setInterestValue] = useState();

  const createInterest = async () => {
    console.log(datingData, "UID");
    setLoading("loading");
    const payLoad = {
      name: "football",
    };
    const token = localStorage.getItem("fekomi-token");
    const covertedToken = JSON.parse(token);
    const tokenParsed = {
      firstName: covertedToken.firstname,
      lastName: covertedToken.lastname,
      userId: covertedToken.id,
      role: {
        admin: true,
        superAdmin: true,
      },
      permission: {
        dating: true,
      },
    };
    const headers = {
      "content-type": "application/json",
      Authorization: `${JSON.stringify(tokenParsed)}`,
    };
    const options = {
      url: `${process.env.REACT_APP_DATING}/admin/interests`,
      method: "POST",
      headers:headers,
      data: {
        name: interestValue.name,
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        setInterestOpen("");

        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(response);
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

  const handleChange = (e) => {
    setInterestValue({ [e.target.name]: e.target.value });
  };
  return (
    <div>
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
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${interestOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Interests</div>
            <div
              onClick={() => setInterestOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <div className="px-14 pt-5">
            <div className="bg-white  shadow-md max-w-5xl h-[300px] pt-7">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between px-2 py-2 border rounded border-[#E8E9EA] ">
                  <div>
                    <input
                      type="text"
                      placeholder="Type here"
                      name="name"
                      className="outline-none font-black  px-3 py-4 text-lg w-full  bg-white focus:bg-white"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pl-2">
                    <button
                      onClick={createInterest}
                      className={`bg-deepBlue ${loading} btn py-3 text-white px-7 rounded`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateStorePointModal({
    modalOpen,
  setModalOpen,
  datingData,
}) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [singleData, setsingleData] = useState();
  const [interestValue, setInterestValue] = useState();

const [formData, setFormData] =useState()


  const createStorePoint = async () => {
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
      url: `${process.env.REACT_APP_OFFLINESTORE}admin/stores`,
      method: "POST",
      headers:headers,
      data: {
        ...formData
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        setModalOpen("");

        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload()
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
    if (e.target.name === "isFactory" && e.target.checked) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        isFactory: true,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        isFactory: false,
      });
    }
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
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">New Store Point</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <div className="px-14 pt-5">
            <div className="bg-white  shadow-md max-w-5xl h-[300px] pt-7">
              <div className="px-4 py-4"> 
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the name of the store"
                      name="name"
                      className="outline-none border rounded border-[#E8E9EA]  font-black  px-3 py-3 text-lg w-full  bg-white focus:bg-white"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="inline-flex items-center py-2 w-full">
              <div>
                {" "}
                <input
                  type="checkbox"
                  name="isFactory"
                  placeholder="Enter news title"
                  className="border border-[#E8E9EA] outline-none  text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-black text-sm font-black px-2">
                 Is this store a Factory?
                </label>
              </div>
            </div>
                <div className="flex justify-between py-4 pt-10">
              <div>
                <label
                  onClick={() => setModalOpen("")}
                  className="border border-[#3b4046] px-5 text-black rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                
                  <button 
                  onClick={createStorePoint}
                    className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                  >
                    Create Store Point
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

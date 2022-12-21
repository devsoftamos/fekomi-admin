import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductCategory({
  modalCatOpen,
  setModalCatOpen,
  getAllProductsData,
}) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const createCategory = (data) => {
    setLoading("loading");
    console.log(data);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ECOMMERCE}/product-category`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {
        name: data.name,
        description: "ttttt",
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        setModalCatOpen("");

        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      <div className={`modal ${modalCatOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">New Stock</div>
            <div
              onClick={() => setModalCatOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form onSubmit={handleSubmit(createCategory)}>
            <div className="pt-10 py-3">
              <div className="w-full pl-2">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Category Name
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("name")}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between py-6">
              <div>
                <label
                  onClick={() => setModalCatOpen("")}
                  className="border border-[#3b4046] px-5 text-black rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                <button
                  //onClick={createProduct}
                  //htmlFor="my-modal-3"
                  className={`bg-[#2F93F6] btn ${loading} px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                >
                  Create Category
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

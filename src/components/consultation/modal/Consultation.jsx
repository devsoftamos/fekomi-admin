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
  const [selectedTime, setSelectedTime] = useState();
  const createProduct = (e) => {
    e.preventDefault();
    setLoading("loading");
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ECOMMERCE}/product`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {
        ...formData,
        main_product_image: images[0]?.data_url,
        secondary_product_image_1: images[1]?.data_url,
        secondary_product_image_2: images[2]?.data_url,
        type: "REGULAR",
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        props.setModalOpen("");
        props.setReload(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        props.getAllProductsData();
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
  const getCategory = async () => {
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ECOMMERCE}/product-category`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        setCatData(response?.data?.data);
        setLoading("");
        props.setModalOpen("");
      })
      .catch((error) => {
        setLoading("");
      });
  };

  //UPDATE PRODUCTS ENDPOINT
  const updateProduct = (e) => {
    e.preventDefault();
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ECOMMERCE}/product/${props.editData?.uid}`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {
        ...formData,
        type: "REGULAR",
        main_product_image: images[0]?.data_url,
        secondary_product_image_1: images[1]?.data_url,
        secondary_product_image_2: images[2]?.data_url,
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        props.setModalOpen("");
        props.setReload(false);
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        props.getAllProductsData();
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
  //UPDATE PRODUCTS ENDPOINT

  useEffect(() => {
    getCategory();
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
                  name="name"
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
                name="product_category_id"
                className="py-4 border border-[#E8E9EA] bg-white px-2 w-full outline-0 focus:bg-white focus:border-0"
              >
                <option disabled selected>
                  Select One
                </option>
                <option value={"data?.id"}>Online</option>
                <option value={"data?.id"}>Physical</option>
              </select>
            </div>
            <div className="py-6">
              <div className="text-black font-black">Availability</div>
              <div className="flex justify-between pt-5 px-14">
                <div>Day</div>
                <div>Time</div>
              </div>
              <div className="flex justify-between py-10 px-14">
                <div>
                  <div className="flex justify-evenly">
                    <div>
                      {" "}
                      <input
                        type="checkbox"
                        name="name"
                        className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                        onChange={handleProduct}
                        defaultValue={props.editData?.name}
                        // required
                      />
                    </div>
                    <div className="pl-2">Sunday</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="">
                      <select className="py- bg-white border text-sm border-gray-400 rounded-2xl h-[30px] px-1 w-[96px]  focus:bg-white outline-0  ">
                        <option disabled selected>
                          {selectedTime[0]}
                        </option>
                        {selectedTime?.map((data, i) => (
                          <option>{data}</option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <select className="py- bg-white border text-sm border-gray-400 rounded-2xl px-1  h-[30px] w-[96px]  focus:bg-white outline-0  ">
                        <option disabled selected>
                          {selectedTime[0]}
                        </option>
                        {selectedTime?.map((data, i) => (
                          <option>{data}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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
                {props.edit ? (
                  <button
                    onClick={updateProduct}
                    className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                  >
                    Update News
                  </button>
                ) : (
                  <button
                    onClick={createProduct}
                    disabled={images?.length <= 2 ? true : false}
                    className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                  >
                    Create News
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

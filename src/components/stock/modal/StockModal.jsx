import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploader from "../../draganddrop/ImageUploader";
import { compareAsc, format } from "date-fns";
export default function StoreModal(props) {
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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const createProduct = (e) => {
    e.preventDefault();
    setLoading("loading");
    let formattedEnd = new Date(formData?.end_date)
      .toLocaleDateString("en-GB")
      .replaceAll("/", "-");
    let formattedStart = new Date(formData?.start_date)
      .toLocaleDateString("en-GB")
      .replaceAll("/", "-");

    console.log(props.modalType, "OPOP");
    const payload = {
      ...formData,
      main_product_image: images[0]?.data_url,
      secondary_product_image_1: images[1]?.data_url,
      secondary_product_image_2: images[2]?.data_url,
      type: props.modalType ? "HOTSALE" : "REGULAR",
    };
    let data = { ...payload };
    if (props.modalType) {
      data = {
        ...payload,
        start_date: formattedStart,
        end_date: formattedEnd,
      };
    } else {
      delete data.start_date;
      delete data.end_date;
    }
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
      data,
    };

    axios(options)
      .then((response) => {
        setLoading("");
        props.setModalOpen("");
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
        props.getAllProductsData();
        props.setReload(false);
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
        type: props.modalType ? "HOTSALE" : "REGULAR",
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

    console.log(formData);
  }, []);
  useEffect(() => {
    if (props.editData?.type == "HOTSALE") {
      setFormData();
      props.setModalType(true);
    }
  }, [props.editData]);
  const handleProduct = (e) => {
    if (e.target.name == "start_date" || e.target.name == "end_date") {
      setStartDate(e.target.name);
      setEndDate(e.target.name);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setStartDate("");
      setEndDate("");
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
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
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">New Stock</div>
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
            <div className="flex justify-between pt-10 py-3">
              <div className="w-1/2">
                <label className="text-black text-sm font-black px-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="text-black text-sm font-black px-2">
                  Category
                </label>
                <select
                  onChange={handleProduct}
                  name="product_category_id"
                  className="py-4 bg-white px-2 w-full outline-0 focus:bg-white focus:border-0"
                >
                  {props.editData ? (
                    <option selected>
                      {props.editData?.productcategory?.name}
                    </option>
                  ) : (
                    <option disabled selected>
                      Select Category
                    </option>
                  )}
                  {catData?.product_categories?.map((data, i) => (
                    <option value={data?.id} key={i}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between pt-10 py-3">
              <div className="w-1/2">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Price
                </label>
                <div className="flex w-full">
                  <div className="">
                    <select disabled className="py-4 bg-white px-2 w-[95px]  focus:bg-white outline-0 focus:border-0">
                      <option disabled selected>
                        NGN
                      </option>
                      <option>USD</option>
                      <option>JPY</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter Price"
                      name="price"
                      className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                      onChange={handleProduct}
                      defaultValue={props.editData?.price}
                      // required
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Quantity
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter Quantity"
                    name="quantity"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    onChange={handleProduct}
                    defaultValue={props.editData?.quantity}
                    // required
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
                <label className="text-black text-sm font-black px-2 pb-1">
                  USDT Price
                </label>
                <div className="flex w-full">
                  <div className="">
                    <select disabled className="py-4 bg-white px-2 w-[95px]  focus:bg-white outline-0 focus:border-0">
                      <option disabled selected>
                      USDT
                      </option>
                      <option></option>
                      <option>JPY</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter Price in USDT"
                      name="usdt_price"
                      className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                      onChange={handleProduct}
                      defaultValue={props.editData?.price}
                      // required
                    />
                  </div>
                </div>
              </div>
            <div>
              <label className="font-black text-sm">Description</label>
              <textarea
                onChange={handleProduct}
                name="description"
                defaultValue={props.editData?.description}
                className="border border-[#E8E9EA] outline-none resize-none px-3 py-10 text-sm w-full rounded bg-white focus:bg-white"
              ></textarea>
            </div>
            <div className="py-3 w-full">
              <ImageUploader
                images={images}
                setImages={setImages}
                editData={props.editData}
              />
            </div>
            {props.modalType && (
              <div>
                <div className="flex items-center justify-center">
                  <div className="w-1/3">
                    <hr className="border border-gray-700 w-full" />
                  </div>
                  <div className="p-2">Duration</div>
                  <div className="w-1/3 pl-2">
                    <hr className="border border-gray-700" />
                  </div>
                </div>
                <div className="py-2 flex justify-center ">
                  <div className="w-1/2">
                    <label className="font-black text-sm">From</label>
                    <input
                      type="date"
                      placeholder="Enter Quantity"
                      name="start_date"
                      className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                      onChange={handleProduct}
                      //defaultValue="02/20/2002"
                      //defaultValue={props.editData?.quantity}
                      // required
                    />
                  </div>
                  <div className="pl-4 w-1/2">
                    <label className="font-black text-sm">To</label>
                    <input
                      type="date"
                      placeholder="Enter Quantity"
                      name="end_date"
                      className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                      onChange={handleProduct}
                      //defaultValue={props.editData?.quantity}
                      // required
                    />
                  </div>
                </div>
              </div>
            )}
            {/* <div className="flex py-7">
              <div>
                <input
                  type="checkbox"
                  placeholder="Enter your Email Address"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("email")}
                  required
                />
              </div>
              <div className="pl-3">Alert me when the quantity is low</div>
            </div> */}

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
                    Update Stock
                  </button>
                ) : (
                  <button
                    onClick={createProduct}
                    disabled={images?.length <= 2 ? true : false}
                    className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                  >
                    Create Stock
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

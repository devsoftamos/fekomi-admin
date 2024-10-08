import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploader from "../../draganddrop/ImageUploader";
import { useParams } from "react-router-dom";

export default function AddProduct(props) {
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
  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState();
  const [images, setImages] = React.useState([]);
  const [formData, setFormData] = useState();
  const [productData, setProductsData] = useState();
  const { id } = useParams();
  const createProduct = (e) => {
    e.preventDefault();
    setLoading(true);
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
      url: `${process.env.REACT_APP_OFFLINESTORE}/admin/stocks`,
      method: "POST",
      headers: headers,
      data: {
        storeId: Number(id),
        quantity: Number(formData?.quantity),
        productId: Number(formData?.productId),
      },
    };

    axios(options)
      .then((response) => {
        setLoading(false);
        props.setModalOpen("");
        window.location.reload();
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
        setLoading(false);
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
  const getAllProductsData = async () => {
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
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_OFFLINESTORE}/admin/products`,
        {
          headers: headers,
        }
      );

      console.log(response?.data, "DATA");
      setProductsData(response?.data?.data);
      //setLoading(false);
    } catch (error) {
      // setLoading(false);
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const getCategory = async () => {
    setLoading(true);

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
        setLoading(false);
        props.setModalOpen("");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  //UPDATE PRODUCTS ENDPOINT
  const updateProduct = (e) => {
    e.preventDefault();
    setLoading(true);

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
        setLoading(false);
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
        setLoading(false);
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
    getAllProductsData();
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
        <div className="modal-box bg-[#FAFAFA]    max-w-[700px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Add Stock to Factory</div>
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
              <div className="w-full pl-2">
                <label className="text-black text-sm font-black px-2">
                  Select Product
                </label>
                <select
                  onChange={handleProduct}
                  name="productId"
                  className="py-4 bg-white px-2 w-full outline-0 focus:bg-white focus:border-0"
                >
                  {props.editData ? (
                    <option selected>
                      {props.editData?.productData?.name}
                    </option>
                  ) : (
                    <option disabled selected>
                      Select Product
                    </option>
                  )}
                  {productData?.map((data, i) => (
                    <option value={data?.id} key={i}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="pb-6">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Enter Product Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
            </div>

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
                    disabled={Object.keys(formData || {}) ? false : true}
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

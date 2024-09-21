import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

// customerName,
//   customerEmail,
//   customerAddress,
//   customerPhone,
//   productId,
//   quantity,
//   totalPrice,
//   modeOfPayment;

export default function WalkOrder(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "all",
    defaultValues: {
      price: props.editData?.price,
      name: props.editData?.name,
    },
  });

  const name = watch("customerName");
  const address = watch("customerAddress");
  const phone = watch("customerPhone");

  const [loading, setLoading] = useState(false);
  const [catData, setCatData] = useState();
  const [images, setImages] = React.useState([]);
  const [formData, setFormData] = useState();
  const [productData, setProductsData] = useState();
  const [storeData, setStoreData] = useState();
  const [productPrice, setProductPrice] = useState();
  const { id } = useParams();

  const createOrder = (e) => {
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

    const payload = {
      customerAddress: address,
      customerName: name,
      customerPhone: phone,
      modeOfPayment: formData?.modeOfPayment,
      quantity: Number(+formData?.quantity),
      productId: Number(productPrice?.id),
      totalPrice:
        productPrice?.price * formData?.quantity || productPrice?.price,
    };

    console.log({ payload });

    const options = {
      url: `${process.env.REACT_APP_OFFLINESTORE}/admin/orders`,
      method: "POST",
      headers: headers,

      data: payload,
    };

    axios(options)
      .then((response) => {
        setLoading(false);
        props.setModalCatOpen(false);

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

  // const getCategory = async () => {
  //   setLoading("loading");

  //      const token = localStorage.getItem("fekomi-token");

  //   const headers = {
  //     "content-type": "application/json",
  //     Authorization: ` Bearer ${token}`,
  //   };
  //   const options = {
  //     url: `${process.env.REACT_APP_ECOMMERCE}/product-category`,
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json;charset=UTF-8",
  //       Authorization: ` Bearer ${token}`,
  //     },
  //   };

  //   axios(options)
  //     .then((response) => {
  //       setCatData(response?.data?.data);
  //       setLoading("");
  //       props.setModalOpen("");
  //     })
  //     .catch((error) => {
  //       setLoading("");
  //     });
  // };

  const getAllProductsData = async () => {
    setLoading(true);

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/products/all`,
        {
          headers: headers,
        }
      );

      setProductsData(response?.data?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  //UPDATE PRODUCTS ENDPOINT

  useEffect(() => {
    // getCategory();
    getAllProductsData();
  }, []);
  const handleProduct = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleProductChange = (e) => {
    const parsedValue = JSON.parse(e.target.value);
    setProductPrice(parsedValue);
    setFormData({ ...formData, quantity: 1 });
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
      <div className={`modal ${props.modalCatOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[700px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Place Walk-In Order</div>
            <div
              onClick={() => props.setModalCatOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form
          //onSubmit={handleSubmit(props.edit ? updateProduct : createProduct)}
          >
            <div className=" py-3 grid gap-3">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Name of Customer
                </label>
                <input
                  type="text"
                  name="customerName"
                  pattern="[A-Za-z ]"
                  placeholder="Enter Name of Customer"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  {...register("customerName", {
                    required: "Enter the customer name",
                  })}
                  // required
                />
              </div>
              {errors?.customerName && (
                <span className="text-red-500 italic text-sm">
                  {errors?.customerName?.message}
                </span>
              )}
            </div>

            <div className=" py-3 grid gap-3">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Customer’s Phone Number
                </label>
                <input
                  type="text"
                  name="customerPhone"
                  pattern="[1-9]\d*"
                  min="0"
                  maxLength="11"
                  placeholder="Enter Customer Phone Number"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  {...register("customerPhone", {
                    required: "Enter customer phone number",
                    pattern: {
                      value: /[1-9]\d*$/,
                      message: "Only digits allowed for phone number",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone number cannot exceed 11 digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number cannot be less than 10 characters",
                    },
                  })}
                />
              </div>
              {errors?.customerPhone && (
                <span className="text-red-500 italic text-sm">
                  {errors?.customerPhone?.message}
                </span>
              )}
            </div>

            <div className=" py-3 grid gap-3">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Customer’s Address
                </label>
                <input
                  type="text"
                  name="customerAddress"
                  placeholder="Enter Customer Address"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  {...register("customerAddress", {
                    required: "Enter customer Address",
                  })}
                />
              </div>
              {errors?.customerAddress && (
                <span className="text-red-500 italic text-sm">
                  {errors?.customerAddress?.message}
                </span>
              )}
            </div>

            <div className="0 py- grid gap-33">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Product
                </label>
                <select
                  onChange={handleProductChange}
                  name="productId"
                  className="py-4 bg-white px-2 w-full outline-0 focus:bg-white focus:border-0"
                  // {...register("producId", { required: "Select a product" })}
                >
                  <option disabled selected>
                    Select Product
                  </option>

                  {productData?.products?.map((data, i) => (
                    <option value={JSON.stringify(data)} key={i}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors?.productId && (
                <span className="text-red-500 italic text-sm">
                  {errors?.productId?.message}
                </span>
              )}
            </div>

            <div className=" py-3 grid gap-3">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Quantity
                  {productPrice && (
                    <span className="font-light text-xs">
                      Available quantity({productPrice?.quantity})
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  min="1"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={formData?.quantity}
                  value={formData?.quantity}
                  // {...register("quantity", {
                  //   required: "Enter quantity for product",
                  //   min: { value: 1, message: "Invalid quantity" },
                  //   max: {
                  //     value: productPrice?.quantity,
                  //     message: "Quantity exceeds available stock",
                  //   },
                  // })}
                />
              </div>
              {errors?.quantity && (
                <span className="text-red-500 italic text-sm">
                  {errors?.quantity?.message}
                </span>
              )}
            </div>

            <div className="py-3">
              <div className="flex items-center">
                <label className="text-black text-sm font-black px-2">
                  Total Price:
                </label>
                <div className="font-black text-black text-xl">
                  {productPrice?.price
                    ? parseFloat(
                        productPrice?.price * formData?.quantity || 0
                      ).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })
                    : 0}
                </div>
              </div>
            </div>
            <div className=" py-3 grid gap-3">
              <div className="w-full">
                <label className="text-black text-sm font-black px-2">
                  Mode Of Payment
                </label>
                <select
                  onChange={handleProduct}
                  name="modeOfPayment"
                  className="py-4 bg-white px-2 w-full outline-0 focus:bg-white focus:border-0"
                >
                  <option selected disabled>
                    Select Mode Of Payment
                  </option>
                  <option value="TRANSFER">Transfer</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
              {errors?.modeOfPayment && (
                <span className="text-red-500 italic text-sm">
                  {errors?.modeOfPayment?.message}
                </span>
              )}
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

            <div className="flex justify-between py-7">
              <div>
                <label
                  onClick={() => props.setModalCatOpen("")}
                  className="border cursor-pointer border-[#3b4046] px-5 text-black rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                <button
                  onClick={createOrder}
                  disabled={
                    Object.keys(errors).length ||
                    !(
                      formData?.quantity &&
                      formData?.modeOfPayment &&
                      productPrice?.id
                    )
                  }
                  className={`${loading} btn bg-[#2F93F6] border-0 px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; 
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useParams } from "react-router-dom";

export default function WalkOrder(props) {
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
  const [productData, setProductsData] = useState();
  const [storeData,setStoreData] = useState()
  const { id } = useParams();
  const createTransfer = (e) => {
    e.preventDefault();
    setLoading("loading");
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
      url: `${process.env.REACT_APP_OFFLINESTORE}admin/stocks/transfer`,
      method: "POST",
      headers: headers,
      data: {
        storeId: Number(id),
        quantity: Number(formData?.quantity),
        productId: Number(formData?.productId),
        destinationStoreId:Number(formData?.destinationStoreId)
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");
        props.setModalCatOpen("");
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
        `${process.env.REACT_APP_OFFLINESTORE}admin/products`,
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

  const getAllStoreData = async () => {
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
        `${process.env.REACT_APP_OFFLINESTORE}admin/stores`,
        {
          headers: headers,
        }
      );

      console.log(response?.data, "STORE");
      setStoreData(response?.data?.data);
      //setLoading(false);
    } catch (error) {
      // setLoading(false);
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  // const getCategory = async () => {
  //   setLoading("loading");

  //   const token = localStorage.getItem("fekomi-token");
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
   // getCategory();
    getAllProductsData();
    getAllStoreData()
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
      <div className={`modal ${props.modalCatOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[700px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Transfer to store point</div>
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
             <div className="pt-10 py-3">
              <div className="w-full pl-2">
                <label className="text-black text-sm font-black px-2">
                Name of Customer
                </label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Enter Name of Customer"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
            </div>
           
            <div className="pt-10 py-3">
              <div className="w-full pl-2">
                <label className="text-black text-sm font-black px-2">
                Customer’s Phone Number
                </label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Enter Customer Phone Number"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
            </div>

            <div className="pt-10 py-3">
              <div className="w-full pl-2">
                <label className="text-black text-sm font-black px-2">
                Customer’s Address
                </label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Enter Customer Address"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
            </div>


            <div className="-pt-10 py-3">
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

            <div className="pt-10 py-3">
              <div className="w-full pl-2">
                <label className="text-black text-sm font-black px-2">
                Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  placeholder="Enter Customer Address"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
                  // required
                />
              </div>
            </div>

            <div className="py-3">
              <div className="flex ">
                 <label className="text-black text-sm font-black px-2">
                Total Price:
                </label>
              </div>
              <div></div>
               
                
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
                    onClick={createTransfer}
                    disabled={Object.keys(formData||{}) ? false : true}
                    className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
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

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NewsDraft() {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState();
  const [newsData, setNewsData] = useState();
  const updateProduct = (e) => {
    e.preventDefault();
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_ECOMMERCE}/admin/posts/639f8d2cbf7912d03d087f5c`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {
        ...formData,
      },
    };

    axios(options)
      .then((response) => {
        setLoading("");

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

  const getNewsData = async () => {
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEWS}/admin/posts`,
        {
          headers: headers,
        }
      );
      setNewsData(response.data);
      // setOrderData(response?.data?.data?.data);
      console.log(response?.data, "POPO");
    } catch (error) {
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  useEffect(() => {
    getNewsData();
  }, []);
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
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
      <div className="flex flex-wrap  gap-4 items-stretch h-full">
        {newsData?.data?.map((data, i) => (
          <Link to={`/newsdraft/${data?._id}`}>
            <div key={i} className="pt-2">
              <div className="card w-96 bg-base-100 shadow-xl bg-contain">
                {isImage(data?.mediaUrl) ? (
                  <figure
                    style={{
                      backgroundImage: `url(${data?.mediaUrl})`,
                      height: "100%",
                    }}
                    className="bg-cover w-full pb-56 h-full"
                  ></figure>
                ) : (
                  <video
                    className="  w-full -pb-56 -h-full"
                    src={data?.mediaUrl}
                  ></video>
                )}
                <div className="card-body">
                  <p>{data?.title}</p>
                  <div className="text-sm text-gray-400">
                    {new Date(data?.createdAt).toDateString()}
                  </div>
                </div>
                {/* <div className="w-full flex justify-center pt-5 h-16 bg-[#FFEFDF]">
                  <div className="text-[#E4750D]">Unpublished</div>
                </div> */}
              </div>
            </div>
          </Link>
        ))}
        {/* <Link to="/newsdraft">
          <div className="pl-2 pt-2">
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
              </figure>
              <div className="card-body">
                <p>Why herbal tea is good for you</p>
                <div className="text-sm text-gray-400">
                  Created: Aug 26, 2022
                </div>
               
              </div>
              <div className="w-full flex justify-center pt-5 h-16 bg-[#EBFFF3]">
                <div className="text-[#61BB84]">Unpublished</div>
              </div>
            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
}

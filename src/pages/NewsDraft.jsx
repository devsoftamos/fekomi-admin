import React, { useCallback, useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import CustomerTable from "../components/customers/CustomerTable";
import OrderTable from "../components/order/OrderTable";
import NewsDraft from "../components/news/NewsDraft";
import CreateNews from "../components/news/modal/CreateNews";
import DragAndDrop from "../components/news/modal/DragandDrop";
import Dropzone, { useDropzone } from "react-dropzone";
import "../components/news/modal/DragAndDrop.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NewsDraftPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [newsData, setNewsData] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [comments, setComments] = useState();
  const [fileData, setFileData] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const handleProduct = (e) => {
    console.log(e.target.value);
  };
  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      // setImage({ ...image, [e.target.name]: reader.result });
      setImagePreview(reader.result);
      console.log(reader.result);
      //setPreview({ ...preview, [e.target.name]: reader.result });
    };
    if (acceptedFiles[0]) {
      reader.readAsDataURL(acceptedFiles[0]);
      //e.target.value = null;
    }
    setFileData(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const getSingleNews = async () => {
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEWS}/admin/posts/${id}`,
        {
          headers: headers,
        }
      );
      console.log(response.data, "UIDR");
      setNewsData(response.data?.data);
      // setOrderData(response?.data?.data?.data);
      console.log(response?.data, "POPO");
    } catch (error) {
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const getComments = async () => {
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_NEWS}/admin/comments/posts/${id}`,
        {
          headers: headers,
        }
      );
      console.log(response.data, "UIDR");
      setComments(response.data?.data);
      // setOrderData(response?.data?.data?.data);
      console.log(response?.data, "POPO");
    } catch (error) {
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const deleteComment = () => {
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_NEWS}/admin/comments/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {},
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
        getComments();
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
  useEffect(() => {
    getSingleNews();
    getComments();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden ">
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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg"> News Draft</div>
            </div>

            <div className="flex gap-10 px-16">
              <div className="w-1/2">
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
                        defaultValue={newsData?.title}
                        // required
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    {!imagePreview && (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <div className="upload-container">
                            Drop the files here ...
                          </div>
                        ) : (
                          <div className="upload-container">
                            Drag 'n' drop some files here, or click to select
                            files
                          </div>
                        )}
                      </div>
                    )}

                    {imagePreview?.includes("video") ? (
                      <div className="relative">
                        <div>
                          <video
                            src={imagePreview}
                            className="image-upload"
                          ></video>
                        </div>
                        <div
                          onClick={() => setImagePreview()}
                          className="absolute top-0 right-0 px-2 text-red-700 text-xl"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : imagePreview?.includes("image") ? (
                      <div className="relative">
                        <div className="">
                          <img src={imagePreview} className="upload-image" />
                        </div>
                        <div
                          onClick={() => setImagePreview()}
                          className="absolute top-0 right-0 px-2 text-red-700 text-xl"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label className="font-black text-sm">Message</label>
                    <textarea
                      onChange={handleProduct}
                      name="description"
                      defaultValue={newsData?.content}
                      className="border border-[#E8E9EA] outline-none resize-none px-3 py-3 h-36 text-sm w-full rounded bg-white focus:bg-white"
                    ></textarea>
                  </div>

                  <div className="flex justify-between py-10">
                    <div>
                      <label className="bg-[#2F93F6] text-white px-5 rounded-lg py-4">
                        Save Changes
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-sm w-1/2 px-3">
                <div className="py-4 font-black text-lg">Comments</div>
                {comments?.map((data, i) => (
                  <div className="flex items-start gap-6">
                    <div>
                      <img
                        src={data?.user?.profilePhotoUrl}
                        className="rounded-full h-14 w-14"
                      />
                    </div>
                    <div className="pl-2 ">
                      <div className="bg-[#F8FAF9] px-3 rounded-md w-[500px] py-6 ">
                        <div className="flex justify-between">
                          <div className="font-black pt-1">
                            {data?.user?.firstName} {data?.user?.lastName}
                          </div>
                          <div className="text-gray-500 pt-1 pl-36">
                            {new Date(data?.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="pt-4">
                          <div>{data?.content}</div>
                        </div>
                      </div>
                      <div className="inline-flex py-2">
                        <div className="font-semibold text-gray-500">
                          {/* Block User */}
                        </div>
                        <div
                          onClick={deleteComment}
                          className="pl-3 font-semibold text-gray-500 cursor-pointer"
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

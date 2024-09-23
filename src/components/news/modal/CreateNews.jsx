import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUploader from "../../draganddrop/ImageUploader";
import DragAndDrop from "./DragandDrop";
import Dropzone, { useDropzone } from "react-dropzone";
import S3FileUpload from "react-s3/lib/ReactS3";
import AWS from "aws-sdk";

import { decode } from "base64-arraybuffer";
import S3 from "aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;
export default function CreateNews(props) {
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
  const [fileData, setFileData] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [isVideo, setIsVideo] = useState();

  // const createNew=(data)=>{
  //      const token = localStorage.getItem("fekomi-token");
  //   const covertedToken = JSON.parse(token);
  //   const tokenParsed = {
  //     firstName: covertedToken.firstname,
  //     lastName: covertedToken.lastname,
  //     userId: covertedToken.id,
  //     role: {
  //       admin: true,
  //       superAdmin: true,
  //     },
  //     permission: {
  //       dating: true,
  //     },
  //   };
  //   const headers = {
  //     "content-type": "application/json",
  //     Authorization: `${JSON.stringify(tokenParsed)}`,
  //   };
  //   axios.post(`${process.env.REACT_APP_NEWS}/admin/posts`, {
  //     ...formData,
  //     mediaUrl: data,
  //   },{
  //     headers:headers
  //   }

  //   )
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const createNews = (data) => {
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
    setLoading("loading");
    const payLoad = {
      ...formData,
      mediaUrl: data,
    };
    const options = {
      url: `${process.env.REACT_APP_NEWS}/admin/posts`,
      method: "post",

      headers: headers,
      data: {
        ...payLoad,
      },
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
  const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
  const S3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.REACT_APP_ACCESSKEY,
    secretAccessKey: process.env.REACT_APP_SECRETKEY,
  });

  const savedToAws = (e) => {
    e.preventDefault();
    setLoading("loading");
    let url;
    let data = {};
    const token = localStorage.getItem("fekomiAuthToken");

    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    if (isVideo) {
      url =
        "https://goldfish-app-we85f.ondigitalocean.app/admin/v1/auth/upload-video";
      data = {
        base64_video: imagePreview,
      };
    } else {
      url =
        "https://goldfish-app-we85f.ondigitalocean.app/admin/v1/auth/upload-image";
      data = {
        base64_image: imagePreview,
      };
    }
    const options = {
      url: url,
      method: "POST",
      data: {
        ...data,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
    };

    axios(options)
      .then((response) => {
        createNews(response.data?.data?.url);
        console.log(response.data);
      })
      .catch((error) => {
        setLoading("");
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
  //   const savedToAws = (e) => {
  //     e.preventDefault();
  //     setLoading("loading");
  //     const config = {
  //       bucketName: "fekomi-new-images",
  //       dirName: "Feeds" /* optional */,
  //       region: "us-east-1",
  //       accessKeyId: `${process.env.REACT_APP_ACCESSKEY}`,
  //       secretAccessKey: `${process.env.REACT_APP_SECRETKEY}`,
  //       s3Url: "https://fekomi-new-images.nyc3.digitaloceanspaces.com" /* optional */,
  //     };
  // console.log(fileData,"fileData");
  //     S3FileUpload.uploadFile(fileData, config)
  //       .then((data) => {
  //         createNews(data.location);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setLoading();
  //       });
  //     return;
  //   };
  const getNews = async () => {
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_NEWS}/product-category`,
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

  //UPDATE PRODUCTS ENDPOINT

  useEffect(() => {
    getNews();
  }, []);
  const handleProduct = (e) => {
    if (e.target.name === "isTopFlash" && e.target.checked) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        isTopFlash: true,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        isTopFlash: false,
      });
    }
  };

  const AcceptedFileTypes = ["image/png", "image/jpeg", "video/mp4"];
  const MaxFileSize = 2 * 1024 * 1024; // 2MB in bytes

  const onDrop = useCallback((acceptedFiles) => {
    // Filter files to accept only the specified file types and size
    const videoFiles = acceptedFiles.filter(
      (file) => file.type === "video/mp4" && file.size <= MaxFileSize
    );
    const imageFiles = acceptedFiles.filter(
      (file) =>
        AcceptedFileTypes.includes(file.type) &&
        file.size <= MaxFileSize &&
        file.type !== "video/mp4"
    );
    if (imageFiles.length > 0) {
      if (imageFiles.length > 0) {
        const reader = new FileReader();
        reader.onloadend = function () {
          setImagePreview(reader.result);
          setIsVideo(false);
          console.log("IMAGE:", reader.result);
        };
        reader.readAsDataURL(imageFiles[0]);
        setFileData(imageFiles[0]);
      } else {
        toast.error(
          "Please upload files of type PNG, JPEG, or MP4 within 2MB.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        // Handle the case where no valid files were found or files are too large
        console.log(
          "Please upload files of type PNG, JPEG, or MP4 within 2MB."
        );
      }
    }
    if (videoFiles.length > 0) {
      if (videoFiles.length > 0) {
        const reader = new FileReader();
        reader.onloadend = function () {
          setImagePreview(reader.result);
          setIsVideo(true);
          console.log("VIDEO:", reader.result);
        };
        reader.readAsDataURL(videoFiles[0]);
        setFileData(videoFiles[0]);
      } else {
        toast.error(
          "Please upload files of type PNG, JPEG, or MP4 within 2MB.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
            <div className="text-lg font-bold">News Draft</div>
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
                  name="title"
                  placeholder="Enter news title"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                  defaultValue={props.editData?.name}
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
                      Drag 'n' drop some files here, or click to select files
                    </div>
                  )}
                </div>
              )}

              {imagePreview?.includes("video") ? (
                <div className="relative">
                  <div>
                    <video src={imagePreview} className="image-upload"></video>
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
                name="content"
                defaultValue={props.editData?.description}
                className="border border-[#E8E9EA] outline-none resize-none px-3 py-10 text-sm w-full rounded bg-white focus:bg-white"
              ></textarea>
            </div>
            <div className="inline-flex items-center py-2 w-full">
              <div>
                {" "}
                <input
                  type="checkbox"
                  name="isTopFlash"
                  placeholder="Enter news title"
                  className="border border-[#E8E9EA] outline-none  text-sm w-full rounded bg-white focus:bg-white"
                  onChange={handleProduct}
                />
              </div>
              <div>
                <label className="text-black text-sm font-black px-2">
                  Make it the top news flash
                </label>
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
                <button
                  onClick={savedToAws}
                  //disabled={images?.length < 1 ? true : false}
                  className={`${loading} btn bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer`}
                >
                  Create News
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

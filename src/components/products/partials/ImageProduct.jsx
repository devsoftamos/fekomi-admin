import React, { useEffect } from "react";
import ImageUploading from "react-images-uploading";
// import { Alert, Button, ButtonGroup } from "reactstrap";
import "./ImageUploader.css";

const ImageProduct = (props) => {
  const {
    maxNumber = 3,
    acceptType = ["jpeg", "jpg", "png"],
    maxFileSize = 5000000,
    setImages,
    images,
    editData,
  } = props;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  useEffect(() => {
    if (editData) {
      setImages([
        editData?.main_image,
        editData?.other_images[0],
        editData?.other_images[1],
      ]);
    }
  }, [editData]);
  const onError = () => {
    setImages([]);
  };
  const printjson = () => {
    document.getElementById("jsonprint").innerHTML = JSON.stringify(
      images,
      null,
      6
    ).replace(/\n( *)/g, function (match, p1) {
      return "<br>" + "&nbsp;".repeat(p1.length);
    });
    console.log(images);
  };
  console.log(images, "PBG");
  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        onError={onError}
        maxNumber={maxNumber}
        acceptType={acceptType}
        maxFileSize={maxFileSize}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          <div className="pb-4">
            {errors?.maxNumber && (
              <div className="py-2">
                <div className="alert alert-error shadow-lg ">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current flex-shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="">
                      Number of selected images exceed maxNumber (3)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* {errors && (
              <Alert color="danger text-start">
                <ul>
                  {errors.maxNumber && (
                    <li>Number of selected images exceed maxNumber</li>
                  )}
                  {errors.acceptType && (
                    <li>Your selected file type is not allow</li>
                  )}
                  {errors.maxFileSize && (
                    <li>Selected file size exceed maxFileSize</li>
                  )}
                </ul>
              </Alert>
            )} */}

            <div className="upload__image-wrapper">
              {!images?.length  && (
                <div
                  className="upload-container"
                  {...dragProps}
                  onClick={onImageUpload}
                  style={
                    isDragging
                      ? { backgroundColor: "#afafaf", color: "white" }
                      : undefined
                  }
                >
                  Choose a file or Drag it here
                </div>
              )}

              <div
                className="p-2 flex justify-evenly items-center "
                style={{ textAlign: "left" }}
              >
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="">
                      <img
                        src={image["data_url"] || image}
                        alt=""
                        className="w-[200px] h-[150px]"
                      />
                    </div>
                    <div
                      onClick={() => onImageRemove(index)}
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

                    {/* <div className="image-item__btn-wrapper mt-1">
                      <div className="flex items-center py-2 ">
                        <div>
                          <button
                            className="bg-[#2F93F6] px-2 text-[#fff] rounded-lg py-2"
                            onClick={() => onImageUpdate(index)}
                          >
                            Update
                          </button>
                        </div>

                        <div className="pl-2">
                          <button
                            className="border border-[#2F93F6] px-2   rounded-lg py-2"
                            onClick={() => onImageRemove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                ))}
              </div>
              {/* {images.length > 0 && (
                <>
                  <hr />
                  <div className="text-start p-2">
                    <button onClick={printjson} color="success">
                      Upload
                    </button>{" "}
                    <button onClick={onImageRemoveAll} color="danger">
                      Remove All Images
                    </button>
                  </div>
                  <pre className="text-start" id="jsonprint"></pre>
                </>
              )} */}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageProduct;

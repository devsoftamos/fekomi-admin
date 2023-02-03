import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";
import CreateInterestModal from "./CreateInterest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function InterestModal({ modalOpen, setModalOpen, datingData }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [interestData, setInterestData] = useState();
  const [interestOpen, setInterestOpen] = useState();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [interestValue, setInterestValue] = useState();
  const [editValue, setEditValue] = useState();
  const getInterest = async () => {
    setLoading(true);
    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DATING}/admin/interests`,
        {
          headers: headers,
        }
      );
      console.log(response?.data?.data);
      setInterestData(response?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  const nextPage = () => {
    setStart(start + 4);

    setEnd(end + 4);
  };
  const prevPage = () => {
    setStart(start - 4);
    setEnd(end - 4);
  };

  useEffect(() => {
    getInterest();
  }, [modalOpen]);
  const createInterest = async () => {
    console.log(datingData, "UID");
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_DATING}/admin/interests`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: ` Bearer ${token}`,
      },
      data: {
        name: interestValue.name,
      },
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
        getInterest();
        setInterestValue();
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

  const handleChange = (e) => {
    setInterestValue({ [e.target.name]: e.target.value });
  };
  const deleteInterest = (id) => {
    console.log(datingData, "UID");
    setLoading("loading");

    const token = localStorage.getItem("fekomi-token");
    const headers = {
      "content-type": "application/json",
      Authorization: ` Bearer ${token}`,
    };
    const options = {
      url: `${process.env.REACT_APP_DATING}/admin/interests/${id}`,
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
        getInterest();
        console.log(response);
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
  const editInterest = (data, id) => {
    setEditValue({ name: data, id: id });
  };
  const updateInterest = () => {
    // console.log(datingData, "UID");
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
      url: `${process.env.REACT_APP_DATING}/admin/interests/${editValue?.id}`,
      method: "PATCH",
      headers: headers,
      data: {
        name: editValue.name,
      },
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
        getInterest();
        setEditValue();
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
  const handleEditChange = (e) => {
    setEditValue({ ...editValue, [e.target.name]: e.target.value });
  };
  console.log(editValue, interestValue);
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
      <CreateInterestModal
        interestOpen={interestOpen}
        setInterestOpen={setInterestOpen}
      />
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Interest</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <div className="px-10 pt-5">
            {interestData?.length ? (
              <div className="bg-white shadow-md pt-7">
                {interestData?.slice(start, end)?.map?.((data, i) => (
                  <>
                    {" "}
                    <div
                      key={i}
                      className="flex items-center justify-between px-2"
                    >
                      <div className="font-black capitalize text-lg">
                        {data?.name}
                      </div>
                      <div>
                        <div className="flex py-2 items-center">
                          <div>
                            <button
                              onClick={() =>
                                editInterest(data?.name, data?._id)
                              }
                              className="bg-gray-300 text-gray-700 rounded-md px-3 py-2"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="pl-3">
                            <button
                              onClick={() => deleteInterest(data?._id)}
                              className="bg-red-300 text-red-700 rounded-md px-3 py-2"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {editValue?.name ? (
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between px-2 py-2 border rounded border-[#E8E9EA] ">
                      <div>
                        <input
                          type="text"
                          placeholder="Type here"
                          name="name"
                          className="outline-none font-black  px-3 py-4 text-lg w-full  bg-white focus:bg-white"
                          required
                          onChange={handleEditChange}
                          defaultValue={editValue?.name}
                          value={editValue?.name}
                        />
                      </div>
                      <div className="pl-2">
                        <button
                          onClick={updateInterest}
                          disabled={!editValue?.name && true}
                          className={`bg-deepBlue ${loading} btn py-3 text-white px-7 rounded`}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between px-2 py-2 border rounded border-[#E8E9EA] ">
                      <div>
                        <input
                          type="text"
                          placeholder="Type here"
                          name="name"
                          className="outline-none font-black  px-3 py-4 text-lg w-full  bg-white focus:bg-white"
                          required
                          onChange={handleChange}
                          autoComplete="off"
                          value={interestValue?.name}
                        />
                      </div>
                      <div className="pl-2">
                        <button
                          onClick={createInterest}
                          disabled={!interestValue && true}
                          className={`bg-deepBlue ${loading} btn py-3 text-white px-7 rounded`}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-end py-2 px-2">
                  <div>
                    <button
                      disabled={start == 0 ? true : false}
                      onClick={prevPage}
                      className="border rounded-md border-red-600 py-1 px-2"
                    >
                      {"<"}
                    </button>
                  </div>
                  <div className="pl-2">
                    <button
                      disabled={interestData?.length < end ? true : false}
                      onClick={nextPage}
                      className="border rounded-md border-deepBlue py-1 px-2"
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white flex  flex-col justify-center items-center shadow-md pt-7">
                <div>
                  <img src="/Box.svg" />
                </div>

                <div className="py-1 ">
                  Sorry, no interest has been ceated. Start by clicking on the
                  button below.
                </div>
                <div className="py-4">
                  <button
                    onClick={() => {
                      setInterestOpen("modal-open");
                      setModalOpen("");
                    }}
                    className="bg-deepBlue text-white font-black rounded-md px-3 py-3"
                  >
                    Create Interest
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

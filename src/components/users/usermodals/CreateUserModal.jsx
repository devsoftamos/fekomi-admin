import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateUserModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const [roles, setRoles] = useState([]);

  const getRoles = () => {
    const token = localStorage.getItem("fekomiAuthToken");

    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const options = {
      url: `${process.env.REACT_APP_ADMIN_URL}/auth/list_all_roles`,
      method: "GET",
      headers: headers,
    };

    axios(options)
      .then((response) => {
        setLoading(false);
        setRoles(response.data.data);
        console.log({ roles: response.data.data });

        // toast.success(response?.data?.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
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

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Create users</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form>
            <div className="flex justify-between pt-10 py-3">
              <div className="w-1/2">
                <label className="text-black text-sm font-black px-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your First Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("email")}
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="text-black text-sm font-black px-2">
                  Last Name
                </label>
                <input
                  type="text"
                  p
                  placeholder="Enter your Last Name"
                  className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                  {...register("email")}
                  required
                />
              </div>
            </div>
            <div className="py-3">
              <label className="text-black text-sm font-black px-2">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Enter your Email Address"
                className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                {...register("email")}
                required
              />
            </div>
            <div className="py-3">
              <label className="text-black text-sm font-black px-2">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter your Phone Number"
                className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                {...register("email")}
                required
              />
            </div>
            <div class="relative py-4">
              <label className="text-black text-sm font-black px-2">Role</label>
              <select
                class="block appearance-none w-full bg-white border border-[#E8E9EA]  py-4 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white "
                id="grid-state"
              >
                {roles?.length &&
                  roles.map((role) => (
                    <option value={role?.id} key={role?.id}>
                      {role?.name}
                    </option>
                  ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* <div className="flex relative justify-between items-center">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your Password"
                id="fname"
                name="fname"
                className="border border-[#E8E9EA] outline-none  px-3 py-4 text-sm w-full bg-white focus:bg-white "
                required
                {...register("password")}
              />
              <div
                className="absolute right-1"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <span>
                    <FontAwesomeIcon icon={faEye} className="" size="sm" />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faEyeSlash} className="" size="sm" />
                  </span>
                )}
              </div>
            </div> */}
            <div className="flex justify-between py-4">
              <div>
                <label
                  onClick={() => setModalOpen("")}
                  className="border border-[#3b4046] px-5 text-black rounded-lg py-4"
                >
                  Cancel
                </label>
              </div>
              <div className="pl-2">
                <label
                  //htmlFor="my-modal-3"
                  className="bg-[#2F93F6] px-4 text-[#fff] rounded-lg py-4 cursor-pointer"
                >
                  Create User
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

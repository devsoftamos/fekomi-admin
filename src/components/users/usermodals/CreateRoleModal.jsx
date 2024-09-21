import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateRoleModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit, watch, reset } = useForm();
  const [loading, setLoading] = useState();

  const [isFormValid, setIsFormValid] = useState(false);

  const watchName = watch("name");
  const watchPermissions = watch("permissions");

  useEffect(() => {
    const isValid =
      watchName &&
      watchName.trim() !== "" &&
      watchPermissions &&
      watchPermissions.length > 0;
    setIsFormValid(isValid);
  }, [watchName, watchPermissions]);

  const createRole = (data) => {
    const token = localStorage.getItem("fekomiAuthToken");

    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const options = {
      url: `${process.env.REACT_APP_ADMIN_URL}/auth/create_role_and_assign_permissions`,
      method: "POST",
      headers: headers,
      data,
    };

    axios(options)
      .then((response) => {
        setLoading(false);

        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .finally(() => {
        reset();
      });
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Create Roles</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <form onSubmit={handleSubmit(createRole)}>
            <div className="w-full py-3">
              <label className="text-black text-sm font-black px-2">
                Name of Role
              </label>
              <input
                type="text"
                placeholder="Enter your Role"
                className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                {...register("name")}
                required
              />
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    value="read"
                    id="read"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("permissions")}
                  />
                </div>
                <label className="pl-3" htmlFor="read">
                  <span className="font-bold">Read</span> - users have full
                  access to read
                </label>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    value="create-user"
                    id="create"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("permissions")}
                  />
                </div>
                <label htmlFor="create" className="pl-3">
                  <span className="font-bold">Write</span> - users have full
                  access to write or edit
                </label>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    value="modify"
                    id="modify"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("permissions")}
                  />
                </div>
                <label htmlFor="modify" className="pl-3">
                  <span className="font-bold">Modify</span> - users have full
                  access to modify
                </label>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    value="delete-user"
                    id="delete"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("permissions")}
                  />
                </div>
                <label htmlFor="delete" className="pl-3">
                  <span className="font-bold">Delete</span> - users have full
                  access to delete
                </label>
              </div>
            </div>

            <div className="flex justify-between py-4">
              <button
                onClick={() => setModalOpen("")}
                className="border border-[#3b4046] px-8 text-black rounded-lg py-3"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isFormValid}
                className="bg-[#2F93F6] px-8 text-[#fff] rounded-lg py-3 cursor-pointer disabled:bg-slate-200"
              >
                Create Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

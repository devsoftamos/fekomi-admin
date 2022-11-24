import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateRoleModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
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
            <div className="w-full py-3">
              <label className="text-black text-sm font-black px-2">
                Name of Role
              </label>
              <input
                type="text"
                placeholder="Enter your Role"
                className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                {...register("email")}
                required
              />
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    placeholder="Enter your Role"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("email")}
                    required
                  />
                </div>
                <div className="pl-3">
                  <span className="font-bold">Read</span> - users have full
                  access to read
                </div>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    placeholder="Enter your Role"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("email")}
                    required
                  />
                </div>
                <div className="pl-3">
                  <span className="font-bold">Write</span> - users have full
                  access to write or edit
                </div>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    placeholder="Enter your Role"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("email")}
                    required
                  />
                </div>
                <div className="pl-3">
                  <span className="font-bold">Modify</span> - users have full
                  access to modify
                </div>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex bg-[#F6F6F6] py-4 px-2">
                <div>
                  <input
                    type="checkbox"
                    placeholder="Enter your Role"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("email")}
                    required
                  />
                </div>
                <div className="pl-3">
                  <span className="font-bold">Delete</span> - users have full
                  access to delete
                </div>
              </div>
            </div>

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

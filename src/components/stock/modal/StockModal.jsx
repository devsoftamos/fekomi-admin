import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function StoreModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">New Stock</div>
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
                  Product Name
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
                  Category
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
            <div className="flex justify-between pt-10 py-3">
              <div className="w-1/2">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Quantity
                </label>
                <div className="flex w-full">
                  <div className="">
                    <select className="py-4 bg-white px-2 w-[95px]  focus:bg-white focus:border-0">
                      <option disabled selected>
                        NGN
                      </option>
                      <option>USD</option>
                      <option>JPY</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter your Email Address"
                      className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                      {...register("email")}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-2">
                <label className="text-black text-sm font-black px-2 pb-1">
                  Price
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter your Email Address"
                    className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                    {...register("email")}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="py-3 w-full">
              <DragDropFile />
            </div>
            <div className="flex py-7">
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

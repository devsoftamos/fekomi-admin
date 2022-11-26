import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DragDropFile from "../../draganddrop/DragAndDrop";

export default function TransactionModal({ modalOpen, setModalOpen }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen}`}>
        <div className="modal-box bg-[#FAFAFA]    max-w-[820px]">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Transaction History</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>

          <div className="px-20">
            <div className="flex justify-between py-4">
              <div>
                <div className="text-gray-400 text-sm">TRANSACTION ID</div>
                <div className="font-black">FEK234448909</div>
              </div>
              <div className="pl-5">
                <div className="text-gray-400 text-sm">CUSTOMER NAME</div>
                <div className="font-black">Ayodele Fekomi</div>
              </div>
            </div>
            <div className="flex justify-between  py-4">
              <div>
                <div className="text-gray-400 text-sm">
                  PRODUCT/SERVICE PURCHASE
                </div>
                <div className="font-black flex">
                  Herbal Tea
                  <span>
                    <img src="/stock.svg" />
                  </span>
                </div>
              </div>
              <div className="pl-5">
                <div className="text-gray-400 text-sm">DATE OF PURCHASE</div>
                <div className="font-black">26th Aug, 2022</div>
              </div>
            </div>
            <div className="flex justify-between  py-4">
              <div>
                <div className="text-gray-400 text-sm">PAYMENT CHANNEL</div>
                <div className="font-black">Credit Card</div>
              </div>
              <div className="pl-5">
                <div className="text-gray-400 text-sm">CURRENCY</div>
                <div className="font-black">Naira</div>
              </div>
            </div>
            <div className="flex justify-between  py-4">
              <div>
                <div className="text-gray-400 text-sm">AMOUNT</div>
                <div className="font-black">100,000 NGN</div>
              </div>
              <div className="pl-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useRef } from "react";

import ReactToPrint from "react-to-print";

export default function PrintModal({
  modalOpen,
  printData,
  setModalOpen,
  order,
}) {
  const componentRef = useRef();
  const [showTitle, setShowTitle] = useState(false);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div>
      <input type="checkbox" id="store-modal" className="modal-toggle" />
      <div className={`modal ${modalOpen} `}>
        <div className="modal-box bg-[#FAFAFA] max-w-3xl  overflow-hidden">
          <div className="flex justify-between rounded-md items-center bg-white py-3 px-2 border-b">
            <div className="text-lg font-bold">Confirm Details</div>
            <div
              onClick={() => setModalOpen("")}
              className="bg-[#C2C2C2] rounded-full px-2 py-1 cursor-pointer text-white"
            >
              ✕
            </div>
          </div>
          <div class="flex flex-col">
            <div class="sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                {!order ? (
                  <div
                    ref={componentRef}
                    class="overflow-hidden bg-white px-11"
                  >
                    <div className="py-4 text-center text-black font-bold text-xl underline">
                      Fekomi Order Receipt
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Product Name:</div>
                      <div className="text-black text-xl ">
                        {" "}
                        {printData?.ecommerceProduct?.name}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Name:</div>
                      <div className="text-black text-xl ">
                        {printData?.customerName}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Phone Number:</div>
                      <div className="text-black text-xl ">
                        {printData?.customerPhone}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">
                        Delivery Address:
                      </div>
                      <div className="text-black text-xl ">
                        {printData?.customerAddress}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Total Amount:</div>
                      <div className="text-black text-xl ">
                        N{numberWithCommas(printData?.totalPrice || 0)}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Quantity:</div>
                      <div className="text-black text-xl ">
                        {printData?.quantity}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">
                        Mode Of Payment:
                      </div>
                      <div className="text-black text-xl ">
                        {" "}
                        {printData?.modeOfPayment}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">
                        Date Of Transaction:
                      </div>
                      <div className="text-black text-xl ">
                        {" "}
                        {new Date(printData?.createdAt).toDateString()},{" "}
                        {new Date(printData?.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={componentRef}
                    class="overflow-hidden bg-white px-11"
                  >
                    <div className="py-4 text-center text-black font-bold text-xl underline">
                      Fekomi Order Receipt
                    </div>
                    {/* <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Product Name:</div>
                      <div className="text-black text-xl ">
                        {" "}
                        {printData?.customer_name}
                      </div>
                    </div> */}
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Name:</div>
                      <div className="text-black text-xl ">
                        {printData?.customer_name}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Email:</div>
                      <div className="text-black text-xl ">
                        {printData?.customer_email}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">
                        Delivery Address:
                      </div>
                      <div className="text-black text-xl ">
                        {printData?.delivery_address}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Total Amount:</div>
                      <div className="text-black text-xl ">
                        N{numberWithCommas(printData?.total_cost || 0)}
                      </div>
                    </div>
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Delivery Cost:</div>
                      <div className="text-black text-xl ">
                        N{numberWithCommas(printData?.delivery_cost || 0)}
                      </div>
                    </div>
                    {/* <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">Quantity:</div>
                      <div className="text-black text-xl ">
                        {printData?.quantity}
                      </div>
                    </div> */}
                    {/* <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">
                        Mode Of Payment:
                      </div>
                      <div className="text-black text-xl ">
                        {" "}
                        {printData?.modeOfPayment}
                      </div>
                    </div> */}
                    <div className="flex py-4 justify-between items-center">
                      <div className="text-black font-bold">
                        Date Of Transaction:
                      </div>
                      <div className="text-black text-xl ">
                        {" "}
                        {new Date(printData?.created_at).toDateString()},{" "}
                        {new Date(printData?.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                )}
                <div className="py-5 flex items-center justify-center">
                  <ReactToPrint
                    trigger={() => (
                      <button className="btn border-0 capitalize btn-md text-lg bg-deepBlue text-white">
                        Print
                      </button>
                    )}
                    content={() => componentRef.current}
                    documentTitle="FK-Walk-in-order receipts"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

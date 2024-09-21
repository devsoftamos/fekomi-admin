import React, { useState, useEffect } from "react";
import SetPriceModal from "./modal/SetPriceModal";
import axios from "axios";
import ChangeModalPrice from "./modal/ChangeModalPrice";

export default function DeliverySetting() {
  const [modalOpen, setModalOpen] = useState();
  const [regionAddress, setRegionAddress] = useState();
  const [openChangeModal, setOpenModalChange] = useState();
  const [editData, setEditData] = useState();
  const getAddress = async () => {
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
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ECOMMERCE}/delivery-regions`,
        {
          headers: headers,
        }
      );

      console.log(response?.data, "DATA");
      setRegionAddress(response?.data?.data);
      //setLoading(false);
    } catch (error) {
      // setLoading(false);
      //setMessage(error?.response?.data?.message);
      //   if (error?.response?.data?.message == "Unauthenticated.") {
      //     navigate("/");
      //   }
    }
  };
  useEffect(() => {
    getAddress();
  }, []);
  console.log(regionAddress?.delivery_regions, "POP");
  return (
    <div>
      <SetPriceModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <ChangeModalPrice
        openChangeModal={openChangeModal}
        setOpenModalChange={setOpenModalChange}
        editData={editData}
      />
      <div className="-text-xl font-black py-4 text-black">
        Delivery Settings by Region
      </div>
      <div className="border-b border-gray-300 text-black py-3 font-semibold w-80">
        Nigeria
      </div>
      {regionAddress?.delivery_regions?.map((data, i) => (
        <div className="py-2">
          <div className="flex justify-between w-96">
            <div className="text-black capitalize">{data?.name}</div>

            <div className="pl-40 flex">
              <div className="font-black text-black">N{data?.cost}</div>
              {regionAddress?.delivery_regions?.length > 0 && (
                <div
                  onClick={() => {
                    setOpenModalChange("modal-open");
                    setEditData(data);
                  }}
                  className="cursor-pointer font-bold pl-4 text-deepBlue"
                >
                  Change
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {
        <div
          onClick={() => {
            setModalOpen("modal-open");
          }}
          className="cursor-pointer pt-4 font-bold  text-deepBlue"
        >
          Set Delivery Price
        </div>
      }
      <div className="border-b border-gray-300 w-80"></div>
    </div>
  );
}

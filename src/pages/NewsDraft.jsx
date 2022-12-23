import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import CustomerTable from "../components/customers/CustomerTable";
import OrderTable from "../components/order/OrderTable";
import NewsDraft from "../components/news/NewsDraft";
import CreateNews from "../components/news/modal/CreateNews";
import DragAndDrop from "../components/news/modal/DragandDrop";

export default function NewsDraftPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState();
  const [images, setImages] = useState([]);
  const handleProduct = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="flex h-screen overflow-hidden ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="flex justify-between">
              <div className="font-black text-lg"> News Draft</div>
            </div>

            <div className="flex gap-10 px-16">
              <div className="w-1/2">
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
                        name="name"
                        placeholder="Enter news title"
                        className="border border-[#E8E9EA] outline-none px-3 py-4 text-sm w-full rounded bg-white focus:bg-white"
                        onChange={handleProduct}
                        defaultValue={"Why herbal tea is good for you"}
                        // required
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    <DragAndDrop images={images} setImages={setImages} />
                  </div>
                  <div>
                    <label className="font-black text-sm">Message</label>
                    <textarea
                      onChange={handleProduct}
                      name="description"
                      defaultValue={
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo vulputate id imperdiet malesuada. Tempor varius viverra enim elementum in sociis. Enim quis ultrices cursus est, habitant dui diam. At urna vitae porta purus molestie eu sem aliquet lorem. A quisque sit id fermentum. Et purus pellentesque urna, duis velit quis faucibus dolor mauris. Consectetur sed quam dolor in aliquam. Feugiat ullamcorper ac ipsum ipsum. Dignissim nec amet posuere neque risus purus. Condimentum sed ut enim donec metus justo. Habitant posuere mi in magna ac elit, in. Sit tellus vulputate scelerisque id urna in. Orci, metus, massa vitae, urna nibh ac neque eu. Scelerisque cras facilisi lobortis et. Ac."
                      }
                      className="border border-[#E8E9EA] outline-none resize-none px-3 py-3 h-36 text-sm w-full rounded bg-white focus:bg-white"
                    ></textarea>
                  </div>

                  <div className="flex justify-between py-10">
                    <div>
                      <label className="bg-[#2F93F6] text-white px-5 rounded-lg py-4">
                        Save Changes
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-sm w-1/2 px-3">
                <div className="py-4 font-black text-lg">Comments</div>
                <div className="flex items-start gap-6">
                  <div>
                    <img src="/boy.svg" />
                  </div>
                  <div className="pl-2 ">
                    <div className="bg-[#F8FAF9] px-3 rounded-md w-[500px] py-6 ">
                      <div className="flex justify-between">
                        <div className="font-black pt-1">Adetutu</div>
                        <div className="text-gray-500 pt-1 pl-36">
                          12mins ago
                        </div>
                      </div>
                      <div className="pt-4">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Velit eget hendrerit nunc semper.
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex py-2">
                      <div className="font-semibold text-gray-500">
                        Block User
                      </div>
                      <div className="pl-3 font-semibold text-gray-500">
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div>
                    <img src="/boy.svg" />
                  </div>
                  <div className="pl-2 ">
                    <div className="bg-[#F8FAF9] px-3 rounded-md w-[500px] py-6 ">
                      <div className="flex justify-between">
                        <div className="font-black pt-1">Adetutu</div>
                        <div className="text-gray-500 pt-1 pl-36">
                          12mins ago
                        </div>
                      </div>
                      <div className="pt-4">
                        <div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Velit eget hendrerit nunc semper.
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex py-2">
                      <div className="font-semibold text-gray-500">
                        Block User
                      </div>
                      <div className="pl-3 font-semibold text-gray-500">
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

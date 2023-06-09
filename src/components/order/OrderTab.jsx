import React from "react";

const OrderTab = (props) => {
  const items = ["Orders", "Walk In Orders"];

  return (
    <nav className="h-full flex lg:inline-flex justify-center items-center lg:items-end rounded-md  overflow-hidden">
      {items.map((item, i) => (
        <button
          className={`${
            i == props.active
              ? "border-b-2 border-[#0177FB] font-bold text-[#0177FB] bg-white "
              : "text-dark-light hover:bg-primary-lightest hover:text-primary"
          } block whitespace-nowrap px-4   lg:px-8 py-3`}
          onClick={() => props.setActiveTab(i)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default OrderTab;

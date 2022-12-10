import React from "react";

function TextField({ label, width, Icons, error, ...props }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <div className="flex flex-row justify-between">
        {" "}
        <label htmlFor="">{label}</label>
        <p className="text-red-500 text-[10px]">{error}</p>
      </div>
      <div className="w-full px-3 border-2 border-main flex items-center">
        <input
          {...props}
          className={`w-full p-3 focus:outline-0 active:ring-0 bg-main`}
          placeholder={label}
        />
        <p className="text-md" onClick={() => {}}>
          {Icons}
        </p>
      </div>
      {/* <p className="w-full bg-red-200 text-red-500 px-5 py-1">{error}</p> */}
    </div>
  );
}

export default TextField;

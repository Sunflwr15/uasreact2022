import React from "react";

function Filter({ title, ...props }) {
  return (
    <button
      {...props}
  
      className="px-5 py-3 w-full border-2 border-main bg-transparent active:bg-second open:"
    >
      {title}
    </button>
  );
}

export default Filter;

import React from "react";

function Button({ title, className,...props }) {
  return (
    <button
      {...props}
      className={`${className} px-5 py-3 w-full border-2 border-main bg-second hover:bg-main transition-all ease-in-all justify-center flex items-center`}
    >
      {title}
    </button>
  );
}

export default Button;

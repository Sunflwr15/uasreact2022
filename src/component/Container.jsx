import React from "react";

function Container({ width, children, className }) {
  return (
    <section
      className={`border-2 border-main w-full h-fit px-7 py-10 ${className} bg-main`}
    >
      {children}
    </section>
  );
}

export default Container;

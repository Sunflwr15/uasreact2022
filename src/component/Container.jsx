import React from "react";

function Container({ width, children, className }) {
  return (
    <section
      className={`border-2 border-main w-full h-fit px-5 p-8 py-5 ${className} bg-main`}
    >
      {children}
    </section>
  );
}

export default Container;

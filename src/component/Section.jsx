import React from "react";

function Section({ children, className }) {
  return (
    <section className={`border-2 border-black w-fit h-fit p-10 ${className}`}>
      {children}
    </section>
  );
}

export default Section;

import React from "react";

const PageHeader = ({text}) => {
  return (
    <>
      <h1 className="font-bold text-xl md:text-2xl text-primary ">
       {text}
      </h1>
    </>
  );
};

export default PageHeader;

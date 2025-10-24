import React from "react";
import { Link } from "react-router-dom";

const PrimaryButton = ({ name, path, className }) => {
  return (
    <Link
      className={`${className}  lg:px-6 px-3.5 lg:py-3 py-2 hover:bg-white hover:text-black duration-300 rounded-[12px] border-[1px] border-[#FCFCFD] text-center lg:text-lg text-base text-white font-semibold`}
      to={path}
    >
      {name}
    </Link>
  );
};

export default PrimaryButton;

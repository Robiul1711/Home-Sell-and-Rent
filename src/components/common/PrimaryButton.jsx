import React from "react";
import { Link } from "react-router-dom";

const PrimaryButton = ({ name, path, className }) => {
  return (
    <Link
      className={`${className}  px-6 py-3 hover:bg-white hover:text-black duration-300 rounded-[12px] border-[1px] border-[#FCFCFD] text-center text-lg text-white font-semibold`}
      to={path}
    >
      {name}
    </Link>
  );
};

export default PrimaryButton;

import React from "react";

const CommonBanner = ({ bannerImage, className, children }) => {
  return (
    <div
      className={`${className} h-[950px] w-full bg-cover bg-center bg-no-repeat `}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {children}
    </div>
  );
};

export default CommonBanner;

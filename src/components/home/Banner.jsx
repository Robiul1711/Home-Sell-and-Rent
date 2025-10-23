import React from "react";
import CommonBanner from "../common/CommonBanner";
import BannerImage from "@/assets/images/b1.jpg";
import { Title32, Title77 } from "../common/Title";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../common/CustomIcons";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <CommonBanner className={"h-screen"} bannerImage={BannerImage}>
      <div className="relative pt-[140px] md:pt-[180px] lg:pt-[200px] pb-[100px] flex flex-col justify-center items-center text-center gap-5 md:gap-6 px-6 sm:px-10 lg:px-0 max-w-[1454px] mx-auto">
        
        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <Title77 className="!text-white text-[32px] sm:text-[44px] md:text-[58px] lg:text-[77px] leading-[1.2] font-bold">
            Smart Data, Smarter Investments
          </Title77>
        </motion.div>

        {/* Subtitle Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="max-w-[900px] w-full"
        >
          <Title32 className="text-[#E8E8E8] text-[16px] sm:text-[18px] md:text-[22px] leading-relaxed">
            KOANO’s predictive analytics give you the foresight to uncover high-growth real estate opportunities before they emerge.
          </Title32>
        </motion.div>

        {/* Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="mt-4 sm:mt-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/map"
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-[10px] sm:rounded-[12px] bg-primaryColor text-white text-[15px] sm:text-[16px] font-semibold transition-all duration-300 group"
            >
              <p>Open Map</p>
              <span className="group-hover:rotate-45 duration-300">
                <ArrowIcon />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </CommonBanner>
  );
};

export default Banner;

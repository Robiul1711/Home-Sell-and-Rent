import React from "react";
import CommonBanner from "../common/CommonBanner";
import BannerImage from "@/assets/images/b4.jpg";
import { koanodata } from "@/utils/data";
import { Title97 } from "../common/Title";
import { motion } from "framer-motion";

const KoanoDetails = () => {
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const titleVariant = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <CommonBanner bannerImage={BannerImage} className={`!h-auto`} >
      <div
        className="
          flex flex-col-reverse lg:flex-row 
          w-full gap-12 lg:gap-20 
          section-padding-x pt-10
        "
        id="approach"
      >
        {/* Left section - details */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {koanodata.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="pb-6 border-b border-[#E1DCD6] flex flex-col gap-4"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-[22px] md:text-[24px] text-[#C6C4C2] font-medium">
                  0{item.id}
                </p>
                <p className="text-[22px] md:text-[24px] text-[#262626] font-medium">
                  {item.title}
                </p>
              </div>
              <p className="text-[#262626] font-normal text-sm md:text-base leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Right section - title */}
        <motion.div
          className="w-full lg:w-1/2 flex "
          variants={titleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Title97>WITH KOANO</Title97>
        </motion.div>
      </div>
    </CommonBanner>
  );
};

export default KoanoDetails;

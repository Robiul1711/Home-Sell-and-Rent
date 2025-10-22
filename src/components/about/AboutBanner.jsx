import React from "react";
import BannerImage from "@/assets/images/b2.jpg";
import CommonBanner from "../common/CommonBanner";
import { aboutusdata } from "@/utils/data";
import { Title20 } from "../common/Title";
import { motion } from "framer-motion";

const AboutBanner = () => {
  // Container animation (staggered child entrance)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  // Each card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <CommonBanner bannerImage={BannerImage}>
      <div className="flex w-full justify-end items-end section-padding-x pt-[160px]">
        {/* Animate entire grid */}
        <motion.div
          className="max-w-[852px] grid grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aboutusdata?.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[rgba(219,211,195,0.20)] border-[1px] backdrop-blur-[6px] border-primaryColor p-6 rounded-[16px] flex flex-col justify-between items-start h-full gap-2"
            >
              {/* Number icon animation */}
              <motion.span
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-4 w-16 h-16 aspect-square text-center rounded-lg bg-white text-primaryColor text-[24px] font-semibold flex items-center justify-center"
              >
                {item.id}
              </motion.span>

              <div className="flex flex-col gap-4">
                <Title20>{item?.title}</Title20>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </CommonBanner>
  );
};

export default AboutBanner;

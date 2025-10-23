import React from "react";
import CommonBanner from "../common/CommonBanner";
import BannerImage from "@/assets/images/b2.jpg";
import { Title16, Title20, Title97 } from "../common/Title";
import { whoweare } from "@/utils/data";
import { motion } from "framer-motion";

const WhoWeAre = ({ className, data }) => {
  // Parent animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  // Each card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <CommonBanner bannerImage={BannerImage}>
      <div className="flex justify-end items-end w-full">
        <div
          className={`${className} flex flex-col w-full gap-8 relative section-padding-x max-w-[1100px]`}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Title97 className="text-center md:text-left text-[42px] sm:text-[60px] md:text-[77px] lg:text-[97px]">
              Who We Are
            </Title97>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2  gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whoweare?.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-[rgba(219,211,195,0.20)] border border-primaryColor backdrop-blur-[6px] p-5 sm:p-6 rounded-[16px] flex flex-col justify-between items-start h-full gap-3 hover:scale-[1.02] transition-transform duration-300"
              >
                <span className="p-3 sm:p-4 rounded-lg bg-white">{item.icon}</span>

                <div className="flex flex-col gap-3">
                  <Title20 className="text-[18px] sm:text-[20px]">{item?.title}</Title20>
                  <Title16 className="text-[14px] sm:text-[16px] leading-relaxed">
                    {item?.text}
                  </Title16>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </CommonBanner>
  );
};

export default WhoWeAre;

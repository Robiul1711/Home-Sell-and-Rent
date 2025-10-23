import React from "react";
import { motion } from "framer-motion";
import CommonBanner from "../common/CommonBanner";
import BannerImage from "@/assets/images/b6.png";
import { Title16, Title20, Title97 } from "../common/Title";

const OurClient = () => {
  return (
    <CommonBanner bannerImage={BannerImage}>
      <div className="section-padding-x flex flex-col gap-12 z-50 relative max-w-[1220px]">
        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title97 className="!text-white pt-20 text-center">Our Clients</Title97>
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              bg: "#A6CDBD",
              text: "KOANO's data cut our site selection time in half. Everything we needed was right there.",
              name: "-Tariq Johnson",
              role: "Development Project Manager",
              height: "min-h-[470px]",
            },
            {
              bg: "#A271B8",
              text: "I finally understood what was happening in my neighborhood and how it affected my home's value.",
              name: "-Janelle Ruiz",
              role: "Homeowner",
              height: "min-h-[380px]",
            },
            {
              bg: "rgba(1,1,1,0.06)",
              text: "KOANO helped me spot emerging neighborhoods before the buzz hit. Saved me months of research.",
              name: "-Marcus Lin",
              role: "Real Estate Investor",
              height: "min-h-[470px]",
              blur: true,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index, ease: "easeOut" }}
              className={`px-8 py-6 flex flex-col gap-4 rounded-lg ${card.height} ${
                card.blur ? "backdrop-blur-[4px]" : ""
              }`}
              style={{ backgroundColor: card.bg }}
            >
              <p className="text-[30px] font-medium text-[#FCFCFD] leading-snug">
                {card.text}
              </p>

              <div className="mt-auto flex flex-col gap-1">
                <Title20 className="!text-white">{card.name}</Title20>
                <Title16 className="text-white">{card.role}</Title16>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="section-padding-x"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <div className="mt-10 border-t-[1px] border-t-[#E5E3F8] pt-4">
          <p className="text-[24px] text-white text-center font-semibold">
            Regardless of your real estate expertise, KOANO empowers new and seasoned
            investors through real-time market intelligence by transforming complex
            market data into clear, easily navigable metrics.
          </p>
        </div>
      </motion.div>
    </CommonBanner>
  );
};

export default OurClient;

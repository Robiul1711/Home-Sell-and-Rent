import React from "react";
import { motion } from "framer-motion";
import CommonBanner from "../common/CommonBanner";
import BannerImage from "@/assets/images/b6.png";
import { Title16, Title20, Title97 } from "../common/Title";

const OurClient = () => {
  const cards = [
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
  ];

  return (
    <section id="clients">
      <CommonBanner bannerImage={BannerImage} className={`!h-auto`}>
        <div className="section-padding-x flex flex-col gap-10 relative max-w-[1220px]  z-50 ">
          {/* Title Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Title97 className="!text-white pt-10 md:pt-20 text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Our Clients
            </Title97>
          </motion.div>

          {/* Cards Section */}
          <div
            className="
              grid gap-6 sm:gap-8 
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            "
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                className={`p-6 sm:p-8 flex flex-col gap-4 rounded-2xl  ${
                  card.blur ? "backdrop-blur-[4px]" : ""
                }`}
                style={{ backgroundColor: card.bg }}
              >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-medium text-[#FCFCFD] leading-snug">
                  {card.text}
                </p>

                <div className="mt-auto flex flex-col gap-1">
                  <Title20 className="!text-white text-base sm:text-lg md:text-xl">
                    {card.name}
                  </Title20>
                  <Title16 className="text-white text-sm sm:text-base">
                    {card.role}
                  </Title16>
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
          <div className="mt-10 border-t border-t-[#E5E3F8] pt-6 sm:pt-8 pb-10 ">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center font-semibold leading-relaxed">
              Regardless of your real estate expertise, KOANO empowers new and
              seasoned investors through real-time market intelligence by
              transforming complex market data into clear, easily navigable
              metrics.
            </p>
          </div>
        </motion.div>
      </CommonBanner>
    </section>
  );
};

export default OurClient;

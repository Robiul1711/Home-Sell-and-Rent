import React from 'react'
import CommonBanner from '../common/CommonBanner'
import BannerImage from "@/assets/images/b2.jpg"
import { Title16, Title20, Title97 } from '../common/Title'
import { whoweare } from '@/utils/data'
import { motion } from 'framer-motion'

const WhoWeAre = ({ className, data }) => {
  // Parent animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // delay between cards
      },
    },
  }

  // Each card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <CommonBanner bannerImage={BannerImage}>
      <div className="flex justify-end items-end">
        <div className={`${className} flex flex-col w-full gap-8 relative section-padding-x`}>
          
          {/* Title animation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Title97>Who We Are</Title97>
          </motion.div>

          {/* Cards container with stagger animation */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whoweare?.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-[rgba(219,211,195,0.20)] border-[1px] backdrop-blur-[6px] border-primaryColor p-6 rounded-[16px] flex flex-col justify-between items-start h-full gap-2"
              >
                <span className="p-4 rounded-lg bg-white">{item.icon}</span>

                <div className="flex flex-col gap-4">
                  <Title20>{item?.title}</Title20>
                  <Title16>{item?.text}</Title16>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </CommonBanner>
  )
}

export default WhoWeAre

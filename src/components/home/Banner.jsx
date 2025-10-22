import React from 'react'
import CommonBanner from '../common/CommonBanner'
import BannerImage from "@/assets/images/b1.jpg"
import { Title32, Title77 } from '../common/Title'
import { Link } from 'react-router-dom'
import { ArrowIcon } from '../common/CustomIcons'
import { motion } from 'framer-motion'

const Banner = () => {
  return (
    <CommonBanner bannerImage={BannerImage}>
      <div className='max-w-[1454px] relative pt-[160px] mx-auto flex justify-center items-center text-center flex-col gap-6'>
        
        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Title77 className='!text-white'>
            Smart Data, Smarter Investments
          </Title77>
        </motion.div>

        {/* Subtitle Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          <Title32>
            KOANO's predictive analytics give you the foresight to uncover high-growth real estate opportunities before they emerge.
          </Title32>
        </motion.div>

        {/* Button Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="#"
              className="flex group items-center gap-2 duration-300 px-6 py-3 rounded-[12px] bg-primaryColor text-white"
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
  )
}

export default Banner

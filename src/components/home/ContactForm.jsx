import React from "react";
import CommonBanner from "../common/CommonBanner";
import BannerImage from "@/assets/images/b3.jpg";
import { Title97 } from "../common/Title";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ContactForm = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = [
    { type: "text", placeholder: "Name", name: "name", label: "Your Name" },
    { type: "email", placeholder: "Email", name: "email", label: "Your Email" },
    { type: "textarea", placeholder: "Write a message", name: "message", label: "Message" },
  ];

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.25 }
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
<section id="contact">
  <CommonBanner bannerImage={BannerImage}>
    <motion.div
      className="flex justify-end items-end section-padding-x"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-[900px] w-full flex flex-col justify-center items-center h-screen gap-6
                      sm:px-6 lg:px-0"> {/* Responsive padding */}
        {/* Title Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Title97 className="!text-white text-2xl sm:text-3xl md:text-4xl">CONTACT US</Title97>
        </motion.div>

        {/* Form Animation Container */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={containerVariants}
          className="p-6 sm:p-8 md:p-10 rounded-[16px] border border-[#EEE] grid gap-6 backdrop-blur-md
                     w-full"
        >
          {formData.map((field, index) => (
            <motion.div
              key={index}
              variants={fieldVariants}
              className="flex flex-col gap-4"
            >
              <label
                htmlFor={field.name}
                className="text-white text-lg sm:text-base md:text-lg font-medium"
              >
                {field.label}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  {...register(field.name, { required: `${field.label} is required` })}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-md bg-transparent border border-white text-white placeholder:text-white focus:outline-none focus:border-primaryColor
                             text-sm sm:text-base md:text-base"
                  rows="5"
                ></textarea>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name, { required: `${field.label} is required` })}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-md bg-transparent border border-white text-white placeholder:text-white focus:outline-none focus:border-primaryColor
                             text-sm sm:text-base md:text-base"
                />
              )}

              {errors[field.name] && (
                <p className="text-red-400 text-sm">
                  {errors[field.name]?.message}
                </p>
              )}
            </motion.div>
          ))}

          {/* Animated Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 py-3 px-6 bg-primaryColor text-white font-semibold rounded-lg hover:bg-primaryColor/80 transition-all text-sm sm:text-base md:text-base"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  </CommonBanner>
</section>

  );
};

export default ContactForm;

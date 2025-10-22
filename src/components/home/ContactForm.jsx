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
    <CommonBanner bannerImage={BannerImage}>
      <motion.div 
        className="flex justify-end items-end section-padding-x"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-[900px] flex flex-col gap-6">
          {/* Title Animation */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Title97 className="!text-white">CONTACT US</Title97>
          </motion.div>

          {/* Form Animation Container */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={containerVariants}
            className="p-6 rounded-[16px] border border-[#EEE] grid gap-6 backdrop-blur-md"
          >
            {formData.map((field, index) => (
              <motion.div
                key={index}
                variants={fieldVariants}
                className="flex flex-col gap-4"
              >
                <label
                  htmlFor={field.name}
                  className="text-white text-lg font-medium"
                >
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    {...register(field.name, { required: `${field.label} is required` })}
                    placeholder={field.placeholder}
                    className="w-full p-3 rounded-md bg-transparent border border-white text-white placeholder:text-white focus:outline-none focus:border-primaryColor"
                    rows="5"
                  ></textarea>
                ) : (
                  <input
                    id={field.name}
                    type={field.type}
                    {...register(field.name, { required: `${field.label} is required` })}
                    placeholder={field.placeholder}
                    className="w-full p-3 rounded-md bg-transparent border border-white text-white placeholder:text-white focus:outline-none focus:border-primaryColor"
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
              className="mt-4 py-3 px-6 bg-primaryColor text-white font-semibold rounded-lg hover:bg-primaryColor/80 transition-all"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </CommonBanner>
  );
};

export default ContactForm;

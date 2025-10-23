import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "otp-input-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CommonButton from "@/components/common/CommonButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-lg bg-[#0C0C0C]/30 backdrop-blur-[20px] text-white rounded-xl p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Verify your KOANO account
        </h1>
        <p className="text-sm">
          Enter the 6-digit code sent to your email or phone to complete account
          setup.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={control}
          name="otp"
          rules={{
            required: "OTP is required",
            minLength: { value: 5, message: "OTP must be 5 digits" },
            maxLength: { value: 5, message: "OTP must be 5 digits" },
          }}
          render={({ field }) => (
            <div className="flex justify-center">
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                autoFocus
                OTPLength={5}
                otpType="number"
                disabled={false}
                inputStyles={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 0.5rem",
                  fontSize: "1.5rem",
                  borderRadius: "0.5rem",

                  textAlign: "center",
                  outline: "none",
                  backgroundColor: "#fff",
                  color: "black",
                }}
                focusStyles={{
                  border: "2px solid #3b82f6",
                  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                }}
                className="otp-input-container"
              />
            </div>
          )}
        />
        {errors.otp && (
          <p className="text-center text-sm text-red-800">
            {errors.otp.message}
          </p>
        )}

        {/* Submit */}
        <CommonButton
          type="submit"
          className="w-full h-[44px] flex items-center bg-customGreen text-white border-none justify-center"
        >
          Verify OTP
        </CommonButton>
      </form>
    </div>
  );
}

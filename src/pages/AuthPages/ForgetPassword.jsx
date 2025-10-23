import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import CommonButton from "@/components/common/CommonButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { showLoadingToast, updateToastError, updateToastSuccess } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export default function ForgetPassword() {

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ForgotMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosPublic.post("/register", data);
      return response?.data;
    },
    onMutate: () => {
      const toastId = showLoadingToast("Registering...");
      return { toastId };
    },
    onSuccess: (response, _variables, context) => {
      updateToastSuccess(context.toastId, response?.message || "Sign-up successful");

      navigate("/auth/verify-otp");
    },
    onError: (error, _variables, context) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong, try again later!!";
      updateToastError(context.toastId, errorMessage);
    },
  });

  const onSubmit = (data) => {
console.log(data)
    ForgotMutation.mutate(data);
    // 🔐 Handle signup logic here
  };

  return (
    <div className="w-full max-w-lg bg-[#0C0C0C]/30 backdrop-blur-[20px] text-white rounded-xl p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Reset your KOANO password
        </h1>
        <p className="text-sm">
          Enter your account email to receive a reset link or OTP code.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Registered Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-white" />
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-12 py-3 border border-white rounded-lg text-sm focus:ring-1 focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center justify-end text-customGreen">
          <Link to="/auth/sign-in" className="hover:underline font-medium">
            Back to Sign In
          </Link>
        </div>

        {/* Submit */}
        <CommonButton
          type="submit"
          className="w-full h-[44px] flex items-center bg-customGreen text-white border-none justify-center"
        >
       
              {ForgotMutation?.isPending ? (
              <BeatLoader
                loading={ForgotMutation?.isPending}
                color="white"
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "    Send OTP"
            )}
          
      
        </CommonButton>
      </form>
    </div>
  );
}

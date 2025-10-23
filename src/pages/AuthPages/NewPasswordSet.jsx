import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import CommonButton from "@/components/common/CommonButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function NewPasswordSet() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Signing Up...");

    const payload = {
      email: data.email,
      login: data.email,
      password: data.password,
    };

    try {
      const res = await axiosPublic.post("/odoo/register", payload);
      if (res) {
        toast.success("Sign Up Successful", { id: toastId });
        navigate("/auth/sign-in");
      }
    } catch (error) {
      toast.error("Sign Up Failed", { id: toastId });
    }
  };

  const password = watch("password");

  return (
    <div className="w-full max-w-lg bg-[#0C0C0C]/30 backdrop-blur-[20px] text-white rounded-xl p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Create a new KOANO password
        </h1>
        <p className="text-sm">
          Choose a strong password to secure your property analytics and saved
          portfolio.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border border-white rounded-lg text-sm focus:ring-1 focus:outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-[#C0C0C0]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-white" />
              ) : (
                <Eye className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-white" />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 border border-white rounded-lg text-sm focus:ring-1 focus:outline-none transition ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-500"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-[#C0C0C0]"
            >
              {showConfirm ? (
                <EyeOff className="h-5 w-5 text-white" />
              ) : (
                <Eye className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
          
        {/* Submit */}
        <CommonButton
          type="submit"
          className="w-full h-[44px] flex items-center bg-customGreen text-white border-none justify-center"
        >
          Update Password
        </CommonButton>
      </form>
    </div>
  );
}

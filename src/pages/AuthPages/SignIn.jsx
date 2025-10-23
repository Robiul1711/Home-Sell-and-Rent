import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import CommonButton from "@/components/common/CommonButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
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

  return (
    <div className="w-full max-w-lg bg-[#0C0C0C]/30 backdrop-blur-[20px] text-white rounded-xl p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">Welcome back to KOANO</h1>
        <p className="text-sm">
          View property growth forecasts and analytics tailored for your
          portfolio.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
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

        {/* Terms */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" />
            <p className="">Remember me</p>
          </div>
          <Link
            to="/auth/forgot-password"
            className="text-customGreen hover:underline"
          >
            Fotgot Password
          </Link>
        </div>

        {/* Submit */}
        <CommonButton
          type="submit"
          className="w-full h-[44px] flex items-center bg-customGreen text-white border-none justify-center"
        >
          Sign In
        </CommonButton>
      </form>
      {/* Divider Section */}
      <div className="mt-8">
        {/* Horizontal line with text */}
        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-[#E5E5E5"></div>
          <span className="px-3 text-sm text-gray-300">Or continue with</span>
          <div className="flex-grow border-t border-[#E5E5E5]"></div>
        </div>

        {/* Social buttons */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-md"
          >
            <FcGoogle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Already have account */}
      <div className="text-center mt-6 text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/auth/sign-up" className="hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
}

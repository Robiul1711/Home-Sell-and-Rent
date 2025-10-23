import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import CommonButton from "@/components/common/CommonButton";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { showLoadingToast, updateToastError, updateToastSuccess } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export default function SignUp() {
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

  const SignupMutation = useMutation({
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

      navigate("/auth/verify-code");
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
    SignupMutation.mutate(data);
    // 🔐 Handle signup logic here
  };
  const password = watch("password");

  return (
    <div className="w-full max-w-lg bg-[#0C0C0C]/30 backdrop-blur-[20px] text-white rounded-xl p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Create your KOANO account
        </h1>
        <p className="text-sm">
          Access nationwide opportunity zone data and NYC property insights —
          all in one platform.
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

        {/* Terms */}
        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox"  />
          <p className="">I agree to the Terms of Service & Privacy Policy</p>
        </div>

        {/* Submit */}
        <CommonButton
          type="submit"
          className="w-full h-[44px] flex items-center bg-customGreen text-white border-none justify-center"
        >
         {SignupMutation?.isPending ? (
              <BeatLoader
                loading={SignupMutation?.isPending}
                color="white"
                size={12}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Sign Up"
            )}
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
        Already have an account?{" "}
        <Link to="/auth/sign-in" className="hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
}

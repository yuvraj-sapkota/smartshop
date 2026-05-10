import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  subtitle,
  fields,
  form,
  errors,
  handleChange,
  handleSubmit,
  buttonText,
  footerText,
  footerLinkText,
  footerLink,
  isLoading = false,
  showRememberMe = false,
  showForgotPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 ">
      <div className="w-full max-w-md ">
        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

            <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>

                  {/* Password Field */}
                  {field.type === "password" ? (
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full border rounded-lg  px-4 py-3 outline-none transition-all duration-200
                      ${
                        errors[field.name]
                          ? "border-red-500 focus:ring-4 focus:ring-red-100"
                          : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-blue-100"
                      }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      rows={4}
                      className={`w-full border rounded-lg px-4 py-3 outline-none resize-none transition-all duration-200
                    ${
                      errors[field.name]
                        ? "border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-blue-100"
                    }`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`w-full border rounded-lg px-4 py-3 outline-none transition-all duration-200
                    ${
                      errors[field.name]
                        ? "border-red-500 focus:ring-4 focus:ring-red-100"
                        : "border-gray-300 focus:border-primary focus:ring-4 focus:ring-blue-100"
                    }`}
                    />
                  )}

                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Remember + Forgot */}
            {(showRememberMe || showForgotPassword) && (
              <div className="flex items-center justify-between">
                {showRememberMe ? (
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" />
                    Remember me
                  </label>
                ) : (
                  <div />
                )}

                {showForgotPassword && (
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {isLoading ? "Please wait..." : buttonText}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {footerText}{" "}
              <Link
                to={footerLink}
                className="font-semibold text-primary hover:text-primary-hover"
              >
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

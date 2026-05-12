import React, { useState } from "react";
import AuthForm from "../AuthForm";
import { registerSellerApi } from "../../services/auth/auth.api";
import { showSuccess } from "../../utils/toast";

const SellerSignup = () => {
  const [form, setForm] = useState({
    referBy: "",
    username: "",
    email: "",
    password: "",
    storeName: "",
    storeAddress: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!form.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    }
    if (!form.storeAddress.trim()) {
      newErrors.storeAddress = "Store address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsLoading(true);

      const data = await registerSellerApi(form);
      showSuccess(data.message);
    } catch (error) {
      console.log(error);
      showError(error.response?.dta?.message || "something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const signupFields = [
    {
      label: "Referral Username",
      name: "referBy",
      type: "text",
      placeholder: "Referral code if any",
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Enter username",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Create password",
    },
    {
      label: "Store Name",
      name: "storeName",
      type: "text",
      placeholder: "Enter storeName",
    },
    {
      label: "Store Address",
      name: "storeAddress",
      type: "textarea",
      placeholder: "Enter your store address",
    },
  ];
  return (
    <>
      <AuthForm
        title="Create Seller Account"
        subtitle="Create your seller account to continue"
        fields={signupFields}
        form={form}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Create Account"
        footerText="Already have an account?"
        footerLinkText="Login"
        footerLink="/login"
        isLoading={isLoading}
      />
    </>
  );
};

export default SellerSignup;

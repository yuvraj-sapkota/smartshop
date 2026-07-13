import { useState } from "react";
import AuthForm from "../AuthForm";
import LocationAddressField from "../LocationAddressField";
import { registerUserApi } from "../../services/auth/auth.api";
import { showError, showSuccess } from "../../utils/toast";

const UserSignup = () => {
  const [form, setForm] = useState({
    referBy: "",
    username: "",
    email: "",
    password: "",
    address: "",
    latitude: null,
    longitude: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLocationChange = (coords) => {
    setForm((prev) => ({
      ...prev,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
    }));
    setErrors((prev) => ({ ...prev, address: "" }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    const hasLocation = form.latitude != null && form.longitude != null;
    if (!hasLocation && !form.address.trim()) {
      newErrors.address = "Share your location or enter your address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      const data = await registerUserApi(form);
      showSuccess(data.message);

      setForm({
        referBy: "",
        username: "",
        email: "",
        password: "",
        address: "",
        latitude: null,
        longitude: null,
      });
    } catch (error) {
      showError(error.response?.data?.message || "Something went wrong");
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
  ];

  return (
    <AuthForm
      title="Create Account"
      subtitle="Create your account to continue"
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
    >
      <LocationAddressField
        label="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
        onLocationChange={handleLocationChange}
        error={errors.address}
        placeholder="Enter your address"
      />
    </AuthForm>
  );
};

export default UserSignup;

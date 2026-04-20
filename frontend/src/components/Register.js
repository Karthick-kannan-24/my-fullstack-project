import { useEffect, useState } from "react";
import { registerUser } from "../api/auth";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const timer = setTimeout(() => {
      setErrors({});
    }, 5000);

    return () => clearTimeout(timer);
  }, [errors]);

  const handleSubmit = async () => {
    try {
      setErrors({});
      await registerUser(form);
      toast.success("Registered successfully");
      switchToLogin();
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        toast.error("Error registering user");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
        )}

        <input
          className="input mt-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
        )}

        <div className="relative mt-2">
          <input
            type={showPassword ? "text" : "password"}
            className="input w-full pr-10"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
        )}

        <div className="relative mt-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="input w-full pr-10"
            placeholder="Confirm Password"
            value={form.password_confirmation}
            onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>
        )}

        <button className="btn mt-4 w-full" onClick={handleSubmit}>
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={switchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
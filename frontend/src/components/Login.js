import { useState } from "react";
import { loginUser } from "../api/auth";
import { saveToken } from "../utils/tokenStorage";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Login({ setAuth, switchToRegister, switchToForgotPassword }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setErrors({});
      const res = await loginUser(form);
      await saveToken(res.data.token);
      toast.success("Logged in successfully");
      setAuth(true);
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors || {});
        setTimeout(() => setErrors({}), 5000); // clear errors after 5 seconds
      } else {
        toast.error("Invalid login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="input"
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

        <button className="btn mt-4 w-full" onClick={handleLogin}>
          Login
        </button>

        <p className="text-sm mt-2 text-center">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={switchToForgotPassword}
          >
            Forgot Password?
          </span>
        </p>

        <p className="text-sm mt-2 text-center">
          Don’t have account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={switchToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import { createUser } from "../api/user";
import toast from "react-hot-toast";

export default function UserForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleAdd = async () => {
    try {
      setErrors({}); // reset errors

      const response = await createUser(form);
      console.log("User added", response.data);

      // clear form
      setForm({ name: "", email: "", password: "" });

      if (onAdd) onAdd();

    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors); // store validation errors

        // show first validation error in toast
          // const firstError = Object.values(err.response.data.errors)[0][0];
          // toast.error(firstError);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Add User</h3>

      <div className="grid grid-cols-3 gap-2">

        {/* NAME */}
        <div>
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({...form, name:e.target.value})}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name[0]}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password[0]}</p>
          )}
        </div>

      </div>

      <button className="btn mt-3" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
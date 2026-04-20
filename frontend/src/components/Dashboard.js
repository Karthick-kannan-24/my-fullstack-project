import { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { removeToken } from "../utils/tokenStorage";

export default function Dashboard({ setAuth }) {
  const [userRefresh, setUserRefresh] = useState(0);

  const logout = () => {
    removeToken();
    setAuth(false);
  };

  const refreshUsers = () => setUserRefresh((prev) => prev + 1);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button className="btn bg-red-500" onClick={logout}>Logout</button>
      </div>

      <UserForm onAdd={refreshUsers} />
      <UserList refresh={userRefresh} />
    </div>
  );
}
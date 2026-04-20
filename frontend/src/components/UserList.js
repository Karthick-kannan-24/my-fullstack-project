import { useEffect, useState } from "react";
import { getUsers, deleteUser as apiDeleteUser } from "../api/user";

export default function UserList({ refresh }) {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.data);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    await apiDeleteUser(userToDelete.id);
    setUserToDelete(null);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Users</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="text-red-500"
                  onClick={() => setUserToDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {userToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-3">Delete User</h3>
            <p className="mb-5">
              Are you sure you want to delete <strong>{userToDelete.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700"
                onClick={() => setUserToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
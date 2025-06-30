import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmail(res.data.email);
         setPassword(res.data.bcryptpassword)
        set
      } catch (err) {
        setEmail("Unauthorized");
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/update",
        { email, oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
     setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">Dashboard</h1>
      <p className="mb-4">Welcome, {email}</p>
      <p className="mb-4">your password, {password}</p>

      <label className="block text-sm font-medium text-gray-600 mb-1">Old Password</label>
      <input
        type="password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Enter old password"
        className="w-full px-4 py-2 border rounded-lg mb-3"
      />

      <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        className="w-full px-4 py-2 border rounded-lg mb-3"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Update Password
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Logout
      </button>
    </div>
  );
}

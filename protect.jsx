import { useEffect, useState } from "react";
import axios from "axios";

export default function Protect() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:5000/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        setUser("Unauthorized");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Protected Page</h1>
      <p>Hello {user}</p>
    </div>
  );
}


import { Navigate } from "react-router-dom";

export default function publicRoute({ children }) {
 const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" /> : children;
}
 
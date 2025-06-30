import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/publicRoute";
import Protect from "./pages/protect";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public only routes */}
         <Route path="/" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/protected" element={<PrivateRoute><Protect /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

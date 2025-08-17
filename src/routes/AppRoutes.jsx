import { Routes, Route } from "react-router-dom";
import {Dashboard, AdminDashboard} from "../pages/Dashboard/Dashboard";
import { ProtectedRoute, AdminRoute } from "./ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />
    <Route path="*" element={<p>Page not found</p>} />
  </Routes>
);

export default AppRoutes;

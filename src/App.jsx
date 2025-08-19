
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout & Components
import Header from "./components/Header/Header";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Register Page
import ForgotPassword from "./pages/ForgotPassword"; // Forgot Password Page
import AddCourse from "./pages/AddCourses";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/adminDashboard"; // Admin Dashboard
import Trending from "./pages/Trending";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="min-h-screen bg-gray-50 py-6">
          <Routes>
            {/* Home, Dashboard, Trending routes */}
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />

            {/* Login, Register, Forgot Password Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Protected Routes */}
            <Route
              path="/add-course"
              element={
                <ProtectedRoute>
                  <AddCourse />
                </ProtectedRoute>
              }
            />
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
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;

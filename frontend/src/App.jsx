import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import Help from "./components/Help";
import Privacy from "./components/Privacy";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import { ThemeProvider, useTheme } from "./ThemeContext";

const AppContent = ({ user, setUser }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Navbar user={user} setUser={setUser} />
      <div className="container flex-grow-1 mt-4">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/employee"
            element={
              <ProtectedRoute user={user} role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user} role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider>
      <Router>
        <AppContent user={user} setUser={setUser} />
      </Router>
    </ThemeProvider>
  );
};

export default App;







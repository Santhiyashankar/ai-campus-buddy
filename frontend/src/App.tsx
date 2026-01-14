import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Tasks from "./pages/Tasks";
import Collaboration from "./pages/Collaboration";
import CampusResources from "./pages/CampusResources";
import Gamification from "./pages/Gamification";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 FIX: redirect index.html */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />

        {/* Public */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/collaboration" element={<ProtectedRoute><Collaboration /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><CampusResources /></ProtectedRoute>} />
        <Route path="/gamification" element={<ProtectedRoute><Gamification /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

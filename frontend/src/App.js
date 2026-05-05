import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Available from "./pages/Available";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* Login — sans sidebar */}
        <Route
  path="/login"
  element={
    isLoggedIn
      ? <Navigate to="/" replace />
      : (
        <div className="login-page-wrapper">
          <Login onLogin={() => setIsLoggedIn(true)} />
        </div>
      )
  }
/>

        {/* Toutes les autres pages — avec sidebar */}
        <Route
          path="/*"
          element={
            !isLoggedIn
              ? <Navigate to="/login" replace />
              : (
                <div className="app-layout">
                  <Sidebar />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/library" element={<Library />} />
                      <Route path="/available" element={<Available />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import YourEvent from "./pages/YourEvent";
import NotFound from "./pages/NotFound";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PublicRoute>
              <Profile />
            </PublicRoute>
          }
        />
        <Route
          path="/event"
          element={
            <PublicRoute>
              <YourEvent />
            </PublicRoute>
          }
        />
        <Route path="/not-found" element={<NotFound />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

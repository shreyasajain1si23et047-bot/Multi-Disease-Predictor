import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/Index";
import SymptomChecker from "@/pages/SymptomChecker";
import MultiDisease from "@/pages/MultiDisease";
import HospitalLocator from "@/pages/HospitalLocator";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/index"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/symptom-checker"
        element={
          <ProtectedRoute>
            <SymptomChecker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/multi-disease"
        element={
          <ProtectedRoute>
            <MultiDisease />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital-locator"
        element={
          <ProtectedRoute>
            <HospitalLocator />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;

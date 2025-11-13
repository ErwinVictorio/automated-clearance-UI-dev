// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = localStorage.getItem("token"); // or from your auth context/state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

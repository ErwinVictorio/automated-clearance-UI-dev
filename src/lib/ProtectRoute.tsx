// src/lib/ProtectRoute.tsx
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "@/lib/axiosClient";

interface RouteProps {
  children: JSX.Element;
  AllowedRoute: number[];
}

export default function ProtectRoute({ children, AllowedRoute }: RouteProps) {
  const [role, setRole] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await axiosClient.get("/api/user", {
          withCredentials: true,
        });
        setRole(Number(res.data.role));
      } catch (error) {
        setRole(null);
      }
      setLoading(false);
    }
    check();
  }, []);

  if (loading) return <div>Plase Wait...</div>;

  // Not logged in
  if (role === null) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (!AllowedRoute.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

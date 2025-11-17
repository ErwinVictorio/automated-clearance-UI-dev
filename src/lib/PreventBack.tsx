// src/lib/PublicRoute.tsx
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "@/lib/axiosClient";

interface Props {
  children: JSX.Element;
}

export default function PublicRoute({ children }: Props) {
  const [role, setRole] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      try {
        const res = await axiosClient.get("/api/user", {
          withCredentials: true,
        });
        setRole(Number(res.data.role)); // logged in
      } catch (error) {
        setRole(null); // not logged in
      }
      setLoading(false);
    }

    check();
  }, [role]);

  if (loading) return <div>Loading...</div>;

  // Logged in → redirect to dashboard
  if (role !== null) {
    switch (role) {
      case 0: return <Navigate to="/admin-dashboard" replace />;
      case 1: return <Navigate to="/teacher-portal" replace />;
      case 2: return <Navigate to="/student-portal" replace />;
      default: return <Navigate to="/" replace />;
    }
  }

  return children;
}

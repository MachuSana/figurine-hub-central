
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

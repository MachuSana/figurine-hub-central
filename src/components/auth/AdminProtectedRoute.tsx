
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      setShouldRedirect(true);
    }
  }, [user, isAdmin, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
};

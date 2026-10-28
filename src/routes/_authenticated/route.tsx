import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@/lib/router";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader } from "@/components/common/Loader";
import { useSettings } from "@/lib/queries";

export function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: settings } = useSettings();

  useEffect(() => {
    if (!loading && !user) navigate("/login", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (settings) document.documentElement.classList.toggle("dark", settings.dark_mode);
  }, [settings]);

  if (loading || !user) return <div className="flex min-h-screen items-center justify-center"><Loader label="Checking your session…" /></div>;
  return <AppLayout>{children}</AppLayout>;
}

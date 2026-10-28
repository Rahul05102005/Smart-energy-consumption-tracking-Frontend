import { Component, type ReactNode } from "react";
import { useLocation, useNavigate } from "@/lib/router";
import { Landing } from "@/routes/index";
import { LoginPage } from "@/routes/login";
import { RegisterPage } from "@/routes/register";
import { ForgotPasswordPage } from "@/routes/forgot-password";
import { ResetPasswordPage } from "@/routes/reset-password";
import { DashboardPage } from "@/routes/_authenticated/dashboard";
import { AppliancesPage } from "@/routes/_authenticated/appliances";
import { ReportsPage } from "@/routes/_authenticated/reports";
import { RecommendationsPage } from "@/routes/_authenticated/recommendations";
import { ProfilePage } from "@/routes/_authenticated/profile";
import { SettingsPage } from "@/routes/_authenticated/settings";
import { SimulatorPage } from "@/routes/_authenticated/simulator";
import { UpgradePlannerPage } from "@/routes/_authenticated/upgrade-planner";
import { ChallengesPage } from "@/routes/_authenticated/challenges";
import { AnomaliesPage } from "@/routes/_authenticated/anomalies";
import { BillForecastPage } from "@/routes/_authenticated/forecast";
import { EnergyCalendarPage } from "@/routes/_authenticated/calendar";
import { AuthenticatedLayout } from "@/routes/_authenticated/route";
import { Link } from "@/lib/router";

const publicPages: Record<string, () => ReactNode> = {
  "/": Landing,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/forgot-password": ForgotPasswordPage,
  "/reset-password": ResetPasswordPage,
};

const privatePages: Record<string, () => ReactNode> = {
  "/dashboard": DashboardPage,
  "/appliances": AppliancesPage,
  "/reports": ReportsPage,
  "/recommendations": RecommendationsPage,
  "/profile": ProfilePage,
  "/settings": SettingsPage,
  "/simulator": SimulatorPage,
  "/upgrade-planner": UpgradePlannerPage,
  "/challenges": ChallengesPage,
  "/anomalies": AnomaliesPage,
  "/forecast": BillForecastPage,
  "/calendar": EnergyCalendarPage,
};

function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background text-center text-foreground">
    <h1 className="text-6xl font-bold">404</h1><p>Page not found.</p><Link to="/" className="text-primary underline">Go home</Link>
  </main>;
}

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) return <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground"><h1 className="text-xl font-semibold">This page didn't load</h1><p>Try refreshing the page.</p><button className="rounded-md bg-primary px-4 py-2 text-primary-foreground" onClick={() => window.location.reload()}>Refresh</button></main>;
    return this.props.children;
  }
}

export function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (pathname === "/bill-forecast") { navigate("/forecast", { replace: true }); return null; }
  const PublicPage = publicPages[pathname];
  if (PublicPage) return <AppErrorBoundary><PublicPage /></AppErrorBoundary>;
  const PrivatePage = privatePages[pathname];
  if (PrivatePage) return <AppErrorBoundary><AuthenticatedLayout><PrivatePage /></AuthenticatedLayout></AppErrorBoundary>;
  return <NotFound />;
}

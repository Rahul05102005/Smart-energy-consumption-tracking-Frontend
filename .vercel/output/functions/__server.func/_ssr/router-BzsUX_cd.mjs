import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { L as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-Cn1UpFHU.js
var API_BASE = "http://localhost:5000".trim().replace(/\/$/, "");
var TOKEN_KEY = "energytrack:token";
var USER_KEY = "energytrack:user";
function getToken() {
	return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY);
}
function getStoredUser() {
	if (typeof window === "undefined") return null;
	try {
		const value = window.localStorage.getItem(USER_KEY);
		return value ? JSON.parse(value) : null;
	} catch {
		return null;
	}
}
function saveSession(token, user) {
	window.localStorage.setItem(TOKEN_KEY, token);
	window.localStorage.setItem(USER_KEY, JSON.stringify(user));
	window.dispatchEvent(new Event("energytrack:auth"));
}
function cacheUser(user) {
	window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function saveStoredUser(user) {
	cacheUser(user);
	window.dispatchEvent(new Event("energytrack:auth"));
}
function clearSession() {
	window.localStorage.removeItem(TOKEN_KEY);
	window.localStorage.removeItem(USER_KEY);
	window.dispatchEvent(new Event("energytrack:auth"));
}
async function api(path, options = {}) {
	const token = getToken();
	const response = await fetch(`${API_BASE}/api${path}`, {
		...options,
		headers: {
			...options.body ? { "Content-Type": "application/json" } : {},
			...token ? { Authorization: `Bearer ${token}` } : {},
			...options.headers
		}
	});
	if (!response.ok) {
		const payload = await response.json().catch(() => ({}));
		throw Object.assign(new Error(payload.message || `Request failed (${response.status})`), { status: response.status });
	}
	if (response.status === 204) return void 0;
	return response.json();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BzsUX_cd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CvN1f0Nl.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var AuthContext = (0, import_react.createContext)({
	user: null,
	session: null,
	loading: true,
	signOut: async () => {}
});
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const load = async () => {
			const token = getToken();
			if (!token) {
				if (alive) {
					setUser(null);
					setSession(null);
					setLoading(false);
				}
				return;
			}
			const cached = getStoredUser();
			if (cached && alive) {
				setUser(cached);
				setSession({ access_token: token });
			}
			try {
				const data = await api("/auth/me");
				if (alive) {
					cacheUser(data.user);
					setUser(data.user);
					setSession({ access_token: token });
				}
			} catch {
				clearSession();
				if (alive) {
					setUser(null);
					setSession(null);
				}
			} finally {
				if (alive) setLoading(false);
			}
		};
		const changed = () => {
			setLoading(true);
			load();
		};
		load();
		window.addEventListener("energytrack:auth", changed);
		window.addEventListener("storage", changed);
		return () => {
			alive = false;
			window.removeEventListener("energytrack:auth", changed);
			window.removeEventListener("storage", changed);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			session,
			loading,
			signOut: async () => {
				clearSession();
				setUser(null);
				setSession(null);
			}
		},
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "EnergyTrack — Smart Energy Tracking Dashboard" },
			{
				name: "description",
				content: "Track household appliance energy use, estimate bills and get personalised saving tips — no hardware required."
			},
			{
				name: "author",
				content: "EnergyTrack"
			},
			{
				property: "og:title",
				content: "EnergyTrack — Smart Energy Tracking Dashboard"
			},
			{
				property: "og:description",
				content: "Software-only energy consumption tracking and optimization for households."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$17 = () => import("./routes-CgM7SPAz.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "EnergyTrack | Smart Energy Consumption Dashboard" },
		{
			name: "description",
			content: "Track appliance-wise electricity use, estimate monthly bills and get personalised saving tips — 100% software, no hardware."
		},
		{
			property: "og:title",
			content: "EnergyTrack | Smart Energy Consumption Dashboard"
		},
		{
			property: "og:description",
			content: "Calculate kWh, compare appliances, export reports and cut your electricity bill."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./route-60f_b83K.mjs");
var Route$17 = createFileRoute("/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
/** ProtectedRoute equivalent: redirects unauthenticated visitors to /login. */
var Route$16 = createFileRoute("/bill-forecast")({ beforeLoad: () => {
	throw redirect({ to: "/forecast" });
} });
var $$splitComponentImporter$15 = () => import("./forgot-password-Bf7cu5Xc.mjs");
var Route$15 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: "Reset Password | EnergyTrack" },
		{
			name: "description",
			content: "Request a password reset link for your EnergyTrack account."
		},
		{
			property: "og:title",
			content: "Reset Password | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Recover access to your energy dashboard."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./login-3A0RZfzn.mjs");
var Route$14 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Login | EnergyTrack Energy Dashboard" },
		{
			name: "description",
			content: "Sign in to track appliance energy use, bills and savings on EnergyTrack."
		},
		{
			property: "og:title",
			content: "Login | EnergyTrack Energy Dashboard"
		},
		{
			property: "og:description",
			content: "Secure sign in to your household energy dashboard."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./register-iZfy3UpR.mjs");
var Route$13 = createFileRoute("/register")({
	head: () => ({ meta: [
		{ title: "Create Account | EnergyTrack" },
		{
			name: "description",
			content: "Create a free EnergyTrack account to calculate appliance energy use and bills."
		},
		{
			property: "og:title",
			content: "Create Account | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Start tracking household energy consumption in minutes."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./reset-password-CwnSjWE5.mjs");
var Route$12 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Set New Password | EnergyTrack" },
		{
			name: "description",
			content: "Choose a new password for your EnergyTrack account."
		},
		{
			property: "og:title",
			content: "Set New Password | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Complete your password reset securely."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./anomalies-DxWas8RC.mjs");
var Route$11 = createFileRoute("/_authenticated/anomalies")({
	head: () => ({ meta: [{ title: "Usage Anomalies | EnergyTrack" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./appliances-DV-tPirO.mjs");
var Route$10 = createFileRoute("/_authenticated/appliances")({
	head: () => ({ meta: [
		{ title: "Appliances | EnergyTrack" },
		{
			name: "description",
			content: "Add, edit, search and filter household appliances and their energy usage."
		},
		{
			property: "og:title",
			content: "Appliances | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Full CRUD management of your appliance list."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./calendar-DXNRVRVP.mjs");
var Route$9 = createFileRoute("/_authenticated/calendar")({
	validateSearch: objectType({ date: stringType().optional() }),
	head: () => ({ meta: [{ title: "Energy Usage Calendar | EnergyTrack" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./challenges-CsI70sMN.mjs");
var Route$8 = createFileRoute("/_authenticated/challenges")({
	head: () => ({ meta: [{ title: "Energy Saving Challenges | EnergyTrack" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./dashboard-hpG-3LC7.mjs");
var Route$7 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard | EnergyTrack" },
		{
			name: "description",
			content: "Live overview of household energy consumption, bills and appliance trends."
		},
		{
			property: "og:title",
			content: "Dashboard | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Summary cards, charts and recent appliance activity."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./forecast-D51Zag6q.mjs");
var Route$6 = createFileRoute("/_authenticated/forecast")({
	head: () => ({ meta: [{ title: "Bill Forecast | EnergyTrack" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./profile-BgrvGv5B.mjs");
var Route$5 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Profile | EnergyTrack" },
		{
			name: "description",
			content: "View account details, edit your profile and change your password."
		},
		{
			property: "og:title",
			content: "Profile | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Manage your EnergyTrack account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./recommendations-By9MH1p1.mjs");
var Route$4 = createFileRoute("/_authenticated/recommendations")({
	head: () => ({ meta: [
		{ title: "Recommendations | EnergyTrack" },
		{
			name: "description",
			content: "Personalised energy-saving recommendations based on your appliance usage."
		},
		{
			property: "og:title",
			content: "Recommendations | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Actionable tips that adapt to how you actually use energy."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./reports-CbE7HZnK.mjs");
var Route$3 = createFileRoute("/_authenticated/reports")({
	head: () => ({ meta: [
		{ title: "Reports | EnergyTrack" },
		{
			name: "description",
			content: "Daily, weekly and monthly energy reports with PDF and CSV export."
		},
		{
			property: "og:title",
			content: "Reports | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Download appliance-wise consumption and bill reports."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-CSUGwlk6.mjs");
var Route$2 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "Settings | EnergyTrack" },
		{
			name: "description",
			content: "Configure currency, electricity tariff, dark mode and notifications."
		},
		{
			property: "og:title",
			content: "Settings | EnergyTrack"
		},
		{
			property: "og:description",
			content: "Personalise how EnergyTrack calculates and displays your data."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./simulator-CrPv47PQ.mjs");
var Route$1 = createFileRoute("/_authenticated/simulator")({
	head: () => ({ meta: [{ title: "What-If Simulator | EnergyTrack" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./upgrade-planner-BvFefBBm.mjs");
var Route = createFileRoute("/_authenticated/upgrade-planner")({
	head: () => ({ meta: [{ title: "Upgrade Planner | EnergyTrack" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRoute = Route$17.update({
	id: "/_authenticated",
	getParentRoute: () => Route$19
});
var BillForecastRoute = Route$16.update({
	id: "/bill-forecast",
	path: "/bill-forecast",
	getParentRoute: () => Route$19
});
var ForgotPasswordRoute = Route$15.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$14.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var RegisterRoute = Route$13.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$19
});
var ResetPasswordRoute = Route$12.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$19
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAnomaliesRoute: Route$11.update({
		id: "/anomalies",
		path: "/anomalies",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedAppliancesRoute: Route$10.update({
		id: "/appliances",
		path: "/appliances",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedCalendarRoute: Route$9.update({
		id: "/calendar",
		path: "/calendar",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedChallengesRoute: Route$8.update({
		id: "/challenges",
		path: "/challenges",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardRoute: Route$7.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedForecastRoute: Route$6.update({
		id: "/forecast",
		path: "/forecast",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedProfileRoute: Route$5.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedRecommendationsRoute: Route$4.update({
		id: "/recommendations",
		path: "/recommendations",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedReportsRoute: Route$3.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedSettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedSimulatorRoute: Route$1.update({
		id: "/simulator",
		path: "/simulator",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedUpgradePlannerRoute: Route.update({
		id: "/upgrade-planner",
		path: "/upgrade-planner",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	BillForecastRoute,
	ForgotPasswordRoute,
	LoginRoute,
	RegisterRoute,
	ResetPasswordRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { saveSession as a, api as i, Route$9 as n, saveStoredUser as o, useAuth as r, router_exports as t };

import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as useAppliances, d as useSettings, n as Loader, r as queryErrorMessage, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { _ as summarize, d as formatCurrency, f as formatKwh, s as buildStats } from "./energy-ChK0WDdG.mjs";
import { T as FiTarget, d as FiDollarSign, t as FiActivity } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forecast-D51Zag6q.js
var import_jsx_runtime = require_jsx_runtime();
function BillForecastPage() {
	const applianceQuery = useAppliances();
	const settingsQuery = useSettings();
	const settings = settingsQuery.data;
	const appliances = applianceQuery.data ?? [];
	if (applianceQuery.isLoading || settingsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Calculating your bill estimate…" });
	if (applianceQuery.isError || settingsQuery.isError) {
		const failed = settingsQuery.isError ? {
			error: settingsQuery.error,
			resource: "settings"
		} : {
			error: applianceQuery.error,
			resource: "appliances"
		};
		console.error(`Could not load ${failed.resource}`, failed.error);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Could not calculate bill forecast",
			description: queryErrorMessage(failed.error, failed.resource)
		});
	}
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading billing settings…" });
	if (!appliances.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Not enough data available",
		description: "Add appliances and usage details to estimate a monthly bill."
	});
	const summary = summarize(buildStats(appliances, settings.tariff), settings.tariff);
	const budget = settings.monthly_budget ?? 0;
	const ratio = budget > 0 ? summary.estimatedBill / budget : 0;
	const status = budget <= 0 ? "Budget not set" : ratio > 1 ? "Budget Exceeded" : ratio >= .8 ? "Near Limit" : "Within Budget";
	const difference = summary.estimatedBill - budget;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Bill Forecast"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Estimated from your saved appliance usage patterns and tariff. This is not a meter reading or an exact electricity bill."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Current estimated energy",
						value: formatKwh(summary.totalMonthly),
						hint: "Monthly appliance estimate",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiActivity, {}),
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Current estimated bill",
						value: formatCurrency(summary.estimatedBill, settings.currency),
						hint: "From saved usage and tariff",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Projected monthly bill",
						value: formatCurrency(summary.estimatedBill, settings.currency),
						hint: `${formatCurrency(settings.tariff, settings.currency)} per kWh`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly budget",
						value: budget > 0 ? formatCurrency(budget, settings.currency) : "Not set",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTarget, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
				title: "Budget outlook",
				description: "Compares your pattern-based monthly estimate with the budget saved in Settings.",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: budget > 0 && ratio > 1 ? "destructive" : ratio >= .8 && budget > 0 ? "default" : "secondary",
							children: status
						}), budget > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: difference > 0 ? "text-sm font-semibold text-destructive" : "text-sm font-medium text-success",
							children: [difference > 0 ? "Projected " : "Under budget by ", formatCurrency(Math.abs(difference), settings.currency)]
						})]
					}),
					budget > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-2 overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full rounded-full ${ratio > 1 ? "bg-destructive" : ratio >= .8 ? "bg-warning" : "bg-success"}`,
							style: { width: `${Math.min(100, ratio * 100)}%` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [Math.round(ratio * 100), "% of monthly budget used"]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Set a monthly budget in Settings to see whether your estimate is within limits."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "The forecast uses the existing power × usage × quantity calculation and current tariff. Actual bills can differ with real usage, billing periods and provider charges."
					})
				]
			})
		]
	});
}
//#endregion
export { BillForecastPage as component };

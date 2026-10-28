import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as useAppliances, d as useSettings, f as useUsageHistory, n as Loader, r as queryErrorMessage, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { d as formatCurrency, f as formatKwh, r as analyzeUsageAnomaly } from "./energy-ChK0WDdG.mjs";
import { n as FiAlertTriangle, t as FiActivity } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anomalies-DxWas8RC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnomaliesPage() {
	const applianceQuery = useAppliances();
	const settingsQuery = useSettings();
	const historyQuery = useUsageHistory();
	const appliances = (0, import_react.useMemo)(() => applianceQuery.data ?? [], [applianceQuery.data]);
	const history = (0, import_react.useMemo)(() => historyQuery.data ?? [], [historyQuery.data]);
	const settings = settingsQuery.data;
	const results = (0, import_react.useMemo)(() => settings ? appliances.map((appliance) => analyzeUsageAnomaly(appliance, history, settings.tariff)).filter((item) => item !== null) : [], [
		appliances,
		history,
		settings
	]);
	const sufficientCount = (0, import_react.useMemo)(() => appliances.filter((appliance) => history.filter((item) => item.appliance_id === appliance.id).length >= 2).length, [appliances, history]);
	if (applianceQuery.isLoading || settingsQuery.isLoading || historyQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Reviewing saved usage changes…" });
	if (applianceQuery.isError || settingsQuery.isError || historyQuery.isError) {
		const failed = historyQuery.isError ? {
			error: historyQuery.error,
			resource: "usage history"
		} : settingsQuery.isError ? {
			error: settingsQuery.error,
			resource: "settings"
		} : {
			error: applianceQuery.error,
			resource: "appliances"
		};
		console.error(`Could not load ${failed.resource}`, failed.error);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Could not analyze appliance usage",
			description: queryErrorMessage(failed.error, failed.resource)
		});
	}
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading tariff…" });
	if (!appliances.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No appliances available",
		description: "Add appliance details before checking for unusual changes."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Usage Anomaly Detector"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Compares current estimated monthly use with saved versions of your appliance settings. This is not real-time monitoring."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: "Detected changes",
				value: String(results.length),
				hint: "Based on your saved usage history",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAlertTriangle, {}),
				tone: results.length ? "warning" : "success"
			}),
			!history.length || !sufficientCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Building a personal baseline",
				description: "History is captured when appliance power, quantity, schedule or usage hours change.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiActivity, { className: "mt-0.5 size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Not enough historical data to detect anomalies yet. At least two saved previous usage versions are needed for an appliance; future edits will build that history automatically."
					})]
				})
			}) : null,
			results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: results.map((result) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
					title: result.appliance.appliance_name,
					description: "Unusual increase compared with the average of up to six saved versions.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: result.severity === "high" ? "destructive" : result.severity === "medium" ? "default" : "secondary",
								children: [result.severity, " severity"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-semibold text-destructive",
								children: [
									"+",
									result.increasePercent.toFixed(1),
									"%"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Expected monthly use"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: formatKwh(result.expectedMonthlyKwh)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Current estimated use"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: formatKwh(result.currentMonthlyKwh)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Increase"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: ["+", formatKwh(result.increaseKwh)]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Additional estimated cost"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: formatCurrency(result.additionalCost, settings.currency)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 rounded-lg bg-muted/60 p-3 text-sm",
							children: [
								result.appliance.appliance_name,
								" consumption is approximately",
								" ",
								result.increasePercent.toFixed(0),
								"% above its saved baseline. Review its usage hours or schedule."
							]
						})
					]
				}, result.appliance.id))
			}) : sufficientCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No unusual increases found",
				description: "Current estimates are within 20% of the saved appliance baselines."
			}) : null
		]
	});
}
//#endregion
export { AnomaliesPage as component };

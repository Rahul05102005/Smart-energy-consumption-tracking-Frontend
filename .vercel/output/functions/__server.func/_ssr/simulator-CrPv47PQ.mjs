import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as useAppliances, d as useSettings, n as Loader, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { d as formatCurrency, f as formatKwh, g as scheduleDurationHours, i as applianceMonthlyConsumption, m as monthlyConsumptionForApplianceHours } from "./energy-ChK0WDdG.mjs";
import { A as FiZap, d as FiDollarSign, t as FiActivity } from "../_libs/react-icons.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/simulator-CrPv47PQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SimulatorPage() {
	const appliancesQuery = useAppliances();
	const settingsQuery = useSettings();
	const appliances = (0, import_react.useMemo)(() => appliancesQuery.data ?? [], [appliancesQuery.data]);
	const settings = settingsQuery.data;
	const [applianceId, setApplianceId] = (0, import_react.useState)("");
	const [hours, setHours] = (0, import_react.useState)("0");
	(0, import_react.useEffect)(() => {
		if (!appliances.length) return;
		const selected = appliances.find((item) => item.id === applianceId) ?? appliances[0];
		if (selected.id !== applianceId) setApplianceId(selected.id);
		setHours(String(selected.usage_mode === "schedule" && selected.schedule ? scheduleDurationHours(selected.schedule) : selected.daily_usage_hours));
	}, [appliances, applianceId]);
	const selected = appliances.find((item) => item.id === applianceId);
	const simulatedHours = Number(hours);
	const result = (0, import_react.useMemo)(() => {
		if (!selected || !Number.isFinite(simulatedHours)) return null;
		const currentKwh = applianceMonthlyConsumption(selected);
		const simulatedKwh = monthlyConsumptionForApplianceHours(selected, simulatedHours);
		const tariff = settings?.tariff ?? 0;
		return {
			currentKwh,
			simulatedKwh,
			energySaved: currentKwh - simulatedKwh,
			currentCost: currentKwh * tariff,
			simulatedCost: simulatedKwh * tariff,
			moneySaved: (currentKwh - simulatedKwh) * tariff
		};
	}, [
		selected,
		simulatedHours,
		settings?.tariff
	]);
	if (appliancesQuery.isLoading || settingsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading your appliances…" });
	if (appliancesQuery.isError || settingsQuery.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Could not load simulator",
		description: "Refresh the page and try again."
	});
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading settings…" });
	if (!appliances.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "Add an appliance first",
		description: "The simulator uses your saved appliance data and never changes it."
	});
	if (!selected || !result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Preparing simulation…" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "What-If Energy Simulator"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Try a different daily duration and see the estimated monthly impact. Your appliance stays unchanged."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
				title: "Adjust one appliance",
				description: "Current appliance data is read from your account. Simulation changes are temporary.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Appliance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: selected.id,
							onValueChange: setApplianceId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: appliances.map((appliance) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: appliance.id,
								children: appliance.appliance_name
							}, appliance.id)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "simulated-hours",
								children: "Simulated hours per scheduled day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "simulated-hours",
									type: "number",
									min: 0,
									max: 24,
									step: "0.5",
									value: hours,
									onChange: (event) => setHours(event.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-sm text-muted-foreground",
									children: "hours"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Simulated daily hours",
								className: "w-full accent-primary",
								type: "range",
								min: 0,
								max: 24,
								step: .5,
								value: Math.max(0, Math.min(24, simulatedHours || 0)),
								onChange: (event) => setHours(event.target.value)
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: [
						selected.power_rating,
						" W · quantity ",
						selected.quantity,
						selected.usage_mode === "schedule" && selected.schedule ? ` · ${selected.schedule.type} schedule, ${selected.schedule.startTime}–${selected.schedule.endTime}` : " · manual usage"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Current monthly use",
						value: formatKwh(result.currentKwh),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Simulated monthly use",
						value: formatKwh(result.simulatedKwh),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiActivity, {}),
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Energy saved",
						value: formatKwh(result.energySaved),
						hint: result.energySaved >= 0 ? "Reduction at this setting" : "Usage would increase",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiActivity, {}),
						tone: result.energySaved >= 0 ? "success" : "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Current estimated cost",
						value: formatCurrency(result.currentCost, settings.currency),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Simulated estimated cost",
						value: formatCurrency(result.simulatedCost, settings.currency),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Estimated money saved",
						value: formatCurrency(result.moneySaved, settings.currency),
						hint: result.moneySaved >= 0 ? "Per month" : "Additional monthly cost",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
						tone: result.moneySaved >= 0 ? "success" : "warning"
					})
				]
			})
		]
	});
}
//#endregion
export { SimulatorPage as component };

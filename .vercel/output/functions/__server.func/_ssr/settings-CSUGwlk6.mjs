import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as useSettings, n as Loader, r as queryErrorMessage, t as EmptyState, u as useSaveSettings } from "./queries-BwKUwAQ9.mjs";
import { t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { n as CURRENCIES } from "./energy-ChK0WDdG.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CSUGwlk6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	const settingsQuery = useSettings();
	const { data: settings, isLoading } = settingsQuery;
	const save = useSaveSettings();
	const [tariff, setTariff] = (0, import_react.useState)("");
	const [monthlyBudget, setMonthlyBudget] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (settings) {
			setTariff(String(settings.tariff));
			setMonthlyBudget(String(settings.monthly_budget ?? 0));
		}
	}, [settings]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading settings…" });
	if (settingsQuery.isError) {
		console.error("Could not load settings", settingsQuery.error);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Could not load settings",
			description: queryErrorMessage(settingsQuery.error, "settings")
		});
	}
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading settings…" });
	async function persist(patch, successMessage = "Settings saved") {
		try {
			await save.mutateAsync(patch);
			toast.success(successMessage);
		} catch (error) {
			console.error("Could not save settings", error);
			toast.error(queryErrorMessage(error, "settings"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Tariff and preferences used across every calculation."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Billing",
				description: "Used for bill estimates and your monthly spending alert",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: settings.currency,
								onValueChange: (v) => void persist({ currency: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.entries(CURRENCIES).map(([code, symbol]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: code,
									children: [
										code,
										" (",
										symbol,
										")"
									]
								}, code)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "monthly_budget",
									children: [
										"Monthly energy budget (",
										settings.currency,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "monthly_budget",
										type: "number",
										min: 0,
										step: "1",
										value: monthlyBudget,
										onChange: (e) => setMonthlyBudget(e.target.value)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => {
											const value = Number(monthlyBudget);
											if (!monthlyBudget.trim() || !Number.isFinite(value) || value < 0) return toast.error("Budget must be zero or more");
											persist({ monthly_budget: value }, "Monthly energy budget saved successfully.");
										},
										children: "Save"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Set to 0 to turn off budget tracking."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "tariff",
								children: "Electricity tariff (per kWh)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "tariff",
									type: "number",
									min: 0,
									step: "0.01",
									value: tariff,
									onChange: (e) => setTariff(e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										const value = Number(tariff);
										if (!tariff.trim() || !Number.isFinite(value) || value < 0) return toast.error("Tariff must be a positive number");
										persist({ tariff: value });
									},
									children: "Save"
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Preferences",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Dark mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Switch the dashboard to a dark theme."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.dark_mode,
							onCheckedChange: (v) => void persist({ dark_mode: v })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-foreground",
							children: "Notifications"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Receive energy-saving alerts and monthly summaries."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: settings.notifications,
							onCheckedChange: (v) => void persist({ notifications: v })
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { SettingsPage as component };

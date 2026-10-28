import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as useAppliances, d as useSettings, n as Loader, r as queryErrorMessage, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { d as formatCurrency, f as formatKwh, g as scheduleDurationHours, i as applianceMonthlyConsumption, u as estimateBill, v as upgradeProjection } from "./energy-ChK0WDdG.mjs";
import { A as FiZap, D as FiTrendingDown, d as FiDollarSign } from "../_libs/react-icons.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upgrade-planner-BvFefBBm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UpgradePlannerPage() {
	const applianceQuery = useAppliances();
	const settingsQuery = useSettings();
	const appliances = (0, import_react.useMemo)(() => applianceQuery.data ?? [], [applianceQuery.data]);
	const settings = settingsQuery.data;
	const [applianceId, setApplianceId] = (0, import_react.useState)("");
	const [newName, setNewName] = (0, import_react.useState)("");
	const [newPower, setNewPower] = (0, import_react.useState)("");
	const [newHours, setNewHours] = (0, import_react.useState)("");
	const [newQuantity, setNewQuantity] = (0, import_react.useState)("");
	const [replacementCost, setReplacementCost] = (0, import_react.useState)("");
	const [years, setYears] = (0, import_react.useState)("3");
	(0, import_react.useEffect)(() => {
		if (!appliances.length) return;
		const current = appliances.find((item) => item.id === applianceId) ?? appliances[0];
		if (current.id !== applianceId) setApplianceId(current.id);
		setNewName("");
		setNewPower("");
		setReplacementCost("");
		setNewHours(String(current.usage_mode === "schedule" && current.schedule ? scheduleDurationHours(current.schedule) : current.daily_usage_hours));
		setNewQuantity(String(current.quantity));
	}, [appliances, applianceId]);
	const appliance = appliances.find((item) => item.id === applianceId);
	const parsed = {
		power: Number(newPower),
		hours: Number(newHours),
		quantity: Number(newQuantity),
		cost: Number(replacementCost)
	};
	const valid = !!appliance && !!settings && newName.trim().length >= 2 && newPower.trim() !== "" && Number.isFinite(parsed.power) && parsed.power > 0 && newHours.trim() !== "" && Number.isFinite(parsed.hours) && parsed.hours >= 0 && parsed.hours <= 24 && newQuantity.trim() !== "" && Number.isInteger(parsed.quantity) && parsed.quantity > 0 && replacementCost.trim() !== "" && Number.isFinite(parsed.cost) && parsed.cost >= 0 && [
		1,
		3,
		5
	].includes(Number(years));
	const projection = (0, import_react.useMemo)(() => valid && appliance && settings ? upgradeProjection(appliance, parsed.power, parsed.hours, parsed.quantity, parsed.cost, settings.tariff, Number(years)) : null, [
		valid,
		appliance,
		settings,
		parsed.power,
		parsed.hours,
		parsed.quantity,
		parsed.cost,
		years
	]);
	if (applianceQuery.isLoading || settingsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading appliance data…" });
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
			title: "Could not load upgrade planner",
			description: queryErrorMessage(failed.error, failed.resource)
		});
	}
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading billing settings…" });
	if (!appliances.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No appliances available",
		description: "Add an appliance before comparing an upgrade."
	});
	if (!appliance) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Preparing comparison…" });
	const currentHours = appliance.usage_mode === "schedule" && appliance.schedule ? scheduleDurationHours(appliance.schedule) : appliance.daily_usage_hours;
	const decision = projection?.paybackYears == null ? "No projected payback" : projection.paybackYears < 2 ? "Highly Recommended" : projection.paybackYears <= 5 ? "Recommended" : projection.paybackYears <= 8 ? "Consider Carefully" : "Low Financial Benefit";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Energy-Efficient Appliance Upgrade Planner"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Compare a proposed replacement with your current appliance. This is an estimate from the values you enter and does not change your appliance."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
				title: "Replacement details",
				description: "The current appliance values are read from your account; proposed values remain temporary.",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Current appliance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: appliance.id,
								onValueChange: setApplianceId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: appliances.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item.id,
									children: item.appliance_name
								}, item.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "replacement-name",
								children: "Proposed appliance name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "replacement-name",
								value: newName,
								onChange: (event) => setNewName(event.target.value),
								placeholder: "Efficient inverter AC"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "replacement-power",
									children: "Proposed power (W)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "replacement-power",
									type: "number",
									min: 1,
									value: newPower,
									onChange: (event) => setNewPower(event.target.value),
									placeholder: "Enter replacement watts"
								}),
								newPower && parsed.power <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: "Power must be greater than zero."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "replacement-hours",
									children: "Usage hours per scheduled day"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "replacement-hours",
									type: "number",
									min: 0,
									max: 24,
									step: "0.5",
									value: newHours,
									onChange: (event) => setNewHours(event.target.value)
								}),
								newHours && (parsed.hours < 0 || parsed.hours > 24) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: "Usage must be between 0 and 24 hours."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "replacement-quantity",
								children: "Replacement quantity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "replacement-quantity",
								type: "number",
								min: 1,
								step: 1,
								value: newQuantity,
								onChange: (event) => setNewQuantity(event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "replacement-cost",
									children: [
										"Purchase cost (",
										settings.currency,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "replacement-cost",
									type: "number",
									min: 0,
									step: "0.01",
									value: replacementCost,
									onChange: (event) => setReplacementCost(event.target.value),
									placeholder: "Enter purchase cost"
								}),
								replacementCost && parsed.cost < 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: "Cost cannot be negative."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Long-term horizon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: years,
								onValueChange: setYears,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
									1,
									3,
									5
								].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: String(value),
									children: [
										value,
										" ",
										value === 1 ? "year" : "years"
									]
								}, value)) })]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: appliance.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							appliance.power_rating,
							" W × ",
							currentHours,
							" h/day × ",
							appliance.quantity
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"· Existing monthly estimate: ",
							formatKwh(applianceMonthlyConsumption(appliance)),
							" at",
							" ",
							formatCurrency(settings.tariff, settings.currency),
							"/kWh"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Current estimated monthly cost:",
							" ",
							formatCurrency(estimateBill(applianceMonthlyConsumption(appliance), settings.tariff), settings.currency)
						] })
					]
				})]
			}),
			projection ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
					title: "Proposed replacement",
					description: "Estimated comparison using your entered replacement details.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: newName }),
							" · ",
							parsed.power,
							" W · ",
							parsed.hours,
							" hours/day · quantity",
							" ",
							parsed.quantity,
							" · ",
							formatCurrency(parsed.cost, settings.currency),
							" purchase cost"
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Current monthly energy",
							value: formatKwh(projection.currentMonthlyKwh),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Proposed monthly energy",
							value: formatKwh(projection.newMonthlyKwh),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {}),
							tone: "accent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Monthly energy saved",
							value: formatKwh(projection.energySaved),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrendingDown, {}),
							tone: projection.energySaved >= 0 ? "success" : "warning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Current monthly cost",
							value: formatCurrency(projection.currentMonthlyCost, settings.currency),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Proposed monthly cost",
							value: formatCurrency(projection.newMonthlyCost, settings.currency),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
							tone: "accent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Monthly money saved",
							value: formatCurrency(projection.monthlyMoneySaved, settings.currency),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
							tone: projection.monthlyMoneySaved >= 0 ? "success" : "warning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Annual money saved",
							value: formatCurrency(projection.annualMoneySaved, settings.currency),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Estimated payback",
							value: projection.paybackYears == null ? "No payback" : `${projection.paybackYears.toFixed(1)} years`,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrendingDown, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: `${years}-year net saving`,
							value: formatCurrency(projection.longTermNetSaving, settings.currency),
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
							tone: projection.longTermNetSaving >= 0 ? "success" : "warning"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
					title: "Decision guide",
					description: "A simple estimate based on your proposed replacement cost and energy use.",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: projection.paybackYears != null && projection.paybackYears < 5 ? "default" : "secondary",
						children: decision
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "This estimate assumes the tariff and usage pattern remain constant. It is not a guaranteed financial result."
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Enter replacement details",
				description: "Provide a replacement name, positive power rating, usage hours, quantity and purchase cost to see the estimated savings."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					disabled: true,
					children: "Simulation only · no changes saved"
				})
			})
		]
	});
}
//#endregion
export { UpgradePlannerPage as component };

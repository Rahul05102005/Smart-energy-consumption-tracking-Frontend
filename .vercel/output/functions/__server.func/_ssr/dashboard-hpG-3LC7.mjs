import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { r as useAuth } from "./router-BzsUX_cd.mjs";
import { a as useAppliances, c as useProfile, d as useSettings, n as Loader, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { _ as summarize, c as byCategory, d as formatCurrency, f as formatKwh, h as monthlyTrend, s as buildStats } from "./energy-ChK0WDdG.mjs";
import { A as FiZap, O as FiTrendingUp, d as FiDollarSign, i as FiAward, t as FiActivity, u as FiCpu } from "../_libs/react-icons.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { a as Chart, c as LineElement, d as PointElement, f as index, i as CategoryScale, l as LinearScale, m as plugin_tooltip, p as plugin_legend, r as BarElement, t as ArcElement } from "../_libs/chart.js.mjs";
import { i as Pie, n as Doughnut, r as Line, t as Bar } from "../_libs/react-chartjs-2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-hpG-3LC7.js
var import_jsx_runtime = require_jsx_runtime();
Chart.register(ArcElement, BarElement, CategoryScale, index, plugin_legend, LineElement, LinearScale, PointElement, plugin_tooltip);
/** Reads a design-system token so charts never hardcode colors. */
function token(name, fallback) {
	if (typeof window === "undefined") return fallback;
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
function chartPalette() {
	return [
		token("--chart-1", "#10b981"),
		token("--chart-2", "#3b82f6"),
		token("--chart-3", "#f59e0b"),
		token("--chart-4", "#06b6d4"),
		token("--chart-5", "#a855f7")
	];
}
var baseOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: { legend: { display: false } }
};
var legendOptions = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: { legend: {
		position: "bottom",
		labels: {
			boxWidth: 12,
			usePointStyle: true
		}
	} }
};
function ApplianceBarChart({ labels, values }) {
	const palette = chartPalette();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
		options: baseOptions,
		data: {
			labels,
			datasets: [{
				label: "kWh / month",
				data: values,
				backgroundColor: labels.map((_, i) => palette[i % palette.length]),
				borderRadius: 8,
				maxBarThickness: 44
			}]
		}
	});
}
function CategoryPieChart({ labels, values }) {
	const palette = chartPalette();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
		options: legendOptions,
		data: {
			labels,
			datasets: [{
				data: values,
				backgroundColor: labels.map((_, i) => palette[i % palette.length]),
				borderWidth: 0
			}]
		}
	});
}
function ShareDoughnutChart({ labels, values }) {
	const palette = chartPalette();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Doughnut, {
		options: {
			...legendOptions,
			cutout: "62%"
		},
		data: {
			labels,
			datasets: [{
				data: values,
				backgroundColor: labels.map((_, i) => palette[i % palette.length]),
				borderWidth: 0
			}]
		}
	});
}
function TrendLineChart({ labels, values }) {
	const palette = chartPalette();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		options: {
			...baseOptions,
			elements: { line: { tension: .4 } }
		},
		data: {
			labels,
			datasets: [{
				label: "kWh / month",
				data: values,
				borderColor: palette[0],
				backgroundColor: `color-mix(in oklab, ${palette[0]} 20%, transparent)`,
				fill: true,
				pointRadius: 3
			}]
		}
	});
}
function DashboardPage() {
	const { data: appliances, isLoading } = useAppliances();
	const { data: settings } = useSettings();
	const { data: profile } = useProfile();
	const { user } = useAuth();
	if (isLoading || !settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading your dashboard…" });
	const stats = buildStats(appliances ?? [], settings.tariff);
	const summary = summarize(stats, settings.tariff);
	const categories = byCategory(stats);
	const trend = monthlyTrend(stats);
	const top5 = [...stats].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption).slice(0, 5);
	const mostEfficient = [...stats].sort((a, b) => a.monthlyConsumption - b.monthlyConsumption)[0];
	const monthlyBudget = settings.monthly_budget ?? 0;
	const budgetPercent = monthlyBudget > 0 ? summary.estimatedBill / monthlyBudget * 100 : 0;
	const budgetStatus = monthlyBudget <= 0 ? "Budget not set" : budgetPercent > 100 ? "Budget Exceeded" : budgetPercent >= 80 ? "Near Budget Limit" : "Within Budget";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: [
				"Welcome back",
				profile?.name || user?.name ? `, ${(profile?.name || user?.name)?.split(" ")[0]}` : "",
				" 👋"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted-foreground",
			children: [
				"Here's how your household is consuming energy at",
				" ",
				formatCurrency(settings.tariff, settings.currency),
				" per kWh."
			]
		})] }), stats.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No appliances yet",
			description: "Add your first appliance from the Appliances page to see your consumption breakdown."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total appliances",
						value: String(summary.totalAppliances),
						hint: `${summary.totalUnits} units in total`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiCpu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Today's consumption",
						value: formatKwh(summary.totalDaily),
						hint: "Based on daily usage hours",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {}),
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly consumption",
						value: formatKwh(summary.totalMonthly),
						hint: "Daily × 30 days",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiActivity, {}),
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Estimated bill",
						value: formatCurrency(summary.estimatedBill, settings.currency),
						hint: "Monthly units × tariff",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Highest consuming",
						value: summary.highest?.appliance_name ?? "—",
						hint: summary.highest ? formatKwh(summary.highest.monthlyConsumption) + " / month" : void 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrendingUp, {}),
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Most efficient",
						value: mostEfficient?.appliance_name ?? "—",
						hint: mostEfficient ? formatKwh(mostEfficient.monthlyConsumption) + " / month" : void 0,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, {}),
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
						title: "Energy saving score",
						description: "Higher is better (0–100)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-extrabold text-primary",
								children: summary.savingScore
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: summary.savingScore,
								className: "h-2 flex-1"
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Monthly energy budget",
				description: "Estimated bill compared with your saved monthly budget",
				children: monthlyBudget > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Estimated bill:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatCurrency(summary.estimatedBill, settings.currency) })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: budgetPercent > 100 ? "destructive" : budgetPercent >= 80 ? "default" : "secondary",
								children: budgetStatus
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: Math.min(100, budgetPercent),
							className: "h-2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-between gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Budget: ",
								formatCurrency(monthlyBudget, settings.currency),
								" ·",
								" ",
								budgetPercent.toFixed(0),
								"% used"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: summary.estimatedBill > monthlyBudget ? "font-semibold text-destructive" : "",
								children: [summary.estimatedBill > monthlyBudget ? "Over by " : "Remaining ", formatCurrency(Math.abs(monthlyBudget - summary.estimatedBill), settings.currency)]
							})]
						}),
						summary.estimatedBill > monthlyBudget && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm font-medium text-destructive",
							children: "Your estimated bill is above your monthly budget."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Set a monthly budget in Settings to track your bill against a limit."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
						title: "Top appliances",
						description: "Monthly consumption (kWh)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplianceBarChart, {
								labels: top5.map((s) => s.appliance_name),
								values: top5.map((s) => Number(s.monthlyConsumption.toFixed(2)))
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
						title: "Category split",
						description: "Share of monthly consumption",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPieChart, {
								labels: categories.map((c) => c.category),
								values: categories.map((c) => Number(c.kwh.toFixed(2)))
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
						title: "Monthly usage trend",
						description: "Seasonally adjusted projection",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendLineChart, {
								labels: trend.map((t) => t.month),
								values: trend.map((t) => t.kwh)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
						title: "Appliance share",
						description: "Contribution to total load",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDoughnutChart, {
								labels: top5.map((s) => s.appliance_name),
								values: top5.map((s) => Number(s.sharePercent.toFixed(2)))
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Appliance comparison",
				description: "Monthly use, estimated cost and share of your total consumption",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Appliance" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Monthly kWh"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Estimated cost"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Share"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: [...stats].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption).map((s, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: index === 0 ? "bg-warning/5" : void 0,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "font-medium",
								children: [s.appliance_name, index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "ml-2",
									children: "Highest"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: s.monthlyConsumption.toFixed(2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: formatCurrency(s.estimatedBill, settings.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "text-right",
								children: [s.sharePercent.toFixed(1), "%"]
							})
						]
					}, s.id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Recent activity",
				description: "Most recently added appliances",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Appliance" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Watts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Usage pattern" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Daily"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Monthly"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Bill"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: stats.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: s.appliance_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: s.category
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: s.power_rating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.usage_mode === "schedule" && s.schedule ? `${s.schedule.type}: ${s.schedule.startTime}–${s.schedule.endTime}` : `${s.daily_usage_hours} h/day · Manual` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: s.dailyConsumption.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: s.monthlyConsumption.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: formatCurrency(s.estimatedBill, settings.currency)
						})
					] }, s.id)) })] })
				})
			})
		] })]
	});
}
//#endregion
export { DashboardPage as component };

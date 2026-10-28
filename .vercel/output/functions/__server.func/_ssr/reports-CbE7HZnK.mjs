import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAppliances, d as useSettings, n as Loader, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { _ as summarize, d as formatCurrency, f as formatKwh, s as buildStats } from "./energy-ChK0WDdG.mjs";
import { f as FiDownload, m as FiFileText } from "../_libs/react-icons.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-CbE7HZnK.js
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const { data: appliances, isLoading } = useAppliances();
	const { data: settings } = useSettings();
	if (isLoading || !settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Building your reports…" });
	const stats = buildStats(appliances ?? [], settings.tariff);
	const summary = summarize(stats, settings.tariff);
	const rows = stats.map((s) => [
		s.appliance_name,
		s.category,
		String(s.power_rating),
		String(s.daily_usage_hours),
		String(s.quantity),
		s.dailyConsumption.toFixed(2),
		(s.dailyConsumption * 7).toFixed(2),
		s.monthlyConsumption.toFixed(2),
		s.estimatedBill.toFixed(2)
	]);
	const head = [
		"Appliance",
		"Category",
		"Watts",
		"Hrs/day",
		"Qty",
		"kWh/day",
		"kWh/week",
		"kWh/month",
		"Bill"
	];
	function exportCsv() {
		const csv = [head, ...rows].map((r) => r.map((c) => `"${c.replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "energytrack-report.csv";
		link.click();
		URL.revokeObjectURL(url);
		toast.success("CSV downloaded");
	}
	async function exportPdf() {
		const [{ default: jsPDF }, autoTable] = await Promise.all([import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())), import("../_libs/jspdf-autotable.mjs").then((n) => n.t).then((m) => m.default)]);
		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text("EnergyTrack — Energy Consumption Report", 14, 18);
		doc.setFontSize(10);
		doc.text(`Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 14, 25);
		doc.text(`Monthly: ${summary.totalMonthly.toFixed(2)} kWh  |  Estimated bill: ${formatCurrency(summary.estimatedBill, settings.currency)}  |  Tariff: ${settings.tariff}/kWh`, 14, 31);
		autoTable(doc, {
			head: [head],
			body: rows,
			startY: 38,
			styles: { fontSize: 8 }
		});
		doc.save("energytrack-report.pdf");
		toast.success("PDF downloaded");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Reports"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Daily, weekly and monthly breakdowns of your consumption."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: exportCsv,
					disabled: stats.length === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDownload, { className: "mr-1" }), " CSV"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void exportPdf(),
					disabled: stats.length === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, { className: "mr-1" }), " PDF"]
				})]
			})]
		}), stats.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No data to report",
			description: "Add appliances first to generate reports."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Daily total",
						value: formatKwh(summary.totalDaily),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Weekly total",
						value: formatKwh(summary.totalDaily * 7),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {}),
						tone: "accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Monthly total",
						value: formatKwh(summary.totalMonthly),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {}),
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Average per appliance",
						value: formatKwh(summary.average),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {}),
						tone: "warning"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Highest consumption",
					value: summary.highest?.appliance_name ?? "—",
					hint: summary.highest ? formatKwh(summary.highest.monthlyConsumption) : void 0,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {}),
					tone: "warning"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Lowest consumption",
					value: summary.lowest?.appliance_name ?? "—",
					hint: summary.lowest ? formatKwh(summary.lowest.monthlyConsumption) : void 0,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiFileText, {}),
					tone: "success"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Detailed report",
				description: "Appliance-wise daily, weekly and monthly figures",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: head.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: h === "Appliance" || h === "Category" ? "" : "text-right",
						children: h
					}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: r.map((cell, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: i > 1 ? "text-right" : "",
						children: i === r.length - 1 ? formatCurrency(Number(cell), settings.currency) : cell
					}, i)) }, r[0])) })] })
				})
			})
		] })]
	});
}
//#endregion
export { ReportsPage as component };

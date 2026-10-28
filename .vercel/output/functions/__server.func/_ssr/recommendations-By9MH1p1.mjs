import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as api } from "./router-BzsUX_cd.mjs";
import { a as useAppliances, d as useSettings, n as Loader } from "./queries-BwKUwAQ9.mjs";
import { t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { f as formatKwh, p as generateRecommendations, s as buildStats } from "./energy-ChK0WDdG.mjs";
import { A as FiZap } from "../_libs/react-icons.mjs";
import { t as addNotification } from "./notifications-Doc2mZV7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recommendations-By9MH1p1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tone = {
	high: "destructive",
	medium: "default",
	low: "secondary"
};
function RecommendationsPage() {
	const { data: appliances, isLoading } = useAppliances();
	const { data: settings } = useSettings();
	const alerted = (0, import_react.useRef)(false);
	const lastSaved = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		if (alerted.current || !settings || !settings.notifications || !appliances?.length) return;
		const alertStats = buildStats(appliances, settings.tariff);
		const top = [...alertStats].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption)[0];
		if (!top) return;
		alerted.current = true;
		const tip = generateRecommendations(alertStats, settings.tariff, settings.currency).find((t) => t.priority === "high")?.message ?? "Reduce its daily runtime or shift it to off-peak hours to cut consumption.";
		const title = `High usage: ${top.appliance_name}`;
		const description = `${formatKwh(top.monthlyConsumption)}/month (${top.sharePercent.toFixed(0)}% of your load). ${tip}`;
		toast.warning(title, {
			description,
			duration: 3e3,
			closeButton: true
		});
		addNotification(title, description);
	}, [appliances, settings]);
	if (isLoading || !settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Analysing your usage…" });
	const stats = buildStats(appliances ?? [], settings.tariff);
	const tips = generateRecommendations(stats, settings.tariff, settings.currency);
	const signature = JSON.stringify(tips);
	(0, import_react.useEffect)(() => {
		if (lastSaved.current === signature) return;
		lastSaved.current = signature;
		api("/recommendations/sync", {
			method: "POST",
			body: JSON.stringify({ recommendations: tips })
		}).catch(() => {});
	}, [signature]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold text-foreground",
			children: "Recommendations"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Generated automatically from your appliance data."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
			title: "Your action list",
			description: `${tips.length} suggestions, highest impact first`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: [...tips].sort((a, b) => [
					"high",
					"medium",
					"low"
				].indexOf(a.priority) - [
					"high",
					"medium",
					"low"
				].indexOf(b.priority)).map((tip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3 rounded-xl border border-border p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-foreground",
							children: tip.message
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: tone[tip.priority],
							className: "mt-2 capitalize",
							children: [tip.priority, " priority"]
						})]
					})]
				}, tip.message))
			})
		})]
	});
}
//#endregion
export { RecommendationsPage as component };

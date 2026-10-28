import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as FiZap, C as FiShield, a as FiBarChart2, f as FiDownload, r as FiArrowRight, u as FiCpu, y as FiPieChart } from "../_libs/react-icons.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CgM7SPAz.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: FiCpu,
		title: "Appliance manager",
		text: "Add wattage, daily hours and quantity for every device you own."
	},
	{
		icon: FiZap,
		title: "Instant kWh maths",
		text: "Daily, monthly units and bill estimates using a configurable tariff."
	},
	{
		icon: FiPieChart,
		title: "Interactive charts",
		text: "Bar, pie, doughnut and 12-month trend visualisations."
	},
	{
		icon: FiBarChart2,
		title: "Smart recommendations",
		text: "Rule-based tips that adapt to your real usage pattern."
	},
	{
		icon: FiDownload,
		title: "PDF & CSV reports",
		text: "Download daily, weekly and monthly consumption reports."
	},
	{
		icon: FiShield,
		title: "Secure by design",
		text: "Authenticated accounts with row-level data isolation."
	}
];
var futureScope = [
	"IoT integration",
	"Smart meter integration",
	"Real-time monitoring",
	"AI consumption prediction",
	"Mobile application",
	"Voice assistant control"
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-primary grid size-9 place-items-center rounded-xl text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-bold",
						children: "EnergyTrack"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Login"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/register",
							children: "Get started"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-16 pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "gradient-hero shadow-elevated relative overflow-hidden rounded-3xl px-6 py-16 text-center text-primary-foreground sm:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur",
							children: "No sensors • No hardware • Pure software"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl",
							children: "Smart Energy Consumption Tracking & Optimization"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-2xl text-sm/6 opacity-90 sm:text-base",
							children: "Enter your appliance details once and get accurate kWh consumption, estimated bills, appliance comparisons and personalised recommendations to lower your electricity spend."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/register",
									children: ["Create free account ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiArrowRight, { className: "ml-1" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outline",
								className: "border-white/40 bg-white/10 hover:bg-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "I already have an account"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-white/10 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-white/10 blur-3xl" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 pb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold text-foreground",
					children: "Everything you need to cut your bill"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "glass animate-rise rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-xl bg-primary/12 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-semibold text-foreground",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: f.text
							})
						]
					}, f.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 pb-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-3xl p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-foreground",
							children: "Future scope"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Planned enhancements beyond the current software-only scope."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 flex flex-wrap gap-2",
							children: futureScope.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground",
								children: item
							}, item))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-5 py-6 text-center text-xs text-muted-foreground",
				children: "EnergyTrack — Smart Energy Consumption Tracking and Optimization Dashboard."
			})
		]
	});
}
//#endregion
export { Landing as component };

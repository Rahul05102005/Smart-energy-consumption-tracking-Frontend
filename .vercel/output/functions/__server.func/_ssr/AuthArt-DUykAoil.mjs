import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { A as FiZap, D as FiTrendingDown, t as FiActivity, y as FiPieChart } from "../_libs/react-icons.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthArt-DUykAoil.js
var import_jsx_runtime = require_jsx_runtime();
/** Left-side illustration panel shared by the login and register pages. */
function AuthArt({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "gradient-hero relative hidden overflow-hidden p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 place-items-center rounded-xl bg-white/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-bold",
					children: "EnergyTrack"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold leading-tight",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm/6 opacity-90",
						children: subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-3",
						children: [
							{
								icon: FiActivity,
								text: "Instant kWh calculation from watts × hours × quantity"
							},
							{
								icon: FiPieChart,
								text: "Appliance and category-wise interactive charts"
							},
							{
								icon: FiTrendingDown,
								text: "Personalised recommendations that cut your bill"
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl bg-white/12 px-4 py-3 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: item.text
							})]
						}, item.text))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs opacity-75",
				children: "100% software based — no meters, sensors or hardware needed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-28 -left-16 size-80 rounded-full bg-white/10 blur-3xl" })
		]
	});
}
//#endregion
export { AuthArt as t };

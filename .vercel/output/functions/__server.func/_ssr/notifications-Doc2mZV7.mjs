import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-Doc2mZV7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "energytrack:notifications";
var EVENT = "energytrack:notifications-changed";
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function write(list) {
	window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
	window.dispatchEvent(new Event(EVENT));
}
/** Append a notification to the local history (most recent first). */
function addNotification(title, description) {
	if (typeof window === "undefined") return;
	const list = read();
	write([{
		id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
		title,
		description,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	}, ...list]);
}
function clearNotifications() {
	write([]);
}
/** Reactive view of the stored notification history. */
function useNotifications() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const sync = () => setItems(read());
		sync();
		window.addEventListener(EVENT, sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener(EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return items;
}
//#endregion
export { clearNotifications as n, useNotifications as r, addNotification as t };

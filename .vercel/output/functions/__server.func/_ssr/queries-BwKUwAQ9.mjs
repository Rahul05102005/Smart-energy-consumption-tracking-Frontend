import { t as cn } from "./utils-C_uf36nf.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as api, o as saveStoredUser, r as useAuth } from "./router-BzsUX_cd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-BwKUwAQ9.js
var import_jsx_runtime = require_jsx_runtime();
/** Full-panel loading indicator. */
function Loader({ label = "Loading…", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-40 w-full flex-col items-center justify-center gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-8 animate-spin rounded-full border-2 border-primary/25 border-t-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		})]
	});
}
function EmptyState({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed border-border p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold text-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})]
	});
}
function queryErrorMessage(error, resource) {
	const e = error;
	if (e?.status === 401) return "Your session may have expired. Sign in again and retry.";
	if (/fetch|network|offline/i.test(e?.message || "")) return "Could not reach the data service. Check your connection and retry.";
	return e?.message || `Could not load your ${resource}. Check your connection and retry.`;
}
function useAppliances() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["appliances", user?.id],
		enabled: !!user,
		queryFn: () => api("/appliances")
	});
}
function useSettings() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["settings", user?.id],
		enabled: !!user,
		queryFn: () => api("/settings")
	});
}
function useProfile() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["profile", user?.id],
		enabled: !!user,
		queryFn: () => api("/profile")
	});
}
function useEnergyChallenges() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["energy-challenges", user?.id],
		enabled: !!user,
		queryFn: () => api("/challenges")
	});
}
function useUsageHistory() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["appliance-usage-history", user?.id],
		enabled: !!user,
		queryFn: () => api("/usage-history")
	});
}
function useEnergyChallengeMutations() {
	const qc = useQueryClient();
	const invalidate = () => qc.invalidateQueries({ queryKey: ["energy-challenges"] });
	return {
		create: useMutation({
			mutationFn: (input) => api("/challenges", {
				method: "POST",
				body: JSON.stringify(input)
			}),
			onSuccess: invalidate
		}),
		complete: useMutation({
			mutationFn: ({ id, completed_at }) => api(`/challenges/${id}/complete`, {
				method: "PATCH",
				body: JSON.stringify({ completed_at })
			}),
			onSuccess: invalidate
		}),
		remove: useMutation({
			mutationFn: (id) => api(`/challenges/${id}`, { method: "DELETE" }),
			onSuccess: invalidate
		})
	};
}
function useSaveSettings() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (patch) => api("/settings", {
			method: "PATCH",
			body: JSON.stringify(patch)
		}),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] })
	});
}
function useSaveProfile() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (patch) => api("/profile", {
			method: "PATCH",
			body: JSON.stringify(patch)
		}),
		onSuccess: (profile) => {
			saveStoredUser(profile);
			qc.invalidateQueries({ queryKey: ["profile"] });
		}
	});
}
function useApplianceMutations() {
	const qc = useQueryClient();
	const invalidate = () => qc.invalidateQueries({ queryKey: ["appliances"] });
	return {
		create: useMutation({
			mutationFn: (input) => api("/appliances", {
				method: "POST",
				body: JSON.stringify(input)
			}),
			onSuccess: invalidate
		}),
		update: useMutation({
			mutationFn: ({ id, ...input }) => api(`/appliances/${id}`, {
				method: "PATCH",
				body: JSON.stringify(input)
			}),
			onSuccess: invalidate
		}),
		remove: useMutation({
			mutationFn: (id) => api(`/appliances/${id}`, { method: "DELETE" }),
			onSuccess: invalidate
		})
	};
}
//#endregion
export { useAppliances as a, useProfile as c, useSettings as d, useUsageHistory as f, useApplianceMutations as i, useSaveProfile as l, Loader as n, useEnergyChallengeMutations as o, queryErrorMessage as r, useEnergyChallenges as s, EmptyState as t, useSaveSettings as u };

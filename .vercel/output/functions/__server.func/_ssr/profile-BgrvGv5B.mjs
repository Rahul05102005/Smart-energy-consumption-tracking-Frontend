import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as stringType } from "../_libs/zod.mjs";
import { i as api, r as useAuth } from "./router-BzsUX_cd.mjs";
import { c as useProfile, l as useSaveProfile, n as Loader } from "./queries-BwKUwAQ9.mjs";
import { t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BgrvGv5B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user } = useAuth();
	const { data: profile, isLoading } = useProfile();
	const saveProfile = useSaveProfile();
	const [name, setName] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (profile) setName(profile.name);
	}, [profile]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading profile…" });
	async function updateName(event) {
		event.preventDefault();
		const parsed = stringType().trim().min(2, "Name must be at least 2 characters").max(100).safeParse(name);
		if (!parsed.success) return toast.error(parsed.error.issues[0].message);
		await saveProfile.mutateAsync({ name: parsed.data });
		toast.success("Profile updated");
	}
	async function updatePassword(event) {
		event.preventDefault();
		if (password.length < 8) return toast.error("Password must be at least 8 characters");
		if (password !== confirm) return toast.error("Passwords do not match");
		try {
			await api("/auth/password", {
				method: "PATCH",
				body: JSON.stringify({ password })
			});
		} catch (error) {
			return toast.error(error instanceof Error ? error.message : "Could not update password");
		}
		setPassword("");
		setConfirm("");
		toast.success("Password changed");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Profile"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Your account details and security settings."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Account details",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid gap-3 text-sm sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-medium text-foreground",
						children: profile?.email || user?.email
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: "Member since"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-medium text-foreground",
						children: profile ? new Date(profile.created_at).toLocaleDateString() : "—"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Edit profile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: updateName,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: saveProfile.isPending,
						children: saveProfile.isPending ? "Saving…" : "Save changes"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Change password",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: updatePassword,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "new-password",
								children: "New password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "new-password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "confirm-password",
								children: "Confirm password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "confirm-password",
								type: "password",
								value: confirm,
								onChange: (e) => setConfirm(e.target.value)
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Update password"
					})]
				})
			})
		]
	});
}
//#endregion
export { ProfilePage as component };

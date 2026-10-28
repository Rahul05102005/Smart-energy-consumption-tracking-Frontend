import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAppliances, d as useSettings, n as Loader, o as useEnergyChallengeMutations, r as queryErrorMessage, s as useEnergyChallenges, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { _ as summarize, a as assessChallenge, f as formatKwh, s as buildStats } from "./energy-ChK0WDdG.mjs";
import { T as FiTarget, i as FiAward } from "../_libs/react-icons.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/challenges-CsI70sMN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isoDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function ChallengesPage() {
	const applianceQuery = useAppliances();
	const settingsQuery = useSettings();
	const challengeQuery = useEnergyChallenges();
	const mutations = useEnergyChallengeMutations();
	const appliances = (0, import_react.useMemo)(() => applianceQuery.data ?? [], [applianceQuery.data]);
	const challenges = (0, import_react.useMemo)(() => challengeQuery.data ?? [], [challengeQuery.data]);
	const settings = settingsQuery.data;
	const stats = (0, import_react.useMemo)(() => buildStats(appliances, settings?.tariff ?? 0), [appliances, settings?.tariff]);
	const summary = summarize(stats, settings?.tariff ?? 0);
	const today = /* @__PURE__ */ new Date();
	const [challengeType, setChallengeType] = (0, import_react.useState)("reduce_energy_percent");
	const [applianceId, setApplianceId] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [target, setTarget] = (0, import_react.useState)("10");
	const [startDate, setStartDate] = (0, import_react.useState)(isoDate(today));
	const [endDate, setEndDate] = (0, import_react.useState)(isoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)));
	const targetAppliance = appliances.find((item) => item.id === applianceId) ?? appliances[0];
	const baseline = challengeType === "reduce_energy_percent" ? summary.totalMonthly : targetAppliance?.daily_usage_hours ?? 0;
	const targetNumber = Number(target);
	const validTarget = target.trim() !== "" && Number.isFinite(targetNumber) && targetNumber > 0 && (challengeType === "reduce_energy_percent" ? targetNumber <= 100 : targetNumber <= 24);
	const canCreate = appliances.length > 0 && baseline > 0 && validTarget && startDate !== "" && endDate >= startDate && (challengeType !== "reduce_appliance_hours" || !!targetAppliance);
	const completing = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		for (const challenge of challenges) {
			if (challenge.completed_at || completing.current.has(challenge.id)) continue;
			if (assessChallenge(challenge, summary.totalMonthly, appliances.find((item) => item.id === challenge.appliance_id)).status !== "Completed") continue;
			completing.current.add(challenge.id);
			mutations.complete.mutateAsync({
				id: challenge.id,
				completed_at: (/* @__PURE__ */ new Date()).toISOString()
			}).catch((error) => {
				completing.current.delete(challenge.id);
				console.error("Could not save challenge completion", error);
				toast.error("Could not save challenge completion. Please retry.");
			});
		}
	}, [
		challenges,
		summary.totalMonthly,
		appliances,
		mutations.complete
	]);
	if (applianceQuery.isLoading || settingsQuery.isLoading || challengeQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading your energy goals…" });
	if (applianceQuery.isError || settingsQuery.isError || challengeQuery.isError) {
		const failed = challengeQuery.isError ? {
			error: challengeQuery.error,
			resource: "challenges"
		} : settingsQuery.isError ? {
			error: settingsQuery.error,
			resource: "settings"
		} : {
			error: applianceQuery.error,
			resource: "appliances"
		};
		console.error(`Could not load ${failed.resource}`, failed.error);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: `Could not load ${failed.resource}`,
			description: queryErrorMessage(failed.error, failed.resource)
		});
	}
	async function createChallenge(event) {
		event.preventDefault();
		if (!canCreate || !targetAppliance) return;
		const reduction = challengeType === "reduce_energy_percent";
		try {
			await mutations.create.mutateAsync({
				title: title.trim() || (reduction ? `Reduce energy use by ${targetNumber}%` : `Reduce ${targetAppliance.appliance_name} use by ${targetNumber}h/day`),
				description: reduction ? "Lower your current monthly appliance estimate by the selected percentage." : "Reduce this appliance's saved hours per day from the baseline captured today.",
				challenge_type: challengeType,
				target_value: targetNumber,
				baseline_value: baseline,
				appliance_id: reduction ? null : targetAppliance.id,
				start_date: startDate,
				end_date: endDate
			});
			toast.success("Challenge created");
			setTitle("");
		} catch (error) {
			console.error("Could not create challenge", error);
			toast.error("Could not create challenge. Check your entries and retry.");
		}
	}
	const active = challenges.filter((challenge) => assessChallenge(challenge, summary.totalMonthly, appliances.find((item) => item.id === challenge.appliance_id)).status === "In Progress").length;
	const complete = challenges.filter((challenge) => assessChallenge(challenge, summary.totalMonthly, appliances.find((item) => item.id === challenge.appliance_id)).status === "Completed").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Energy Saving Challenges"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Goals track changes in your saved appliance usage estimates. Progress updates as you edit your appliances."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Active challenges",
					value: String(active),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTarget, {}),
					tone: "accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Completed challenges",
					value: String(complete),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiAward, {}),
					tone: "success"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "Create a challenge",
				description: "Your baseline is captured from your current account data; no sample progress is used.",
				children: !appliances.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No appliances available",
					description: "Add an appliance before creating a usage challenge."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					onSubmit: createChallenge,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Goal type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: challengeType,
								onValueChange: (value) => setChallengeType(value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "reduce_energy_percent",
									children: "Reduce monthly energy (%)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "reduce_appliance_hours",
									children: "Reduce appliance hours/day"
								})] })]
							})]
						}),
						challengeType === "reduce_appliance_hours" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Appliance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: targetAppliance?.id ?? "",
								onValueChange: setApplianceId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select appliance" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: appliances.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: item.id,
									children: item.appliance_name
								}, item.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "challenge-title",
								children: "Challenge title (optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "challenge-title",
								value: title,
								onChange: (event) => setTitle(event.target.value),
								placeholder: "e.g. Make this month greener"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "challenge-target",
									children: [
										"Target (",
										challengeType === "reduce_energy_percent" ? "% reduction" : "hours/day reduction",
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "challenge-target",
									type: "number",
									min: "0.1",
									max: challengeType === "reduce_energy_percent" ? 100 : 24,
									step: "0.5",
									value: target,
									onChange: (event) => setTarget(event.target.value)
								}),
								!validTarget && target && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-destructive",
									children: [
										"Enter a positive target no greater than",
										" ",
										challengeType === "reduce_energy_percent" ? "100%" : "24 hours",
										"."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "challenge-start",
								children: "Start date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "challenge-start",
								type: "date",
								value: startDate,
								onChange: (event) => setStartDate(event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "challenge-end",
									children: "End date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "challenge-end",
									type: "date",
									value: endDate,
									min: startDate,
									onChange: (event) => setEndDate(event.target.value)
								}),
								endDate < startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: "End date cannot be before start date."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: !canCreate || mutations.create.isPending,
								children: mutations.create.isPending ? "Saving…" : "Create challenge"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground sm:col-span-2 lg:col-span-3",
							children: [
								"Baseline today:",
								" ",
								challengeType === "reduce_energy_percent" ? formatKwh(baseline) + "/month" : baseline.toFixed(2) + " hours/day",
								". You can track reductions after changing saved usage."
							]
						})
					]
				})
			}),
			challenges.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: challenges.map((challenge) => {
					const assessment = assessChallenge(challenge, summary.totalMonthly, appliances.find((item) => item.id === challenge.appliance_id));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
						title: challenge.title,
						description: challenge.description,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: assessment.status === "Completed" ? "default" : assessment.status === "Expired" ? "destructive" : "secondary",
									children: assessment.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										challenge.start_date,
										" – ",
										challenge.end_date
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: assessment.progressPercent,
								className: "mt-4 h-2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									assessment.currentValue.toFixed(1),
									" / ",
									challenge.target_value,
									" ",
									challenge.challenge_type === "reduce_energy_percent" ? "% saved" : "h/day reduced"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [assessment.progressPercent.toFixed(0), "%"] })]
							}),
							assessment.status === "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								role: "status",
								className: "mt-3 text-sm font-medium text-success",
								children: [
									"Challenge complete — great work!",
									" ",
									challenge.completed_at ? `Completed ${new Date(challenge.completed_at).toLocaleDateString()}.` : "Saving completion…"
								]
							})
						]
					}, challenge.id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No active challenges",
				description: "Create your first goal above. It will be measured against your saved usage."
			})
		]
	});
}
//#endregion
export { ChallengesPage as component };

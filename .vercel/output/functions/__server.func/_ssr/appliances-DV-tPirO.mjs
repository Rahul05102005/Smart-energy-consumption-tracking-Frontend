import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as objectType, r as stringType, t as coerce } from "../_libs/zod.mjs";
import { a as useAppliances, d as useSettings, i as useApplianceMutations, n as Loader, r as queryErrorMessage, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { d as formatCurrency, o as averageScheduledHoursPerDay, s as buildStats, t as CATEGORIES } from "./energy-ChK0WDdG.mjs";
import { E as FiTrash2, b as FiPlus, p as FiEdit2, x as FiSearch } from "../_libs/react-icons.mjs";
import { n as buttonVariants, t as Button } from "./button-BLZ6ednA.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/appliances-DV-tPirO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var schema = objectType({
	appliance_name: stringType().trim().min(2, "Name must be at least 2 characters").max(80),
	category: stringType().min(1, "Choose a category"),
	power_rating: coerce.number().positive("Power rating must be positive").max(5e4),
	daily_usage_hours: coerce.number().min(0, "Hours cannot be negative").max(24, "Maximum is 24 hours"),
	quantity: coerce.number().int("Quantity must be a whole number").min(1, "Minimum quantity is 1").max(500)
});
var empty = {
	appliance_name: "",
	category: "Other",
	power_rating: "",
	daily_usage_hours: "",
	quantity: "1"
};
var week = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];
var scheduleTypes = [
	{
		value: "daily",
		label: "Daily"
	},
	{
		value: "weekdays",
		label: "Weekdays"
	},
	{
		value: "weekends",
		label: "Weekends"
	},
	{
		value: "custom",
		label: "Custom days"
	}
];
function ApplianceForm({ open, onOpenChange, appliance, onSubmit, saving }) {
	const [form, setForm] = (0, import_react.useState)(empty);
	const [usageMode, setUsageMode] = (0, import_react.useState)("manual");
	const [scheduleType, setScheduleType] = (0, import_react.useState)("daily");
	const [startTime, setStartTime] = (0, import_react.useState)("18:00");
	const [endTime, setEndTime] = (0, import_react.useState)("22:00");
	const [days, setDays] = (0, import_react.useState)([
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday"
	]);
	const [errors, setErrors] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setErrors({});
		setForm(appliance ? {
			appliance_name: appliance.appliance_name,
			category: appliance.category,
			power_rating: String(appliance.power_rating),
			daily_usage_hours: String(appliance.daily_usage_hours),
			quantity: String(appliance.quantity)
		} : empty);
		setUsageMode(appliance?.usage_mode === "schedule" && appliance.schedule ? "schedule" : "manual");
		setScheduleType(appliance?.schedule?.type ?? "daily");
		setStartTime(appliance?.schedule?.startTime ?? "18:00");
		setEndTime(appliance?.schedule?.endTime ?? "22:00");
		setDays(appliance?.schedule?.days?.length ? appliance.schedule.days : [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday"
		]);
	}, [open, appliance]);
	const set = (key) => (value) => setForm((prev) => ({
		...prev,
		[key]: value
	}));
	const toggleDay = (day) => setDays((current) => current.includes(day) ? current.filter((d) => d !== day) : [...current, day]);
	const schedule = {
		type: scheduleType,
		startTime,
		endTime,
		days: scheduleType === "custom" ? days : []
	};
	const averageHours = averageScheduledHoursPerDay(schedule);
	async function handleSubmit(event) {
		event.preventDefault();
		const nextErrors = {};
		if (usageMode === "schedule") {
			if (!startTime || !endTime) nextErrors.schedule_time = "Choose a start and end time.";
			else if (startTime === endTime) nextErrors.schedule_time = "Start and end times must be different.";
			if (scheduleType === "custom" && days.length === 0) nextErrors.days = "Choose at least one day.";
		}
		if (Object.keys(nextErrors).length) {
			setErrors(nextErrors);
			return;
		}
		const parsed = schema.safeParse({
			...form,
			daily_usage_hours: usageMode === "schedule" ? averageHours : form.daily_usage_hours
		});
		if (!parsed.success) {
			setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
			return;
		}
		try {
			await onSubmit({
				...parsed.data,
				usage_mode: usageMode,
				schedule: usageMode === "schedule" ? schedule : null
			});
			onOpenChange(false);
		} catch (error) {
			console.error("Could not save appliance", error);
			toast.error(queryErrorMessage(error, "appliances"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: appliance ? "Edit appliance" : "Add appliance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Consumption is calculated from appliance power, quantity and your usage pattern." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4",
				onSubmit: handleSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "appliance_name",
								children: "Appliance name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "appliance_name",
								value: form.appliance_name,
								onChange: (e) => set("appliance_name")(e.target.value),
								placeholder: "Living room AC"
							}),
							errors.appliance_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.appliance_name
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.category,
								onValueChange: set("category"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: c
								}, c)) })]
							}),
							errors.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.category
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "power_rating",
									children: "Power (W)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "power_rating",
									type: "number",
									min: 1,
									value: form.power_rating,
									onChange: (e) => set("power_rating")(e.target.value),
									placeholder: "1500"
								}),
								errors.power_rating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: errors.power_rating
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "quantity",
									children: "Quantity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "quantity",
									type: "number",
									min: 1,
									value: form.quantity,
									onChange: (e) => set("quantity")(e.target.value)
								}),
								errors.quantity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: errors.quantity
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Usage mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: usageMode,
							onValueChange: (v) => setUsageMode(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "manual",
								children: "Manual usage"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "schedule",
								children: "Smart schedule"
							})] })]
						})]
					}),
					usageMode === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "daily_usage_hours",
								children: "Hours per day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "daily_usage_hours",
								type: "number",
								min: 0,
								max: 24,
								step: "0.5",
								value: form.daily_usage_hours,
								onChange: (e) => set("daily_usage_hours")(e.target.value),
								placeholder: "6"
							}),
							errors.daily_usage_hours && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.daily_usage_hours
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 rounded-xl border border-border p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Schedule type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: scheduleType,
									onValueChange: (v) => setScheduleType(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: scheduleTypes.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: option.value,
										children: option.label
									}, option.value)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "schedule_start",
										children: "Start time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "schedule_start",
										type: "time",
										value: startTime,
										onChange: (e) => setStartTime(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "schedule_end",
										children: "End time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "schedule_end",
										type: "time",
										value: endTime,
										onChange: (e) => setEndTime(e.target.value)
									})]
								})]
							}),
							errors.schedule_time && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-destructive",
								children: errors.schedule_time
							}),
							scheduleType === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Repeat on" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
										children: week.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: days.includes(day),
												onChange: () => toggleDay(day)
											}), day.slice(0, 3)]
										}, day))
									}),
									errors.days && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: errors.days
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: startTime === endTime ? "Start and end must differ." : "About " + averageHours.toFixed(2) + " average hours/day. Overnight schedules are supported."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: saving,
						children: saving ? "Saving…" : appliance ? "Save changes" : "Add appliance"
					})] })
				]
			})]
		})
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function AppliancesPage() {
	const { data: appliances, isLoading } = useAppliances();
	const { data: settings } = useSettings();
	const { create, update, remove } = useApplianceMutations();
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("recent");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [formOpen, setFormOpen] = (0, import_react.useState)(false);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		if (!settings) return [];
		let list = buildStats(appliances ?? [], settings.tariff);
		if (search.trim()) {
			const q = search.trim().toLowerCase();
			list = list.filter((a) => a.appliance_name.toLowerCase().includes(q));
		}
		if (category !== "all") list = list.filter((a) => a.category === category);
		if (sort === "highest") list = [...list].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption);
		else if (sort === "lowest") list = [...list].sort((a, b) => a.monthlyConsumption - b.monthlyConsumption);
		else list = [...list].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
		return list;
	}, [
		appliances,
		settings,
		search,
		category,
		sort
	]);
	if (isLoading || !settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading appliances…" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-foreground",
					children: "Appliances"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Manage every device that draws power in your home."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						setEditing(null);
						setFormOpen(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiPlus, { className: "mr-1" }), " Add appliance"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
				title: "Your appliances",
				description: `${rows.length} shown`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiSearch, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "pl-9",
								placeholder: "Search appliances…",
								value: search,
								onChange: (e) => setSearch(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: setCategory,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All categories"
							}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c,
								children: c
							}, c))] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sort,
							onValueChange: setSort,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sort by" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "recent",
									children: "Recently added"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "highest",
									children: "Highest consumption"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "lowest",
									children: "Lowest consumption"
								})
							] })]
						})
					]
				}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Nothing to show",
					description: "Add an appliance or clear your filters."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							children: "Qty"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "kWh/day"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "kWh/month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Bill"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Actions"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: a.appliance_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: a.category
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: a.power_rating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: a.usage_mode === "schedule" && a.schedule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-40 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: a.schedule.type
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-muted-foreground",
								children: [
									a.schedule.startTime,
									"–",
									a.schedule.endTime,
									a.schedule.type === "custom" ? ` · ${a.schedule.days.map((day) => day.slice(0, 3)).join(", ")}` : ""
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-right",
							children: [a.daily_usage_hours, " h/day · Manual"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: a.quantity
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: a.dailyConsumption.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: a.monthlyConsumption.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: formatCurrency(a.estimatedBill, settings.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": `Edit ${a.appliance_name}`,
									onClick: () => {
										setEditing(a);
										setFormOpen(true);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiEdit2, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": `Delete ${a.appliance_name}`,
									onClick: () => setDeleteId(a.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiTrash2, { className: "text-destructive" })
								})]
							})
						})
					] }, a.id)) })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplianceForm, {
				open: formOpen,
				onOpenChange: setFormOpen,
				appliance: editing,
				saving: create.isPending || update.isPending,
				onSubmit: async (values) => {
					if (editing) {
						await update.mutateAsync({
							id: editing.id,
							...values
						});
						toast.success("Appliance updated");
					} else {
						await create.mutateAsync(values);
						toast.success("Appliance added");
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleteId,
				onOpenChange: (open) => !open && setDeleteId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Delete this appliance?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This permanently removes it from your consumption data." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: async () => {
						if (!deleteId) return;
						try {
							await remove.mutateAsync(deleteId);
							toast.success("Appliance deleted");
						} catch (error) {
							toast.error(error instanceof Error ? error.message : "Delete failed");
						}
						setDeleteId(null);
					},
					children: "Delete"
				})] })] })
			})
		]
	});
}
//#endregion
export { AppliancesPage as component };

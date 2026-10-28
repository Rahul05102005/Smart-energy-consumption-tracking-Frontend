import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Route$9 } from "./router-BzsUX_cd.mjs";
import { a as useAppliances, d as useSettings, n as Loader, r as queryErrorMessage, t as EmptyState } from "./queries-BwKUwAQ9.mjs";
import { n as StatCard, t as PanelCard } from "./Cards-DD6MVPUn.mjs";
import { d as formatCurrency, f as formatKwh, l as dailyConsumptionOnDate, u as estimateBill } from "./energy-ChK0WDdG.mjs";
import { A as FiZap, c as FiChevronLeft, d as FiDollarSign, l as FiChevronRight } from "../_libs/react-icons.mjs";
import { n as buttonVariants, t as Button } from "./button-BLZ6ednA.mjs";
import { a as ChevronLeft, i as ChevronRight, o as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-DXNRVRVP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
		"data-range-start": modifiers.range_start,
		"data-range-end": modifiers.range_end,
		"data-range-middle": modifiers.range_middle,
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
function parseDate(value) {
	if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
	const [year, month, day] = value.split("-").map(Number);
	const date = new Date(year, month - 1, day);
	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
}
function formatDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function EnergyCalendarPage() {
	const search = Route$9.useSearch();
	const navigate = Route$9.useNavigate();
	const applianceQuery = useAppliances();
	const settingsQuery = useSettings();
	const appliances = (0, import_react.useMemo)(() => applianceQuery.data ?? [], [applianceQuery.data]);
	const settings = settingsQuery.data;
	const selectedDate = (0, import_react.useMemo)(() => parseDate(search.date) ?? /* @__PURE__ */ new Date(), [search.date]);
	const month = (0, import_react.useMemo)(() => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1), [selectedDate]);
	function selectMonth(nextMonth) {
		const next = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
		const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
		const selected = selectedDate.getFullYear() === next.getFullYear() && selectedDate.getMonth() === next.getMonth() ? selectedDate : new Date(next.getFullYear(), next.getMonth(), Math.min(selectedDate.getDate(), lastDay));
		navigate({ search: { date: formatDate(selected) } });
	}
	const selectedUsage = (0, import_react.useMemo)(() => appliances.map((appliance) => ({
		appliance,
		kwh: dailyConsumptionOnDate(appliance, selectedDate)
	})).sort((a, b) => b.kwh - a.kwh), [appliances, selectedDate]);
	const selectedKwh = selectedUsage.reduce((sum, row) => sum + row.kwh, 0);
	const monthKwh = (0, import_react.useMemo)(() => {
		const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
		let total = 0;
		for (let day = 1; day <= days; day++) {
			const date = new Date(month.getFullYear(), month.getMonth(), day);
			total += appliances.reduce((sum, appliance) => sum + dailyConsumptionOnDate(appliance, date), 0);
		}
		return total;
	}, [appliances, month]);
	function changeMonth(offset) {
		selectMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
	}
	if (applianceQuery.isLoading || settingsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading your usage calendar…" });
	if (applianceQuery.isError || settingsQuery.isError) {
		const failed = settingsQuery.isError ? {
			error: settingsQuery.error,
			resource: "settings"
		} : {
			error: applianceQuery.error,
			resource: "appliances"
		};
		console.error(`Could not load ${failed.resource}`, failed.error);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Could not load energy calendar",
			description: queryErrorMessage(failed.error, failed.resource)
		});
	}
	if (!settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { label: "Loading tariff settings…" });
	if (!appliances.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No appliances available",
		description: "Add appliances to see an estimated calendar of your usage pattern."
	});
	const highest = selectedUsage.find((row) => row.kwh > 0);
	const selectedLabel = selectedDate.toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-foreground",
				children: "Energy Usage Calendar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Estimated daily use based on your saved appliance hours and schedules. No historical meter readings are stored by this app."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PanelCard, {
					title: "Select a date",
					description: "Dates are calculated from your current usage pattern.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Previous month",
									onClick: () => changeMonth(-1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronLeft, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold",
									children: month.toLocaleDateString(void 0, {
										month: "long",
										year: "numeric"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Next month",
									onClick: () => changeMonth(1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiChevronRight, {})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							mode: "single",
							month,
							onMonthChange: selectMonth,
							selected: selectedDate,
							onSelect: (date) => date && void navigate({ search: { date: formatDate(date) } }),
							modifiers: { hasUsage: (date) => appliances.some((appliance) => dailyConsumptionOnDate(appliance, date) > 0) },
							modifiersClassNames: { hasUsage: "font-semibold underline decoration-primary decoration-2 underline-offset-4" },
							className: "mx-auto w-full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs text-muted-foreground",
							children: "Underlined dates have estimated appliance use."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Selected date · energy",
							value: formatKwh(selectedKwh),
							hint: selectedLabel,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {}),
							tone: "accent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Estimated daily cost",
							value: formatCurrency(estimateBill(selectedKwh, settings.tariff), settings.currency),
							hint: `${formatCurrency(settings.tariff, settings.currency)} per kWh`,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiDollarSign, {}),
							tone: "success"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Estimated month total",
							value: formatKwh(monthKwh),
							hint: "Sum of calendar-day usage estimates",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FiZap, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
							title: "Selected day details",
							description: selectedLabel,
							children: highest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									"Highest consuming appliance: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: highest.appliance.appliance_name }),
									" (",
									formatKwh(highest.kwh),
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2",
								children: selectedUsage.filter((row) => row.kwh > 0).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-3 border-b border-border pb-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.appliance.appliance_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: formatKwh(row.kwh)
									})]
								}, row.appliance.id))
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No appliance usage is scheduled or entered for this date."
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelCard, {
				title: "About these values",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "This calendar distributes the usage you entered across dates using the selected schedule. Manual hours are estimated each day; scheduled appliances follow their selected weekdays and times. Values are estimates, not historical or real-time readings."
				})
			})
		]
	});
}
//#endregion
export { EnergyCalendarPage as component };

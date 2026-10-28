//#region node_modules/.nitro/vite/services/ssr/assets/energy-ChK0WDdG.js
var CATEGORIES = [
	"Cooling",
	"Heating",
	"Lighting",
	"Kitchen",
	"Laundry",
	"Entertainment",
	"Computing",
	"Other"
];
var CURRENCIES = {
	INR: "₹",
	USD: "$",
	EUR: "€",
	GBP: "£",
	AED: "د.إ"
};
function finiteNonNegative(value) {
	return Number.isFinite(value) && value >= 0 ? value : 0;
}
/** Energy (kWh/day) = (Watts × hours × quantity) / 1000 */
function scheduleDurationHours(schedule) {
	const toMinutes = (time) => {
		const match = /^(\d{2}):(\d{2})$/.exec(time);
		if (!match) return NaN;
		const hours = Number(match[1]);
		const minutes = Number(match[2]);
		return hours <= 23 && minutes <= 59 ? hours * 60 + minutes : NaN;
	};
	const start = toMinutes(schedule.startTime);
	const end = toMinutes(schedule.endTime);
	if (!Number.isFinite(start) || !Number.isFinite(end) || start === end) return 0;
	return (end - start + 1440) % 1440 / 60;
}
var WEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];
function scheduleDays(schedule) {
	if (schedule.type === "daily") return WEEKDAYS;
	if (schedule.type === "weekdays") return WEEKDAYS.slice(0, 5);
	if (schedule.type === "weekends") return WEEKDAYS.slice(5);
	return Array.isArray(schedule.days) ? schedule.days : [];
}
function averageScheduledHoursPerDay(schedule) {
	return scheduleDurationHours(schedule) * scheduleDays(schedule).length / 7;
}
function scheduledDaysInMonth(schedule, year = (/* @__PURE__ */ new Date()).getFullYear(), month = (/* @__PURE__ */ new Date()).getMonth()) {
	const selected = new Set(scheduleDays(schedule));
	const count = new Date(year, month + 1, 0).getDate();
	let total = 0;
	for (let day = 1; day <= count; day++) {
		const weekday = WEEKDAYS[(new Date(year, month, day).getDay() + 6) % 7];
		if (selected.has(weekday)) total++;
	}
	return total;
}
function dailyConsumptionOnDate(appliance, date) {
	if (appliance.usage_mode !== "schedule" || !appliance.schedule) return dailyConsumption(appliance);
	const schedule = appliance.schedule;
	const duration = scheduleDurationHours(schedule);
	if (!(duration > 0)) return 0;
	const selected = new Set(scheduleDays(schedule));
	const dayAt = (value) => WEEKDAYS[(value.getDay() + 6) % 7];
	const startMinutes = Number(schedule.startTime.slice(0, 2)) * 60 + Number(schedule.startTime.slice(3, 5));
	const endMinutes = Number(schedule.endTime.slice(0, 2)) * 60 + Number(schedule.endTime.slice(3, 5));
	const overnight = endMinutes < startMinutes;
	const selectedToday = selected.has(dayAt(date));
	const previousDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
	const selectedYesterday = selected.has(dayAt(previousDate));
	const hoursToday = (selectedToday ? overnight ? 24 - startMinutes / 60 : duration : 0) + (overnight && selectedYesterday ? endMinutes / 60 : 0);
	return finiteNonNegative(appliance.power_rating * hoursToday * appliance.quantity / 1e3);
}
function analyzeUsageAnomaly(appliance, history, tariff, year = (/* @__PURE__ */ new Date()).getFullYear(), month = (/* @__PURE__ */ new Date()).getMonth()) {
	const previous = history.filter((snapshot) => snapshot.appliance_id === appliance.id).sort((a, b) => b.captured_at.localeCompare(a.captured_at)).slice(0, 6);
	if (previous.length < 2) return null;
	const expectedMonthlyKwh = previous.reduce((sum, snapshot) => {
		return sum + applianceMonthlyConsumption({
			...appliance,
			power_rating: snapshot.power_rating,
			daily_usage_hours: snapshot.daily_usage_hours,
			quantity: snapshot.quantity,
			usage_mode: snapshot.usage_mode,
			schedule: snapshot.schedule
		}, year, month);
	}, 0) / previous.length;
	if (!Number.isFinite(expectedMonthlyKwh) || expectedMonthlyKwh <= 0) return null;
	const currentMonthlyKwh = finiteNonNegative(applianceMonthlyConsumption(appliance, year, month));
	const increaseKwh = currentMonthlyKwh - expectedMonthlyKwh;
	const increasePercent = increaseKwh / expectedMonthlyKwh * 100;
	if (!Number.isFinite(increasePercent) || increasePercent < 20) return null;
	return {
		appliance,
		expectedMonthlyKwh,
		currentMonthlyKwh,
		increaseKwh,
		increasePercent,
		additionalCost: finiteNonNegative(increaseKwh * tariff),
		severity: increasePercent >= 50 ? "high" : increasePercent >= 30 ? "medium" : "low"
	};
}
function upgradeProjection(appliance, newPowerRating, newUsageHours, newQuantity, replacementCost, tariff, years, year = (/* @__PURE__ */ new Date()).getFullYear(), month = (/* @__PURE__ */ new Date()).getMonth()) {
	const days = appliance.usage_mode === "schedule" && appliance.schedule ? scheduledDaysInMonth(appliance.schedule, year, month) : 30;
	const currentMonthlyKwh = applianceMonthlyConsumption(appliance, year, month);
	const newMonthlyKwh = monthlyConsumptionForHours({
		power_rating: newPowerRating,
		quantity: newQuantity
	}, newUsageHours, days);
	const currentMonthlyCost = estimateBill(currentMonthlyKwh, tariff);
	const newMonthlyCost = estimateBill(newMonthlyKwh, tariff);
	const monthlyMoneySaved = currentMonthlyCost - newMonthlyCost;
	const annualMoneySaved = monthlyMoneySaved * 12;
	const paybackYears = annualMoneySaved > 0 ? replacementCost / annualMoneySaved : null;
	return {
		currentMonthlyKwh,
		newMonthlyKwh,
		energySaved: currentMonthlyKwh - newMonthlyKwh,
		currentMonthlyCost,
		newMonthlyCost,
		monthlyMoneySaved,
		annualMoneySaved,
		paybackYears,
		longTermNetSaving: annualMoneySaved * years - replacementCost
	};
}
function assessChallenge(challenge, currentMonthlyKwh, appliance, now = /* @__PURE__ */ new Date()) {
	const start = /* @__PURE__ */ new Date(`${challenge.start_date}T00:00:00`);
	const end = /* @__PURE__ */ new Date(`${challenge.end_date}T23:59:59.999`);
	const currentValue = challenge.challenge_type === "reduce_energy_percent" ? challenge.baseline_value > 0 ? Math.max(0, (challenge.baseline_value - currentMonthlyKwh) / challenge.baseline_value * 100) : 0 : Math.max(0, challenge.baseline_value - (appliance?.daily_usage_hours ?? challenge.baseline_value));
	const progressPercent = challenge.target_value > 0 ? Math.min(100, currentValue / challenge.target_value * 100) : 0;
	return {
		status: challenge.completed_at ? "Completed" : now < start ? "Not Started" : now > end ? "Expired" : progressPercent >= 100 ? "Completed" : "In Progress",
		currentValue: challenge.completed_at ? Math.max(currentValue, challenge.target_value) : currentValue,
		progressPercent: challenge.completed_at ? 100 : progressPercent
	};
}
function monthlyConsumptionForHours(a, hoursPerScheduledDay, daysPerMonth) {
	return finiteNonNegative(finiteNonNegative(a.power_rating) * finiteNonNegative(hoursPerScheduledDay) * finiteNonNegative(a.quantity) * finiteNonNegative(daysPerMonth) / 1e3);
}
function applianceMonthlyConsumption(a, year = (/* @__PURE__ */ new Date()).getFullYear(), month = (/* @__PURE__ */ new Date()).getMonth()) {
	if (a.usage_mode === "schedule" && a.schedule) return monthlyConsumptionForHours(a, scheduleDurationHours(a.schedule), scheduledDaysInMonth(a.schedule, year, month));
	return monthlyConsumption(dailyConsumption(a));
}
function monthlyConsumptionForApplianceHours(a, hoursPerDay, year = (/* @__PURE__ */ new Date()).getFullYear(), month = (/* @__PURE__ */ new Date()).getMonth()) {
	return monthlyConsumptionForHours(a, hoursPerDay, a.usage_mode === "schedule" && a.schedule ? scheduledDaysInMonth(a.schedule, year, month) : 30);
}
function dailyConsumption(a) {
	return finiteNonNegative(finiteNonNegative(a.power_rating) * finiteNonNegative(a.daily_usage_hours) * finiteNonNegative(a.quantity) / 1e3);
}
function monthlyConsumption(daily) {
	return finiteNonNegative(finiteNonNegative(daily) * 30);
}
function estimateBill(monthlyKwh, tariff) {
	return finiteNonNegative(finiteNonNegative(monthlyKwh) * finiteNonNegative(tariff));
}
function formatCurrency(value, currency) {
	return `${CURRENCIES[currency] ?? ""}${value.toLocaleString(void 0, {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2
	})}`;
}
function formatKwh(value) {
	return `${value.toLocaleString(void 0, { maximumFractionDigits: 2 })} kWh`;
}
function buildStats(appliances, tariff) {
	const daysThisMonth = new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).getDate();
	const monthlyByAppliance = appliances.map((a) => applianceMonthlyConsumption(a));
	const totalDaily = monthlyByAppliance.reduce((sum, monthly) => sum + monthly / daysThisMonth, 0);
	return appliances.map((a, index) => {
		const monthly = monthlyByAppliance[index];
		const daily = monthly / daysThisMonth;
		return {
			...a,
			dailyConsumption: daily,
			monthlyConsumption: monthly,
			estimatedBill: estimateBill(monthly, tariff),
			sharePercent: totalDaily > 0 ? daily / totalDaily * 100 : 0
		};
	});
}
/**
* Energy Saving Score (0-100). Rewards low household consumption and a
* balanced load profile (no single appliance dominating usage).
*/
function savingScore(stats) {
	if (stats.length === 0) return 100;
	const monthly = stats.reduce((s, a) => s + a.monthlyConsumption, 0);
	const usageScore = Math.max(0, 100 - monthly / 400 * 100);
	const dominance = Math.max(...stats.map((s) => s.sharePercent));
	const balanceScore = Math.max(0, 100 - Math.max(0, dominance - 30) * 1.4);
	return Math.round(Math.min(100, usageScore * .65 + balanceScore * .35));
}
function summarize(stats, tariff) {
	const sorted = [...stats].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption);
	const totalDaily = stats.reduce((s, a) => s + a.dailyConsumption, 0);
	const totalMonthly = stats.reduce((sum, appliance) => sum + appliance.monthlyConsumption, 0);
	return {
		totalAppliances: stats.length,
		totalUnits: stats.reduce((s, a) => s + a.quantity, 0),
		totalDaily,
		totalMonthly,
		estimatedBill: estimateBill(totalMonthly, tariff),
		highest: sorted[0],
		lowest: sorted[sorted.length - 1],
		average: stats.length ? totalMonthly / stats.length : 0,
		savingScore: savingScore(stats)
	};
}
/** Category-wise totals for charts. */
function byCategory(stats) {
	const map = /* @__PURE__ */ new Map();
	for (const s of stats) map.set(s.category, (map.get(s.category) ?? 0) + s.monthlyConsumption);
	return [...map.entries()].map(([category, kwh]) => ({
		category,
		kwh
	}));
}
/**
* Deterministic 12-month trend derived from the current load profile with a
* seasonal factor (cooling peaks mid-year, heating peaks in winter).
*/
function monthlyTrend(stats) {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	const base = stats.reduce((s, a) => s + a.monthlyConsumption, 0);
	const coolingShare = stats.filter((s) => s.category === "Cooling").reduce((s, a) => s + a.sharePercent, 0) / 100;
	const heatingShare = stats.filter((s) => s.category === "Heating").reduce((s, a) => s + a.sharePercent, 0) / 100;
	return months.map((month, i) => {
		const summer = Math.cos((i - 5) / 12 * 2 * Math.PI);
		const winter = -summer;
		const factor = 1 + coolingShare * .35 * summer + heatingShare * .35 * winter;
		return {
			month,
			kwh: Math.round(base * factor * 100) / 100
		};
	});
}
/** Rule-based engine: tips change with the user's actual appliance usage. */
function generateRecommendations(stats, tariff, currency) {
	const tips = [];
	if (stats.length === 0) return [{
		message: "Add your first appliance to unlock personalised energy-saving advice.",
		priority: "medium"
	}];
	const totalMonthly = stats.reduce((s, a) => s + a.monthlyConsumption, 0);
	const top = [...stats].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption)[0];
	tips.push({
		message: `"${top.appliance_name}" is your biggest load at ${top.monthlyConsumption.toFixed(1)} kWh/month (${top.sharePercent.toFixed(0)}% of usage). Cutting its runtime by 1 hour/day saves about ${formatCurrency(estimateBill(monthlyConsumption(top.power_rating * top.quantity / 1e3), tariff), currency)} per month.`,
		priority: "high"
	});
	for (const a of stats) {
		if (a.category === "Cooling" && a.daily_usage_hours >= 6) tips.push({
			message: `${a.appliance_name} runs ${a.daily_usage_hours}h/day. Raising the AC setpoint by 1°C typically trims 5-8% off cooling energy.`,
			priority: "high"
		});
		if (a.category === "Lighting" && a.power_rating > 20) tips.push({
			message: `${a.appliance_name} draws ${a.power_rating}W — replacing incandescent/CFL lighting with LEDs can cut that by up to 80%.`,
			priority: "high"
		});
		if (a.category === "Entertainment" && a.daily_usage_hours >= 5) tips.push({
			message: `${a.appliance_name} is on ${a.daily_usage_hours}h/day. Enable auto-sleep and switch off at the socket to remove standby power draw.`,
			priority: "medium"
		});
		if (a.category === "Laundry" && a.quantity >= 1 && a.daily_usage_hours >= 1) tips.push({
			message: `Run ${a.appliance_name} with full loads and a cold-wash cycle — heating water is usually the largest part of its consumption.`,
			priority: "medium"
		});
		if (a.power_rating >= 1500) tips.push({
			message: `${a.appliance_name} is a high-wattage appliance (${a.power_rating}W). Shift its use to off-peak hours and consider a 5-star rated replacement.`,
			priority: "medium"
		});
		if (a.daily_usage_hours >= 18) tips.push({
			message: `${a.appliance_name} runs ${a.daily_usage_hours}h/day — verify it genuinely needs to stay on and use a timer or smart plug schedule.`,
			priority: "high"
		});
	}
	if (totalMonthly > 400) tips.push({
		message: `Your household is projected at ${totalMonthly.toFixed(0)} kWh/month, above a typical 400 kWh benchmark. Target the top three appliances first for the fastest savings.`,
		priority: "high"
	});
	else if (totalMonthly < 150) tips.push({
		message: `Great work — ${totalMonthly.toFixed(0)} kWh/month is well below average. Keep monitoring monthly to hold the trend.`,
		priority: "low"
	});
	tips.push({
		message: "Turn off unused appliances at the wall: standby loads can account for 5-10% of a household bill.",
		priority: "low"
	});
	tips.push({
		message: "When replacing appliances, choose the highest available energy-efficiency rating — the payback is usually under 3 years.",
		priority: "low"
	});
	const seen = /* @__PURE__ */ new Set();
	return tips.filter((t) => seen.has(t.message) ? false : (seen.add(t.message), true));
}
//#endregion
export { summarize as _, assessChallenge as a, byCategory as c, formatCurrency as d, formatKwh as f, scheduleDurationHours as g, monthlyTrend as h, applianceMonthlyConsumption as i, dailyConsumptionOnDate as l, monthlyConsumptionForApplianceHours as m, CURRENCIES as n, averageScheduledHoursPerDay as o, generateRecommendations as p, analyzeUsageAnomaly as r, buildStats as s, CATEGORIES as t, estimateBill as u, upgradeProjection as v };

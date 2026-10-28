import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { FiChevronLeft, FiChevronRight, FiDollarSign, FiZap } from "react-icons/fi";
import { Calendar } from "@/components/ui/calendar";
import { EmptyState, Loader } from "@/components/common/Loader";
import { PanelCard, StatCard } from "@/components/common/Cards";
import { Button } from "@/components/ui/button";
import { queryErrorMessage, useAppliances, useSettings } from "@/lib/queries";
import { dailyConsumptionOnDate, estimateBill, formatCurrency, formatKwh } from "@/lib/energy";

export const Route = createFileRoute("/_authenticated/calendar")({
  validateSearch: z.object({ date: z.string().optional() }),
  head: () => ({ meta: [{ title: "Energy Usage Calendar | EnergyTrack" }] }),
  component: EnergyCalendarPage,
});

function parseDate(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function EnergyCalendarPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const applianceQuery = useAppliances();
  const settingsQuery = useSettings();
  const appliances = useMemo(() => applianceQuery.data ?? [], [applianceQuery.data]);
  const settings = settingsQuery.data;
  const selectedDate = useMemo(() => parseDate(search.date) ?? new Date(), [search.date]);
  const month = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
    [selectedDate],
  );

  function selectMonth(nextMonth: Date) {
    const next = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
    // Keep the selected day aligned with the month shown by the calendar.
    // Clamp dates such as January 31 when moving into a shorter month.
    const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
    const selected =
      selectedDate.getFullYear() === next.getFullYear() &&
      selectedDate.getMonth() === next.getMonth()
        ? selectedDate
        : new Date(next.getFullYear(), next.getMonth(), Math.min(selectedDate.getDate(), lastDay));
    void navigate({ search: { date: formatDate(selected) } });
  }

  const selectedUsage = useMemo(
    () =>
      appliances
        .map((appliance) => ({
          appliance,
          kwh: dailyConsumptionOnDate(appliance, selectedDate),
        }))
        .sort((a, b) => b.kwh - a.kwh),
    [appliances, selectedDate],
  );
  const selectedKwh = selectedUsage.reduce((sum, row) => sum + row.kwh, 0);
  const monthKwh = useMemo(() => {
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    let total = 0;
    for (let day = 1; day <= days; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      total += appliances.reduce(
        (sum, appliance) => sum + dailyConsumptionOnDate(appliance, date),
        0,
      );
    }
    return total;
  }, [appliances, month]);

  function changeMonth(offset: number) {
    const next = new Date(month.getFullYear(), month.getMonth() + offset, 1);
    selectMonth(next);
  }

  if (applianceQuery.isLoading || settingsQuery.isLoading)
    return <Loader label="Loading your usage calendar…" />;
  if (applianceQuery.isError || settingsQuery.isError) {
    const failed = settingsQuery.isError
      ? { error: settingsQuery.error, resource: "settings" }
      : { error: applianceQuery.error, resource: "appliances" };
    console.error(`Could not load ${failed.resource}`, failed.error);
    return (
      <EmptyState
        title="Could not load energy calendar"
        description={queryErrorMessage(failed.error, failed.resource)}
      />
    );
  }
  if (!settings) return <Loader label="Loading tariff settings…" />;
  if (!appliances.length)
    return (
      <EmptyState
        title="No appliances available"
        description="Add appliances to see an estimated calendar of your usage pattern."
      />
    );

  const highest = selectedUsage.find((row) => row.kwh > 0);
  const selectedLabel = selectedDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Energy Usage Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Estimated daily use based on your saved appliance hours and schedules. No historical meter
          readings are stored by this app.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
        <PanelCard
          title="Select a date"
          description="Dates are calculated from your current usage pattern."
        >
          <div className="mb-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
            >
              <FiChevronLeft />
            </Button>
            <span className="text-sm font-semibold">
              {month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
            >
              <FiChevronRight />
            </Button>
          </div>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={selectMonth}
            selected={selectedDate}
            onSelect={(date) => date && void navigate({ search: { date: formatDate(date) } })}
            modifiers={{
              hasUsage: (date) =>
                appliances.some((appliance) => dailyConsumptionOnDate(appliance, date) > 0),
            }}
            modifiersClassNames={{
              hasUsage:
                "font-semibold underline decoration-primary decoration-2 underline-offset-4",
            }}
            className="mx-auto w-full"
          />
          <p className="text-center text-xs text-muted-foreground">
            Underlined dates have estimated appliance use.
          </p>
        </PanelCard>
        <div className="space-y-4">
          <StatCard
            label="Selected date · energy"
            value={formatKwh(selectedKwh)}
            hint={selectedLabel}
            icon={<FiZap />}
            tone="accent"
          />
          <StatCard
            label="Estimated daily cost"
            value={formatCurrency(estimateBill(selectedKwh, settings.tariff), settings.currency)}
            hint={`${formatCurrency(settings.tariff, settings.currency)} per kWh`}
            icon={<FiDollarSign />}
            tone="success"
          />
          <StatCard
            label="Estimated month total"
            value={formatKwh(monthKwh)}
            hint="Sum of calendar-day usage estimates"
            icon={<FiZap />}
          />
          <PanelCard title="Selected day details" description={selectedLabel}>
            {highest ? (
              <>
                <p className="text-sm">
                  Highest consuming appliance: <strong>{highest.appliance.appliance_name}</strong> (
                  {formatKwh(highest.kwh)})
                </p>
                <ul className="mt-3 space-y-2">
                  {selectedUsage
                    .filter((row) => row.kwh > 0)
                    .map((row) => (
                      <li
                        key={row.appliance.id}
                        className="flex justify-between gap-3 border-b border-border pb-2 text-sm"
                      >
                        <span>{row.appliance.appliance_name}</span>
                        <span className="font-medium">{formatKwh(row.kwh)}</span>
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No appliance usage is scheduled or entered for this date.
              </p>
            )}
          </PanelCard>
        </div>
      </div>
      <PanelCard title="About these values">
        <p className="text-sm text-muted-foreground">
          This calendar distributes the usage you entered across dates using the selected schedule.
          Manual hours are estimated each day; scheduled appliances follow their selected weekdays
          and times. Values are estimates, not historical or real-time readings.
        </p>
      </PanelCard>
    </div>
  );
}

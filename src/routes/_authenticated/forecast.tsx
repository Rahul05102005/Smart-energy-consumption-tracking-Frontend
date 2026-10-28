import { createFileRoute } from "@tanstack/react-router";
import { FiActivity, FiDollarSign, FiTarget } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { EmptyState, Loader } from "@/components/common/Loader";
import { PanelCard, StatCard } from "@/components/common/Cards";
import { queryErrorMessage, useAppliances, useSettings } from "@/lib/queries";
import { buildStats, formatCurrency, formatKwh, summarize } from "@/lib/energy";

export const Route = createFileRoute("/_authenticated/forecast")({
  head: () => ({ meta: [{ title: "Bill Forecast | EnergyTrack" }] }),
  component: BillForecastPage,
});

function BillForecastPage() {
  const applianceQuery = useAppliances();
  const settingsQuery = useSettings();
  const settings = settingsQuery.data;
  const appliances = applianceQuery.data ?? [];
  if (applianceQuery.isLoading || settingsQuery.isLoading)
    return <Loader label="Calculating your bill estimate…" />;
  if (applianceQuery.isError || settingsQuery.isError) {
    const failed = settingsQuery.isError
      ? { error: settingsQuery.error, resource: "settings" }
      : { error: applianceQuery.error, resource: "appliances" };
    console.error(`Could not load ${failed.resource}`, failed.error);
    return (
      <EmptyState
        title="Could not calculate bill forecast"
        description={queryErrorMessage(failed.error, failed.resource)}
      />
    );
  }
  if (!settings) return <Loader label="Loading billing settings…" />;
  if (!appliances.length)
    return (
      <EmptyState
        title="Not enough data available"
        description="Add appliances and usage details to estimate a monthly bill."
      />
    );

  const summary = summarize(buildStats(appliances, settings.tariff), settings.tariff);
  const budget = settings.monthly_budget ?? 0;
  const ratio = budget > 0 ? summary.estimatedBill / budget : 0;
  const status =
    budget <= 0
      ? "Budget not set"
      : ratio > 1
        ? "Budget Exceeded"
        : ratio >= 0.8
          ? "Near Limit"
          : "Within Budget";
  const difference = summary.estimatedBill - budget;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bill Forecast</h1>
        <p className="text-sm text-muted-foreground">
          Estimated from your saved appliance usage patterns and tariff. This is not a meter reading
          or an exact electricity bill.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Current estimated energy"
          value={formatKwh(summary.totalMonthly)}
          hint="Monthly appliance estimate"
          icon={<FiActivity />}
          tone="accent"
        />
        <StatCard
          label="Current estimated bill"
          value={formatCurrency(summary.estimatedBill, settings.currency)}
          hint="From saved usage and tariff"
          icon={<FiDollarSign />}
        />
        <StatCard
          label="Projected monthly bill"
          value={formatCurrency(summary.estimatedBill, settings.currency)}
          hint={`${formatCurrency(settings.tariff, settings.currency)} per kWh`}
          icon={<FiDollarSign />}
          tone="warning"
        />
        <StatCard
          label="Monthly budget"
          value={budget > 0 ? formatCurrency(budget, settings.currency) : "Not set"}
          icon={<FiTarget />}
        />
      </div>
      <PanelCard
        title="Budget outlook"
        description="Compares your pattern-based monthly estimate with the budget saved in Settings."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge
            variant={
              budget > 0 && ratio > 1
                ? "destructive"
                : ratio >= 0.8 && budget > 0
                  ? "default"
                  : "secondary"
            }
          >
            {status}
          </Badge>
          {budget > 0 && (
            <span
              className={
                difference > 0
                  ? "text-sm font-semibold text-destructive"
                  : "text-sm font-medium text-success"
              }
            >
              {difference > 0 ? "Projected " : "Under budget by "}
              {formatCurrency(Math.abs(difference), settings.currency)}
            </span>
          )}
        </div>
        {budget > 0 ? (
          <>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${ratio > 1 ? "bg-destructive" : ratio >= 0.8 ? "bg-warning" : "bg-success"}`}
                style={{ width: `${Math.min(100, ratio * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {Math.round(ratio * 100)}% of monthly budget used
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Set a monthly budget in Settings to see whether your estimate is within limits.
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          The forecast uses the existing power × usage × quantity calculation and current tariff.
          Actual bills can differ with real usage, billing periods and provider charges.
        </p>
      </PanelCard>
    </div>
  );
}

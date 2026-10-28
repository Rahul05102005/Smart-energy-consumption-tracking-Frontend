import { useMemo } from "react";
import { FiAlertTriangle, FiActivity } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { EmptyState, Loader } from "@/components/common/Loader";
import { PanelCard, StatCard } from "@/components/common/Cards";
import { queryErrorMessage, useAppliances, useSettings, useUsageHistory } from "@/lib/queries";
import { analyzeUsageAnomaly, formatCurrency, formatKwh } from "@/lib/energy";


export function AnomaliesPage() {
  const applianceQuery = useAppliances();
  const settingsQuery = useSettings();
  const historyQuery = useUsageHistory();
  const appliances = useMemo(() => applianceQuery.data ?? [], [applianceQuery.data]);
  const history = useMemo(() => historyQuery.data ?? [], [historyQuery.data]);
  const settings = settingsQuery.data;
  const results = useMemo(
    () =>
      settings
        ? appliances
            .map((appliance) => analyzeUsageAnomaly(appliance, history, settings.tariff))
            .filter((item) => item !== null)
        : [],
    [appliances, history, settings],
  );
  const sufficientCount = useMemo(
    () =>
      appliances.filter(
        (appliance) => history.filter((item) => item.appliance_id === appliance.id).length >= 2,
      ).length,
    [appliances, history],
  );

  if (applianceQuery.isLoading || settingsQuery.isLoading || historyQuery.isLoading)
    return <Loader label="Reviewing saved usage changes…" />;
  if (applianceQuery.isError || settingsQuery.isError || historyQuery.isError) {
    const failed = historyQuery.isError
      ? { error: historyQuery.error, resource: "usage history" }
      : settingsQuery.isError
        ? { error: settingsQuery.error, resource: "settings" }
        : { error: applianceQuery.error, resource: "appliances" };
    console.error(`Could not load ${failed.resource}`, failed.error);
    return (
      <EmptyState
        title="Could not analyze appliance usage"
        description={queryErrorMessage(failed.error, failed.resource)}
      />
    );
  }
  if (!settings) return <Loader label="Loading tariff…" />;
  if (!appliances.length)
    return (
      <EmptyState
        title="No appliances available"
        description="Add appliance details before checking for unusual changes."
      />
    );

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Usage Anomaly Detector</h1>
        <p className="text-sm text-muted-foreground">
          Compares current estimated monthly use with saved versions of your appliance settings.
          This is not real-time monitoring.
        </p>
      </div>
      <StatCard
        label="Detected changes"
        value={String(results.length)}
        hint="Based on your saved usage history"
        icon={<FiAlertTriangle />}
        tone={results.length ? "warning" : "success"}
      />
      {!history.length || !sufficientCount ? (
        <PanelCard
          title="Building a personal baseline"
          description="History is captured when appliance power, quantity, schedule or usage hours change."
        >
          <div className="flex items-start gap-3">
            <FiActivity className="mt-0.5 size-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Not enough historical data to detect anomalies yet. At least two saved previous usage
              versions are needed for an appliance; future edits will build that history
              automatically.
            </p>
          </div>
        </PanelCard>
      ) : null}
      {results.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {results.map((result) => (
            <PanelCard
              key={result.appliance.id}
              title={result.appliance.appliance_name}
              description="Unusual increase compared with the average of up to six saved versions."
            >
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={
                    result.severity === "high"
                      ? "destructive"
                      : result.severity === "medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {result.severity} severity
                </Badge>
                <span className="text-sm font-semibold text-destructive">
                  +{result.increasePercent.toFixed(1)}%
                </span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Expected monthly use</dt>
                  <dd className="font-medium">{formatKwh(result.expectedMonthlyKwh)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Current estimated use</dt>
                  <dd className="font-medium">{formatKwh(result.currentMonthlyKwh)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Increase</dt>
                  <dd className="font-medium">+{formatKwh(result.increaseKwh)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Additional estimated cost</dt>
                  <dd className="font-medium">
                    {formatCurrency(result.additionalCost, settings.currency)}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 rounded-lg bg-muted/60 p-3 text-sm">
                {result.appliance.appliance_name} consumption is approximately{" "}
                {result.increasePercent.toFixed(0)}% above its saved baseline. Review its usage
                hours or schedule.
              </p>
            </PanelCard>
          ))}
        </div>
      ) : sufficientCount > 0 ? (
        <EmptyState
          title="No unusual increases found"
          description="Current estimates are within 20% of the saved appliance baselines."
        />
      ) : null}
    </div>
  );
}

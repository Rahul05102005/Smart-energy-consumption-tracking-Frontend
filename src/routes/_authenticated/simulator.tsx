import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FiActivity, FiDollarSign, FiZap } from "react-icons/fi";
import { useAppliances, useSettings } from "@/lib/queries";
import {
  applianceMonthlyConsumption,
  formatCurrency,
  formatKwh,
  monthlyConsumptionForApplianceHours,
  scheduleDurationHours,
} from "@/lib/energy";
import { PanelCard, StatCard } from "@/components/common/Cards";
import { EmptyState, Loader } from "@/components/common/Loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/simulator")({
  head: () => ({ meta: [{ title: "What-If Simulator | EnergyTrack" }] }),
  component: SimulatorPage,
});

function SimulatorPage() {
  const appliancesQuery = useAppliances();
  const settingsQuery = useSettings();
  const appliances = useMemo(() => appliancesQuery.data ?? [], [appliancesQuery.data]);
  const settings = settingsQuery.data;
  const [applianceId, setApplianceId] = useState("");
  const [hours, setHours] = useState("0");

  useEffect(() => {
    if (!appliances.length) return;
    const selected = appliances.find((item) => item.id === applianceId) ?? appliances[0];
    if (selected.id !== applianceId) setApplianceId(selected.id);
    setHours(
      String(
        selected.usage_mode === "schedule" && selected.schedule
          ? scheduleDurationHours(selected.schedule)
          : selected.daily_usage_hours,
      ),
    );
  }, [appliances, applianceId]);

  const selected = appliances.find((item) => item.id === applianceId);
  const simulatedHours = Number(hours);
  const result = useMemo(() => {
    if (!selected || !Number.isFinite(simulatedHours)) return null;
    const currentKwh = applianceMonthlyConsumption(selected);
    const simulatedKwh = monthlyConsumptionForApplianceHours(selected, simulatedHours);
    const tariff = settings?.tariff ?? 0;
    return {
      currentKwh,
      simulatedKwh,
      energySaved: currentKwh - simulatedKwh,
      currentCost: currentKwh * tariff,
      simulatedCost: simulatedKwh * tariff,
      moneySaved: (currentKwh - simulatedKwh) * tariff,
    };
  }, [selected, simulatedHours, settings?.tariff]);

  if (appliancesQuery.isLoading || settingsQuery.isLoading)
    return <Loader label="Loading your appliances…" />;
  if (appliancesQuery.isError || settingsQuery.isError)
    return (
      <EmptyState title="Could not load simulator" description="Refresh the page and try again." />
    );
  if (!settings) return <Loader label="Loading settings…" />;
  if (!appliances.length)
    return (
      <EmptyState
        title="Add an appliance first"
        description="The simulator uses your saved appliance data and never changes it."
      />
    );
  if (!selected || !result) return <Loader label="Preparing simulation…" />;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">What-If Energy Simulator</h1>
        <p className="text-sm text-muted-foreground">
          Try a different daily duration and see the estimated monthly impact. Your appliance stays
          unchanged.
        </p>
      </div>
      <PanelCard
        title="Adjust one appliance"
        description="Current appliance data is read from your account. Simulation changes are temporary."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Appliance</Label>
            <Select value={selected.id} onValueChange={setApplianceId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {appliances.map((appliance) => (
                  <SelectItem key={appliance.id} value={appliance.id}>
                    {appliance.appliance_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="simulated-hours">Simulated hours per scheduled day</Label>
            <div className="flex items-center gap-3">
              <Input
                id="simulated-hours"
                type="number"
                min={0}
                max={24}
                step="0.5"
                value={hours}
                onChange={(event) => setHours(event.target.value)}
              />
              <span className="shrink-0 text-sm text-muted-foreground">hours</span>
            </div>
            <input
              aria-label="Simulated daily hours"
              className="w-full accent-primary"
              type="range"
              min={0}
              max={24}
              step={0.5}
              value={Math.max(0, Math.min(24, simulatedHours || 0))}
              onChange={(event) => setHours(event.target.value)}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {selected.power_rating} W · quantity {selected.quantity}
          {selected.usage_mode === "schedule" && selected.schedule
            ? ` · ${selected.schedule.type} schedule, ${selected.schedule.startTime}–${selected.schedule.endTime}`
            : " · manual usage"}
        </p>
      </PanelCard>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Current monthly use"
          value={formatKwh(result.currentKwh)}
          icon={<FiZap />}
        />
        <StatCard
          label="Simulated monthly use"
          value={formatKwh(result.simulatedKwh)}
          icon={<FiActivity />}
          tone="accent"
        />
        <StatCard
          label="Energy saved"
          value={formatKwh(result.energySaved)}
          hint={result.energySaved >= 0 ? "Reduction at this setting" : "Usage would increase"}
          icon={<FiActivity />}
          tone={result.energySaved >= 0 ? "success" : "warning"}
        />
        <StatCard
          label="Current estimated cost"
          value={formatCurrency(result.currentCost, settings.currency)}
          icon={<FiDollarSign />}
        />
        <StatCard
          label="Simulated estimated cost"
          value={formatCurrency(result.simulatedCost, settings.currency)}
          icon={<FiDollarSign />}
          tone="accent"
        />
        <StatCard
          label="Estimated money saved"
          value={formatCurrency(result.moneySaved, settings.currency)}
          hint={result.moneySaved >= 0 ? "Per month" : "Additional monthly cost"}
          icon={<FiDollarSign />}
          tone={result.moneySaved >= 0 ? "success" : "warning"}
        />
      </div>
    </div>
  );
}

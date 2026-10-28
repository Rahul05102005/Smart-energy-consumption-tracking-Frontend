import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FiDollarSign, FiTrendingDown, FiZap } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState, Loader } from "@/components/common/Loader";
import { PanelCard, StatCard } from "@/components/common/Cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applianceMonthlyConsumption,
  estimateBill,
  formatCurrency,
  formatKwh,
  scheduleDurationHours,
  upgradeProjection,
} from "@/lib/energy";
import { queryErrorMessage, useAppliances, useSettings } from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/upgrade-planner")({
  head: () => ({ meta: [{ title: "Upgrade Planner | EnergyTrack" }] }),
  component: UpgradePlannerPage,
});

function UpgradePlannerPage() {
  const applianceQuery = useAppliances();
  const settingsQuery = useSettings();
  const appliances = useMemo(() => applianceQuery.data ?? [], [applianceQuery.data]);
  const settings = settingsQuery.data;
  const [applianceId, setApplianceId] = useState("");
  const [newName, setNewName] = useState("");
  const [newPower, setNewPower] = useState("");
  const [newHours, setNewHours] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [replacementCost, setReplacementCost] = useState("");
  const [years, setYears] = useState("3");
  useEffect(() => {
    if (!appliances.length) return;
    const current = appliances.find((item) => item.id === applianceId) ?? appliances[0];
    if (current.id !== applianceId) setApplianceId(current.id);
    setNewName("");
    setNewPower("");
    setReplacementCost("");
    setNewHours(
      String(
        current.usage_mode === "schedule" && current.schedule
          ? scheduleDurationHours(current.schedule)
          : current.daily_usage_hours,
      ),
    );
    setNewQuantity(String(current.quantity));
  }, [appliances, applianceId]);

  const appliance = appliances.find((item) => item.id === applianceId);
  const parsed = {
    power: Number(newPower),
    hours: Number(newHours),
    quantity: Number(newQuantity),
    cost: Number(replacementCost),
  };
  const valid =
    !!appliance &&
    !!settings &&
    newName.trim().length >= 2 &&
    newPower.trim() !== "" &&
    Number.isFinite(parsed.power) &&
    parsed.power > 0 &&
    newHours.trim() !== "" &&
    Number.isFinite(parsed.hours) &&
    parsed.hours >= 0 &&
    parsed.hours <= 24 &&
    newQuantity.trim() !== "" &&
    Number.isInteger(parsed.quantity) &&
    parsed.quantity > 0 &&
    replacementCost.trim() !== "" &&
    Number.isFinite(parsed.cost) &&
    parsed.cost >= 0 &&
    [1, 3, 5].includes(Number(years));
  const projection = useMemo(
    () =>
      valid && appliance && settings
        ? upgradeProjection(
            appliance,
            parsed.power,
            parsed.hours,
            parsed.quantity,
            parsed.cost,
            settings.tariff,
            Number(years),
          )
        : null,
    [valid, appliance, settings, parsed.power, parsed.hours, parsed.quantity, parsed.cost, years],
  );

  if (applianceQuery.isLoading || settingsQuery.isLoading)
    return <Loader label="Loading appliance data…" />;
  if (applianceQuery.isError || settingsQuery.isError) {
    const failed = settingsQuery.isError
      ? { error: settingsQuery.error, resource: "settings" }
      : { error: applianceQuery.error, resource: "appliances" };
    console.error(`Could not load ${failed.resource}`, failed.error);
    return (
      <EmptyState
        title="Could not load upgrade planner"
        description={queryErrorMessage(failed.error, failed.resource)}
      />
    );
  }
  if (!settings) return <Loader label="Loading billing settings…" />;
  if (!appliances.length)
    return (
      <EmptyState
        title="No appliances available"
        description="Add an appliance before comparing an upgrade."
      />
    );
  if (!appliance) return <Loader label="Preparing comparison…" />;

  const currentHours =
    appliance.usage_mode === "schedule" && appliance.schedule
      ? scheduleDurationHours(appliance.schedule)
      : appliance.daily_usage_hours;
  const decision =
    projection?.paybackYears == null
      ? "No projected payback"
      : projection.paybackYears < 2
        ? "Highly Recommended"
        : projection.paybackYears <= 5
          ? "Recommended"
          : projection.paybackYears <= 8
            ? "Consider Carefully"
            : "Low Financial Benefit";

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Energy-Efficient Appliance Upgrade Planner
        </h1>
        <p className="text-sm text-muted-foreground">
          Compare a proposed replacement with your current appliance. This is an estimate from the
          values you enter and does not change your appliance.
        </p>
      </div>
      <PanelCard
        title="Replacement details"
        description="The current appliance values are read from your account; proposed values remain temporary."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Current appliance</Label>
            <Select value={appliance.id} onValueChange={setApplianceId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {appliances.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.appliance_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="replacement-name">Proposed appliance name</Label>
            <Input
              id="replacement-name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Efficient inverter AC"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="replacement-power">Proposed power (W)</Label>
            <Input
              id="replacement-power"
              type="number"
              min={1}
              value={newPower}
              onChange={(event) => setNewPower(event.target.value)}
              placeholder="Enter replacement watts"
            />
            {newPower && parsed.power <= 0 && (
              <p className="text-xs text-destructive">Power must be greater than zero.</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="replacement-hours">Usage hours per scheduled day</Label>
            <Input
              id="replacement-hours"
              type="number"
              min={0}
              max={24}
              step="0.5"
              value={newHours}
              onChange={(event) => setNewHours(event.target.value)}
            />
            {newHours && (parsed.hours < 0 || parsed.hours > 24) && (
              <p className="text-xs text-destructive">Usage must be between 0 and 24 hours.</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="replacement-quantity">Replacement quantity</Label>
            <Input
              id="replacement-quantity"
              type="number"
              min={1}
              step={1}
              value={newQuantity}
              onChange={(event) => setNewQuantity(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="replacement-cost">Purchase cost ({settings.currency})</Label>
            <Input
              id="replacement-cost"
              type="number"
              min={0}
              step="0.01"
              value={replacementCost}
              onChange={(event) => setReplacementCost(event.target.value)}
              placeholder="Enter purchase cost"
            />
            {replacementCost && parsed.cost < 0 && (
              <p className="text-xs text-destructive">Cost cannot be negative.</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Long-term horizon</Label>
            <Select value={years} onValueChange={setYears}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 3, 5].map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {value} {value === 1 ? "year" : "years"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{appliance.category}</Badge>
          <span>
            {appliance.power_rating} W × {currentHours} h/day × {appliance.quantity}
          </span>
          <span>
            · Existing monthly estimate: {formatKwh(applianceMonthlyConsumption(appliance))} at{" "}
            {formatCurrency(settings.tariff, settings.currency)}/kWh
          </span>
          <span>
            Current estimated monthly cost:{" "}
            {formatCurrency(
              estimateBill(applianceMonthlyConsumption(appliance), settings.tariff),
              settings.currency,
            )}
          </span>
        </div>
      </PanelCard>
      {projection ? (
        <>
          <PanelCard
            title="Proposed replacement"
            description="Estimated comparison using your entered replacement details."
          >
            <p className="text-sm">
              <strong>{newName}</strong> · {parsed.power} W · {parsed.hours} hours/day · quantity{" "}
              {parsed.quantity} · {formatCurrency(parsed.cost, settings.currency)} purchase cost
            </p>
          </PanelCard>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Current monthly energy"
              value={formatKwh(projection.currentMonthlyKwh)}
              icon={<FiZap />}
            />
            <StatCard
              label="Proposed monthly energy"
              value={formatKwh(projection.newMonthlyKwh)}
              icon={<FiZap />}
              tone="accent"
            />
            <StatCard
              label="Monthly energy saved"
              value={formatKwh(projection.energySaved)}
              icon={<FiTrendingDown />}
              tone={projection.energySaved >= 0 ? "success" : "warning"}
            />
            <StatCard
              label="Current monthly cost"
              value={formatCurrency(projection.currentMonthlyCost, settings.currency)}
              icon={<FiDollarSign />}
            />
            <StatCard
              label="Proposed monthly cost"
              value={formatCurrency(projection.newMonthlyCost, settings.currency)}
              icon={<FiDollarSign />}
              tone="accent"
            />
            <StatCard
              label="Monthly money saved"
              value={formatCurrency(projection.monthlyMoneySaved, settings.currency)}
              icon={<FiDollarSign />}
              tone={projection.monthlyMoneySaved >= 0 ? "success" : "warning"}
            />
            <StatCard
              label="Annual money saved"
              value={formatCurrency(projection.annualMoneySaved, settings.currency)}
              icon={<FiDollarSign />}
            />
            <StatCard
              label="Estimated payback"
              value={
                projection.paybackYears == null
                  ? "No payback"
                  : `${projection.paybackYears.toFixed(1)} years`
              }
              icon={<FiTrendingDown />}
            />
            <StatCard
              label={`${years}-year net saving`}
              value={formatCurrency(projection.longTermNetSaving, settings.currency)}
              icon={<FiDollarSign />}
              tone={projection.longTermNetSaving >= 0 ? "success" : "warning"}
            />
          </div>
          <PanelCard
            title="Decision guide"
            description="A simple estimate based on your proposed replacement cost and energy use."
          >
            <Badge
              variant={
                projection.paybackYears != null && projection.paybackYears < 5
                  ? "default"
                  : "secondary"
              }
            >
              {decision}
            </Badge>
            <p className="mt-3 text-sm text-muted-foreground">
              This estimate assumes the tariff and usage pattern remain constant. It is not a
              guaranteed financial result.
            </p>
          </PanelCard>
        </>
      ) : (
        <EmptyState
          title="Enter replacement details"
          description="Provide a replacement name, positive power rating, usage hours, quantity and purchase cost to see the estimated savings."
        />
      )}
      <div className="flex justify-end">
        <Button type="button" variant="outline" disabled>
          Simulation only · no changes saved
        </Button>
      </div>
    </div>
  );
}

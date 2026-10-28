import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSaveSettings, useSettings } from "@/lib/queries";
import { queryErrorMessage } from "@/lib/queries";
import { CURRENCIES } from "@/lib/energy";
import { PanelCard } from "@/components/common/Cards";
import { EmptyState, Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings | EnergyTrack" },
      {
        name: "description",
        content: "Configure currency, electricity tariff, dark mode and notifications.",
      },
      { property: "og:title", content: "Settings | EnergyTrack" },
      {
        property: "og:description",
        content: "Personalise how EnergyTrack calculates and displays your data.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const settingsQuery = useSettings();
  const { data: settings, isLoading } = settingsQuery;
  const save = useSaveSettings();
  const [tariff, setTariff] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState("");

  useEffect(() => {
    if (settings) {
      setTariff(String(settings.tariff));
      setMonthlyBudget(String(settings.monthly_budget ?? 0));
    }
  }, [settings]);

  if (isLoading) return <Loader label="Loading settings…" />;
  if (settingsQuery.isError) {
    console.error("Could not load settings", settingsQuery.error);
    return (
      <EmptyState
        title="Could not load settings"
        description={queryErrorMessage(settingsQuery.error, "settings")}
      />
    );
  }
  if (!settings) return <Loader label="Loading settings…" />;

  async function persist(patch: Record<string, unknown>, successMessage = "Settings saved") {
    try {
      await save.mutateAsync(patch);
      toast.success(successMessage);
    } catch (error) {
      console.error("Could not save settings", error);
      toast.error(queryErrorMessage(error, "settings"));
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Tariff and preferences used across every calculation.
        </p>
      </div>

      <PanelCard
        title="Billing"
        description="Used for bill estimates and your monthly spending alert"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Currency</Label>
            <Select value={settings.currency} onValueChange={(v) => void persist({ currency: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CURRENCIES).map(([code, symbol]) => (
                  <SelectItem key={code} value={code}>
                    {code} ({symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="monthly_budget">Monthly energy budget ({settings.currency})</Label>
            <div className="flex gap-2">
              <Input
                id="monthly_budget"
                type="number"
                min={0}
                step="1"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
              />
              <Button
                onClick={() => {
                  const value = Number(monthlyBudget);
                  if (!monthlyBudget.trim() || !Number.isFinite(value) || value < 0)
                    return toast.error("Budget must be zero or more");
                  void persist(
                    { monthly_budget: value },
                    "Monthly energy budget saved successfully.",
                  );
                }}
              >
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Set to 0 to turn off budget tracking.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tariff">Electricity tariff (per kWh)</Label>
            <div className="flex gap-2">
              <Input
                id="tariff"
                type="number"
                min={0}
                step="0.01"
                value={tariff}
                onChange={(e) => setTariff(e.target.value)}
              />
              <Button
                onClick={() => {
                  const value = Number(tariff);
                  if (!tariff.trim() || !Number.isFinite(value) || value < 0)
                    return toast.error("Tariff must be a positive number");
                  void persist({ tariff: value });
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </PanelCard>

      <PanelCard title="Preferences">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Dark mode</p>
              <p className="text-xs text-muted-foreground">Switch the dashboard to a dark theme.</p>
            </div>
            <Switch
              checked={settings.dark_mode}
              onCheckedChange={(v) => void persist({ dark_mode: v })}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive energy-saving alerts and monthly summaries.
              </p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(v) => void persist({ notifications: v })}
            />
          </div>
        </div>
      </PanelCard>
    </div>
  );
}

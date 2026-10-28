import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { FiAward, FiTarget } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState, Loader } from "@/components/common/Loader";
import { PanelCard, StatCard } from "@/components/common/Cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assessChallenge, buildStats, formatKwh, summarize } from "@/lib/energy";
import {
  useAppliances,
  useEnergyChallengeMutations,
  useEnergyChallenges,
  queryErrorMessage,
  useSettings,
} from "@/lib/queries";

export const Route = createFileRoute("/_authenticated/challenges")({
  head: () => ({ meta: [{ title: "Energy Saving Challenges | EnergyTrack" }] }),
  component: ChallengesPage,
});

type ChallengeType = "reduce_energy_percent" | "reduce_appliance_hours";

function isoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function ChallengesPage() {
  const applianceQuery = useAppliances();
  const settingsQuery = useSettings();
  const challengeQuery = useEnergyChallenges();
  const mutations = useEnergyChallengeMutations();
  const appliances = useMemo(() => applianceQuery.data ?? [], [applianceQuery.data]);
  const challenges = useMemo(() => challengeQuery.data ?? [], [challengeQuery.data]);
  const settings = settingsQuery.data;
  const stats = useMemo(
    () => buildStats(appliances, settings?.tariff ?? 0),
    [appliances, settings?.tariff],
  );
  const summary = summarize(stats, settings?.tariff ?? 0);
  const today = new Date();
  const [challengeType, setChallengeType] = useState<ChallengeType>("reduce_energy_percent");
  const [applianceId, setApplianceId] = useState("");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("10");
  const [startDate, setStartDate] = useState(isoDate(today));
  const [endDate, setEndDate] = useState(
    isoDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)),
  );

  const targetAppliance = appliances.find((item) => item.id === applianceId) ?? appliances[0];
  const baseline =
    challengeType === "reduce_energy_percent"
      ? summary.totalMonthly
      : (targetAppliance?.daily_usage_hours ?? 0);
  const targetNumber = Number(target);
  const validTarget =
    target.trim() !== "" &&
    Number.isFinite(targetNumber) &&
    targetNumber > 0 &&
    (challengeType === "reduce_energy_percent" ? targetNumber <= 100 : targetNumber <= 24);
  const canCreate =
    appliances.length > 0 &&
    baseline > 0 &&
    validTarget &&
    startDate !== "" &&
    endDate >= startDate &&
    (challengeType !== "reduce_appliance_hours" || !!targetAppliance);

  const completing = useRef(new Set<string>());
  useEffect(() => {
    for (const challenge of challenges) {
      if (challenge.completed_at || completing.current.has(challenge.id)) continue;
      const assessment = assessChallenge(
        challenge,
        summary.totalMonthly,
        appliances.find((item) => item.id === challenge.appliance_id),
      );
      if (assessment.status !== "Completed") continue;
      completing.current.add(challenge.id);
      void mutations.complete
        .mutateAsync({ id: challenge.id, completed_at: new Date().toISOString() })
        .catch((error: unknown) => {
          completing.current.delete(challenge.id);
          console.error("Could not save challenge completion", error);
          toast.error("Could not save challenge completion. Please retry.");
        });
    }
  }, [challenges, summary.totalMonthly, appliances, mutations.complete]);

  if (applianceQuery.isLoading || settingsQuery.isLoading || challengeQuery.isLoading)
    return <Loader label="Loading your energy goals…" />;
  if (applianceQuery.isError || settingsQuery.isError || challengeQuery.isError) {
    const failed = challengeQuery.isError
      ? { error: challengeQuery.error, resource: "challenges" }
      : settingsQuery.isError
        ? { error: settingsQuery.error, resource: "settings" }
        : { error: applianceQuery.error, resource: "appliances" };
    console.error(`Could not load ${failed.resource}`, failed.error);
    return (
      <EmptyState
        title={`Could not load ${failed.resource}`}
        description={queryErrorMessage(failed.error, failed.resource)}
      />
    );
  }

  async function createChallenge(event: React.FormEvent) {
    event.preventDefault();
    if (!canCreate || !targetAppliance) return;
    const reduction = challengeType === "reduce_energy_percent";
    try {
      await mutations.create.mutateAsync({
        title:
          title.trim() ||
          (reduction
            ? `Reduce energy use by ${targetNumber}%`
            : `Reduce ${targetAppliance.appliance_name} use by ${targetNumber}h/day`),
        description: reduction
          ? "Lower your current monthly appliance estimate by the selected percentage."
          : "Reduce this appliance's saved hours per day from the baseline captured today.",
        challenge_type: challengeType,
        target_value: targetNumber,
        baseline_value: baseline,
        appliance_id: reduction ? null : targetAppliance.id,
        start_date: startDate,
        end_date: endDate,
      });
      toast.success("Challenge created");
      setTitle("");
    } catch (error) {
      console.error("Could not create challenge", error);
      toast.error("Could not create challenge. Check your entries and retry.");
    }
  }

  const active = challenges.filter(
    (challenge) =>
      assessChallenge(
        challenge,
        summary.totalMonthly,
        appliances.find((item) => item.id === challenge.appliance_id),
      ).status === "In Progress",
  ).length;
  const complete = challenges.filter(
    (challenge) =>
      assessChallenge(
        challenge,
        summary.totalMonthly,
        appliances.find((item) => item.id === challenge.appliance_id),
      ).status === "Completed",
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Energy Saving Challenges</h1>
        <p className="text-sm text-muted-foreground">
          Goals track changes in your saved appliance usage estimates. Progress updates as you edit
          your appliances.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Active challenges"
          value={String(active)}
          icon={<FiTarget />}
          tone="accent"
        />
        <StatCard
          label="Completed challenges"
          value={String(complete)}
          icon={<FiAward />}
          tone="success"
        />
      </div>
      <PanelCard
        title="Create a challenge"
        description="Your baseline is captured from your current account data; no sample progress is used."
      >
        {!appliances.length ? (
          <EmptyState
            title="No appliances available"
            description="Add an appliance before creating a usage challenge."
          />
        ) : (
          <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onSubmit={createChallenge}>
            <div className="space-y-1.5">
              <Label>Goal type</Label>
              <Select
                value={challengeType}
                onValueChange={(value) => setChallengeType(value as ChallengeType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reduce_energy_percent">Reduce monthly energy (%)</SelectItem>
                  <SelectItem value="reduce_appliance_hours">Reduce appliance hours/day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {challengeType === "reduce_appliance_hours" && (
              <div className="space-y-1.5">
                <Label>Appliance</Label>
                <Select value={targetAppliance?.id ?? ""} onValueChange={setApplianceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appliance" />
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
            )}
            <div className="space-y-1.5">
              <Label htmlFor="challenge-title">Challenge title (optional)</Label>
              <Input
                id="challenge-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Make this month greener"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="challenge-target">
                Target (
                {challengeType === "reduce_energy_percent" ? "% reduction" : "hours/day reduction"})
              </Label>
              <Input
                id="challenge-target"
                type="number"
                min="0.1"
                max={challengeType === "reduce_energy_percent" ? 100 : 24}
                step="0.5"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              />
              {!validTarget && target && (
                <p className="text-xs text-destructive">
                  Enter a positive target no greater than{" "}
                  {challengeType === "reduce_energy_percent" ? "100%" : "24 hours"}.
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="challenge-start">Start date</Label>
              <Input
                id="challenge-start"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="challenge-end">End date</Label>
              <Input
                id="challenge-end"
                type="date"
                value={endDate}
                min={startDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
              {endDate < startDate && (
                <p className="text-xs text-destructive">End date cannot be before start date.</p>
              )}
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={!canCreate || mutations.create.isPending}>
                {mutations.create.isPending ? "Saving…" : "Create challenge"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground sm:col-span-2 lg:col-span-3">
              Baseline today:{" "}
              {challengeType === "reduce_energy_percent"
                ? formatKwh(baseline) + "/month"
                : baseline.toFixed(2) + " hours/day"}
              . You can track reductions after changing saved usage.
            </p>
          </form>
        )}
      </PanelCard>
      {challenges.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {challenges.map((challenge) => {
            const assessment = assessChallenge(
              challenge,
              summary.totalMonthly,
              appliances.find((item) => item.id === challenge.appliance_id),
            );
            return (
              <PanelCard
                key={challenge.id}
                title={challenge.title}
                description={challenge.description}
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant={
                      assessment.status === "Completed"
                        ? "default"
                        : assessment.status === "Expired"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {assessment.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {challenge.start_date} – {challenge.end_date}
                  </span>
                </div>
                <Progress value={assessment.progressPercent} className="mt-4 h-2" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>
                    {assessment.currentValue.toFixed(1)} / {challenge.target_value}{" "}
                    {challenge.challenge_type === "reduce_energy_percent"
                      ? "% saved"
                      : "h/day reduced"}
                  </span>
                  <span>{assessment.progressPercent.toFixed(0)}%</span>
                </div>
                {assessment.status === "Completed" && (
                  <p role="status" className="mt-3 text-sm font-medium text-success">
                    Challenge complete — great work!{" "}
                    {challenge.completed_at
                      ? `Completed ${new Date(challenge.completed_at).toLocaleDateString()}.`
                      : "Saving completion…"}
                  </p>
                )}
              </PanelCard>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No active challenges"
          description="Create your first goal above. It will be measured against your saved usage."
        />
      )}
    </div>
  );
}

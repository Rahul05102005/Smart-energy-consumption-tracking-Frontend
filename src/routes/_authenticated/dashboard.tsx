import { FiActivity, FiAward, FiCpu, FiDollarSign, FiTrendingUp, FiZap } from "react-icons/fi";
import { useAppliances, useProfile, useSettings } from "@/lib/queries";
import { useAuth } from "@/hooks/useAuth";
import {
  buildStats,
  byCategory,
  formatCurrency,
  formatKwh,
  monthlyTrend,
  summarize,
} from "@/lib/energy";
import { StatCard, PanelCard } from "@/components/common/Cards";
import { Loader, EmptyState } from "@/components/common/Loader";
import {
  ApplianceBarChart,
  CategoryPieChart,
  ShareDoughnutChart,
  TrendLineChart,
} from "@/components/charts/EnergyCharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";


export function DashboardPage() {
  const { data: appliances, isLoading } = useAppliances();
  const { data: settings } = useSettings();
  const { data: profile } = useProfile();
  const { user } = useAuth();

  if (isLoading || !settings) return <Loader label="Loading your dashboard…" />;

  const stats = buildStats(appliances ?? [], settings.tariff);
  const summary = summarize(stats, settings.tariff);
  const categories = byCategory(stats);
  const trend = monthlyTrend(stats);
  const top5 = [...stats].sort((a, b) => b.monthlyConsumption - a.monthlyConsumption).slice(0, 5);
  const mostEfficient = [...stats].sort((a, b) => a.monthlyConsumption - b.monthlyConsumption)[0];
  const monthlyBudget = settings.monthly_budget ?? 0;
  const budgetPercent = monthlyBudget > 0 ? (summary.estimatedBill / monthlyBudget) * 100 : 0;
  const budgetStatus =
    monthlyBudget <= 0
      ? "Budget not set"
      : budgetPercent > 100
        ? "Budget Exceeded"
        : budgetPercent >= 80
          ? "Near Budget Limit"
          : "Within Budget";

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back{(profile?.name || user?.name) ? `, ${(profile?.name || user?.name)?.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's how your household is consuming energy at{" "}
          {formatCurrency(settings.tariff, settings.currency)} per kWh.
        </p>
      </div>

      {stats.length === 0 ? (
        <EmptyState
          title="No appliances yet"
          description="Add your first appliance from the Appliances page to see your consumption breakdown."
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total appliances"
              value={String(summary.totalAppliances)}
              hint={`${summary.totalUnits} units in total`}
              icon={<FiCpu />}
            />
            <StatCard
              label="Today's consumption"
              value={formatKwh(summary.totalDaily)}
              hint="Based on daily usage hours"
              icon={<FiZap />}
              tone="accent"
            />
            <StatCard
              label="Monthly consumption"
              value={formatKwh(summary.totalMonthly)}
              hint="Daily × 30 days"
              icon={<FiActivity />}
              tone="success"
            />
            <StatCard
              label="Estimated bill"
              value={formatCurrency(summary.estimatedBill, settings.currency)}
              hint="Monthly units × tariff"
              icon={<FiDollarSign />}
              tone="warning"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <StatCard
              label="Highest consuming"
              value={summary.highest?.appliance_name ?? "—"}
              hint={
                summary.highest
                  ? formatKwh(summary.highest.monthlyConsumption) + " / month"
                  : undefined
              }
              icon={<FiTrendingUp />}
              tone="warning"
            />
            <StatCard
              label="Most efficient"
              value={mostEfficient?.appliance_name ?? "—"}
              hint={
                mostEfficient ? formatKwh(mostEfficient.monthlyConsumption) + " / month" : undefined
              }
              icon={<FiAward />}
              tone="success"
            />
            <PanelCard title="Energy saving score" description="Higher is better (0–100)">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold text-primary">{summary.savingScore}</span>
                <Progress value={summary.savingScore} className="h-2 flex-1" />
              </div>
            </PanelCard>
          </div>

          <PanelCard
            title="Monthly energy budget"
            description="Estimated bill compared with your saved monthly budget"
          >
            {monthlyBudget > 0 ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span>
                    Estimated bill:{" "}
                    <strong>{formatCurrency(summary.estimatedBill, settings.currency)}</strong>
                  </span>
                  <Badge
                    variant={
                      budgetPercent > 100
                        ? "destructive"
                        : budgetPercent >= 80
                          ? "default"
                          : "secondary"
                    }
                  >
                    {budgetStatus}
                  </Badge>
                </div>
                <Progress value={Math.min(100, budgetPercent)} className="h-2" />
                <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
                  <span>
                    Budget: {formatCurrency(monthlyBudget, settings.currency)} ·{" "}
                    {budgetPercent.toFixed(0)}% used
                  </span>
                  <span
                    className={
                      summary.estimatedBill > monthlyBudget ? "font-semibold text-destructive" : ""
                    }
                  >
                    {summary.estimatedBill > monthlyBudget ? "Over by " : "Remaining "}
                    {formatCurrency(
                      Math.abs(monthlyBudget - summary.estimatedBill),
                      settings.currency,
                    )}
                  </span>
                </div>
                {summary.estimatedBill > monthlyBudget && (
                  <p role="alert" className="text-sm font-medium text-destructive">
                    Your estimated bill is above your monthly budget.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Set a monthly budget in Settings to track your bill against a limit.
              </p>
            )}
          </PanelCard>

          <div className="grid gap-4 lg:grid-cols-2">
            <PanelCard title="Top appliances" description="Monthly consumption (kWh)">
              <div className="h-72">
                <ApplianceBarChart
                  labels={top5.map((s) => s.appliance_name)}
                  values={top5.map((s) => Number(s.monthlyConsumption.toFixed(2)))}
                />
              </div>
            </PanelCard>

            <PanelCard title="Category split" description="Share of monthly consumption">
              <div className="h-72">
                <CategoryPieChart
                  labels={categories.map((c) => c.category)}
                  values={categories.map((c) => Number(c.kwh.toFixed(2)))}
                />
              </div>
            </PanelCard>

            <PanelCard title="Monthly usage trend" description="Seasonally adjusted projection">
              <div className="h-72">
                <TrendLineChart
                  labels={trend.map((t) => t.month)}
                  values={trend.map((t) => t.kwh)}
                />
              </div>
            </PanelCard>

            <PanelCard title="Appliance share" description="Contribution to total load">
              <div className="h-72">
                <ShareDoughnutChart
                  labels={top5.map((s) => s.appliance_name)}
                  values={top5.map((s) => Number(s.sharePercent.toFixed(2)))}
                />
              </div>
            </PanelCard>
          </div>

          <PanelCard
            title="Appliance comparison"
            description="Monthly use, estimated cost and share of your total consumption"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appliance</TableHead>
                    <TableHead className="text-right">Monthly kWh</TableHead>
                    <TableHead className="text-right">Estimated cost</TableHead>
                    <TableHead className="text-right">Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...stats]
                    .sort((a, b) => b.monthlyConsumption - a.monthlyConsumption)
                    .map((s, index) => (
                      <TableRow key={s.id} className={index === 0 ? "bg-warning/5" : undefined}>
                        <TableCell className="font-medium">
                          {s.appliance_name}
                          {index === 0 && (
                            <Badge variant="outline" className="ml-2">
                              Highest
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {s.monthlyConsumption.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(s.estimatedBill, settings.currency)}
                        </TableCell>
                        <TableCell className="text-right">{s.sharePercent.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </PanelCard>

          <PanelCard title="Recent activity" description="Most recently added appliances">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Appliance</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Watts</TableHead>
                    <TableHead>Usage pattern</TableHead>
                    <TableHead className="text-right">Daily</TableHead>
                    <TableHead className="text-right">Monthly</TableHead>
                    <TableHead className="text-right">Bill</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stats.slice(0, 6).map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.appliance_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{s.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{s.power_rating}</TableCell>
                      <TableCell>
                        {s.usage_mode === "schedule" && s.schedule
                          ? `${s.schedule.type}: ${s.schedule.startTime}–${s.schedule.endTime}`
                          : `${s.daily_usage_hours} h/day · Manual`}
                      </TableCell>
                      <TableCell className="text-right">{s.dailyConsumption.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        {s.monthlyConsumption.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(s.estimatedBill, settings.currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PanelCard>
        </>
      )}
    </div>
  );
}

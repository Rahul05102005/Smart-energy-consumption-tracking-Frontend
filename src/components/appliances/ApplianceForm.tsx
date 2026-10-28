import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  averageScheduledHoursPerDay,
  CATEGORIES,
  type Appliance,
  type ApplianceSchedule,
  type ScheduleType,
  type WeekDay,
} from "@/lib/energy";
import { queryErrorMessage, type ApplianceInput } from "@/lib/queries";
const schema = z.object({
  appliance_name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  category: z.string().min(1, "Choose a category"),
  power_rating: z.coerce.number().positive("Power rating must be positive").max(50000),
  daily_usage_hours: z.coerce
    .number()
    .min(0, "Hours cannot be negative")
    .max(24, "Maximum is 24 hours"),
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Minimum quantity is 1")
    .max(500),
});
const empty = {
  appliance_name: "",
  category: "Other",
  power_rating: "",
  daily_usage_hours: "",
  quantity: "1",
};
const week: WeekDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const scheduleTypes: { value: ScheduleType; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "custom", label: "Custom days" },
];
export function ApplianceForm({
  open,
  onOpenChange,
  appliance,
  onSubmit,
  saving,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appliance?: Appliance | null;
  onSubmit: (values: ApplianceInput) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState<Record<string, string>>(empty);
  const [usageMode, setUsageMode] = useState<"manual" | "schedule">("manual");
  const [scheduleType, setScheduleType] = useState<ScheduleType>("daily");
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("22:00");
  const [days, setDays] = useState<WeekDay[]>([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      appliance
        ? {
            appliance_name: appliance.appliance_name,
            category: appliance.category,
            power_rating: String(appliance.power_rating),
            daily_usage_hours: String(appliance.daily_usage_hours),
            quantity: String(appliance.quantity),
          }
        : empty,
    );
    setUsageMode(
      appliance?.usage_mode === "schedule" && appliance.schedule ? "schedule" : "manual",
    );
    setScheduleType(appliance?.schedule?.type ?? "daily");
    setStartTime(appliance?.schedule?.startTime ?? "18:00");
    setEndTime(appliance?.schedule?.endTime ?? "22:00");
    setDays(
      appliance?.schedule?.days?.length
        ? appliance.schedule.days
        : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    );
  }, [open, appliance]);
  const set = (key: string) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleDay = (day: WeekDay) =>
    setDays((current) =>
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day],
    );
  const schedule: ApplianceSchedule = {
    type: scheduleType,
    startTime,
    endTime,
    days: scheduleType === "custom" ? days : [],
  };
  const averageHours = averageScheduledHoursPerDay(schedule);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (usageMode === "schedule") {
      if (!startTime || !endTime) nextErrors.schedule_time = "Choose a start and end time.";
      else if (startTime === endTime)
        nextErrors.schedule_time = "Start and end times must be different.";
      if (scheduleType === "custom" && days.length === 0)
        nextErrors.days = "Choose at least one day.";
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    const parsed = schema.safeParse({
      ...form,
      daily_usage_hours: usageMode === "schedule" ? averageHours : form.daily_usage_hours,
    });
    if (!parsed.success) {
      setErrors(
        Object.fromEntries(
          parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
        ),
      );
      return;
    }
    try {
      await onSubmit({
        ...parsed.data,
        usage_mode: usageMode,
        schedule: usageMode === "schedule" ? schedule : null,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Could not save appliance", error);
      toast.error(queryErrorMessage(error, "appliances"));
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{appliance ? "Edit appliance" : "Add appliance"}</DialogTitle>
          <DialogDescription>
            Consumption is calculated from appliance power, quantity and your usage pattern.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="appliance_name">Appliance name</Label>
            <Input
              id="appliance_name"
              value={form.appliance_name}
              onChange={(e) => set("appliance_name")(e.target.value)}
              placeholder="Living room AC"
            />
            {errors.appliance_name && (
              <p className="text-xs text-destructive">{errors.appliance_name}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={form.category} onValueChange={set("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="power_rating">Power (W)</Label>
              <Input
                id="power_rating"
                type="number"
                min={1}
                value={form.power_rating}
                onChange={(e) => set("power_rating")(e.target.value)}
                placeholder="1500"
              />
              {errors.power_rating && (
                <p className="text-xs text-destructive">{errors.power_rating}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => set("quantity")(e.target.value)}
              />
              {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Usage mode</Label>
            <Select
              value={usageMode}
              onValueChange={(v) => setUsageMode(v as "manual" | "schedule")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual usage</SelectItem>
                <SelectItem value="schedule">Smart schedule</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {usageMode === "manual" ? (
            <div className="space-y-1.5">
              <Label htmlFor="daily_usage_hours">Hours per day</Label>
              <Input
                id="daily_usage_hours"
                type="number"
                min={0}
                max={24}
                step="0.5"
                value={form.daily_usage_hours}
                onChange={(e) => set("daily_usage_hours")(e.target.value)}
                placeholder="6"
              />
              {errors.daily_usage_hours && (
                <p className="text-xs text-destructive">{errors.daily_usage_hours}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4 rounded-xl border border-border p-4">
              <div className="space-y-1.5">
                <Label>Schedule type</Label>
                <Select
                  value={scheduleType}
                  onValueChange={(v) => setScheduleType(v as ScheduleType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleTypes.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="schedule_start">Start time</Label>
                  <Input
                    id="schedule_start"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="schedule_end">End time</Label>
                  <Input
                    id="schedule_end"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
              {errors.schedule_time && (
                <p className="text-xs text-destructive">{errors.schedule_time}</p>
              )}
              {scheduleType === "custom" && (
                <div className="space-y-2">
                  <Label>Repeat on</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {week.map((day) => (
                      <label key={day} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={days.includes(day)}
                          onChange={() => toggleDay(day)}
                        />
                        {day.slice(0, 3)}
                      </label>
                    ))}
                  </div>
                  {errors.days && <p className="text-xs text-destructive">{errors.days}</p>}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {startTime === endTime
                  ? "Start and end must differ."
                  : "About " +
                    averageHours.toFixed(2) +
                    " average hours/day. Overnight schedules are supported."}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : appliance ? "Save changes" : "Add appliance"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

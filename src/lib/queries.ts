import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { api, saveStoredUser } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import type { Appliance, ApplianceSchedule, EnergyChallenge, UsageHistorySnapshot } from "@/lib/energy";

export type Settings = { user_id: string; currency: string; tariff: number; dark_mode: boolean; notifications: boolean; monthly_budget: number };
export type Profile = { id: string; name: string; email: string; created_at: string };
type QueryState<T> = { data?: T; error?: unknown; isLoading: boolean; isError: boolean };
type QueryEntry = { state: QueryState<unknown>; listeners: Set<() => void>; promise?: Promise<unknown>; queryFn?: () => Promise<unknown> };
const queryCache = new Map<string, QueryEntry>();

function entryFor(key: string): QueryEntry {
  let entry = queryCache.get(key);
  if (!entry) {
    entry = { state: { isLoading: true, isError: false }, listeners: new Set() };
    queryCache.set(key, entry);
  }
  return entry;
}
function publish(entry: QueryEntry, state: QueryState<unknown>) {
  entry.state = state;
  entry.listeners.forEach((listener) => listener());
}
function subscribe(key: string, listener: () => void) {
  const entry = entryFor(key);
  entry.listeners.add(listener);
  return () => entry.listeners.delete(listener);
}
function load<T>(key: string, queryFn: () => Promise<T>, force = false): Promise<T> {
  const entry = entryFor(key);
  entry.queryFn = queryFn;
  if (entry.promise && !force) return entry.promise as Promise<T>;
  if (entry.state.data !== undefined && !force) return Promise.resolve(entry.state.data as T);
  publish(entry, { ...entry.state, isLoading: true, isError: false, error: undefined });
  const request = queryFn().then((data) => {
    publish(entry, { data, isLoading: false, isError: false });
    return data;
  }).catch((error: unknown) => {
    publish(entry, { ...entry.state, error, isLoading: false, isError: true });
    throw error;
  }).finally(() => { entry.promise = undefined; });
  entry.promise = request;
  return request;
}
function useResource<T>(key: string, queryFn: () => Promise<T>, enabled: boolean) {
  const state = useSyncExternalStore(
    useCallback((listener) => subscribe(key, listener), [key]),
    useCallback(() => entryFor(key).state as QueryState<T>, [key]),
    () => ({ data: undefined, error: undefined, isLoading: false, isError: false }),
  );
  useEffect(() => { if (enabled) void load(key, queryFn).catch(() => undefined); }, [enabled, key, queryFn]);
  return enabled ? state : { data: undefined, error: undefined, isLoading: false, isError: false };
}

function invalidateQueries(prefix: string) {
  for (const [key, entry] of queryCache) {
    if (!key.startsWith(prefix)) continue;
    if (entry.queryFn) void load(key, entry.queryFn, true).catch(() => undefined);
    else publish(entry, { ...entry.state, data: undefined, isLoading: true, isError: false });
  }
}
type Mutation<TInput, TOutput> = { mutateAsync: (input: TInput) => Promise<TOutput>; isPending: boolean };
function useMutation<TInput, TOutput>(mutationFn: (input: TInput) => Promise<TOutput>, onSuccess?: (result: TOutput) => void | Promise<void>): Mutation<TInput, TOutput> {
  const [isPending, setPending] = useState(false);
  const mutateAsync = useCallback(async (input: TInput) => {
    setPending(true);
    try {
      const result = await mutationFn(input);
      await onSuccess?.(result);
      return result;
    } finally { setPending(false); }
  }, [mutationFn, onSuccess]);
  return { mutateAsync, isPending };
}

export function queryErrorMessage(error: unknown, resource: string) {
  const e = error as { message?: string; status?: number } | null;
  if (e?.status === 401) return "Your session may have expired. Sign in again and retry.";
  if (/fetch|network|offline/i.test(e?.message || "")) return "Could not reach the data service. Check your connection and retry.";
  return e?.message || `Could not load your ${resource}. Check your connection and retry.`;
}
export function useAppliances() { const { user } = useAuth(); const key = `appliances:${user?.id ?? ""}`; const queryFn = useCallback(() => api<Appliance[]>("/appliances"), []); return useResource(key, queryFn, !!user); }
export function useSettings() { const { user } = useAuth(); const key = `settings:${user?.id ?? ""}`; const queryFn = useCallback(() => api<Settings>("/settings"), []); return useResource(key, queryFn, !!user); }
export function useProfile() { const { user } = useAuth(); const key = `profile:${user?.id ?? ""}`; const queryFn = useCallback(() => api<Profile>("/profile"), []); return useResource(key, queryFn, !!user); }
export function useEnergyChallenges() { const { user } = useAuth(); const key = `energy-challenges:${user?.id ?? ""}`; const queryFn = useCallback(() => api<EnergyChallenge[]>("/challenges"), []); return useResource(key, queryFn, !!user); }
export function useUsageHistory() { const { user } = useAuth(); const key = `appliance-usage-history:${user?.id ?? ""}`; const queryFn = useCallback(() => api<UsageHistorySnapshot[]>("/usage-history"), []); return useResource(key, queryFn, !!user); }

export type EnergyChallengeInput = Omit<EnergyChallenge, "id" | "created_at">;
export function useEnergyChallengeMutations() {
  const create = useMutation((input: Omit<EnergyChallengeInput, "user_id">) => api("/challenges", { method: "POST", body: JSON.stringify(input) }), () => invalidateQueries("energy-challenges:"));
  const complete = useMutation(({ id, completed_at }: { id: string; completed_at: string }) => api(`/challenges/${id}/complete`, { method: "PATCH", body: JSON.stringify({ completed_at }) }), () => invalidateQueries("energy-challenges:"));
  const remove = useMutation((id: string) => api(`/challenges/${id}`, { method: "DELETE" }), () => invalidateQueries("energy-challenges:"));
  return { create, complete, remove };
}
export function useSaveSettings() { return useMutation((patch: Partial<Settings>) => api("/settings", { method: "PATCH", body: JSON.stringify(patch) }), () => invalidateQueries("settings:")); }
export function useSaveProfile() { return useMutation(async (patch: { name?: string }) => { const profile = await api<Profile>("/profile", { method: "PATCH", body: JSON.stringify(patch) }); saveStoredUser(profile); return profile; }, () => invalidateQueries("profile:")); }
export type ApplianceInput = { appliance_name: string; category: string; power_rating: number; daily_usage_hours: number; quantity: number; usage_mode: "manual" | "schedule"; schedule: ApplianceSchedule | null };
export function useApplianceMutations() {
  const invalidate = () => invalidateQueries("appliances:");
  const create = useMutation((input: ApplianceInput) => api("/appliances", { method: "POST", body: JSON.stringify(input) }), invalidate);
  const update = useMutation(({ id, ...input }: ApplianceInput & { id: string }) => api(`/appliances/${id}`, { method: "PATCH", body: JSON.stringify(input) }), invalidate);
  const remove = useMutation((id: string) => api(`/appliances/${id}`, { method: "DELETE" }), invalidate);
  return { create, update, remove };
}

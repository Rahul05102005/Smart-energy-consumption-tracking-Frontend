import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

type LocationState = { pathname: string; search: string };
type RouterContextValue = LocationState & { navigate: (to: string, options?: { replace?: boolean }) => void };
const RouterContext = createContext<RouterContextValue | null>(null);

function readLocation(): LocationState {
  return { pathname: window.location.pathname, search: window.location.search };
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationState>(readLocation);
  useEffect(() => {
    const onPopState = () => setLocation(readLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (options?.replace) window.history.replaceState({}, "", to);
    else window.history.pushState({}, "", to);
    setLocation(readLocation());
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  const value = useMemo(() => ({ ...location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

function useRouter() {
  const value = useContext(RouterContext);
  if (!value) throw new Error("Router hooks must be used inside BrowserRouter");
  return value;
}

export function useNavigate() {
  return useRouter().navigate;
}

export function useLocation() {
  const { pathname, search } = useRouter();
  return { pathname, search };
}

export function useSearchParams() {
  const { search, navigate } = useRouter();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const setParams = useCallback((next: URLSearchParams | Record<string, string>) => {
    const query = next instanceof URLSearchParams ? next : new URLSearchParams(next);
    const suffix = query.toString();
    navigate(`${window.location.pathname}${suffix ? `?${suffix}` : ""}`, { replace: true });
  }, [navigate]);
  return [params, setParams] as const;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; replace?: boolean; children: ReactNode };
export function Link({ to, replace, onClick, target, children, ...props }: LinkProps) {
  const navigate = useNavigate();
  return <a href={to} target={target} {...props} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || target === "_blank") return;
    event.preventDefault();
    navigate(to, { replace });
  }}>{children}</a>;
}

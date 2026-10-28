import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/bill-forecast")({
  beforeLoad: () => {
    throw redirect({ to: "/forecast" });
  },
});

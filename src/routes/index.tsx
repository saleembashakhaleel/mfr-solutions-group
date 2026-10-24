
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: BlankPage,
  head: () => ({
    meta: [
      { title: "" },
      { name: "description", content: "" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});

function BlankPage() {
  return (
    <main
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#ffffff",
      }}
    />
  );
}

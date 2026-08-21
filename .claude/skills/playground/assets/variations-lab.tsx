/**
 * Variations lab — renders design alternatives of ONE component stacked
 * vertically against identical content, so they can be compared directly.
 *
 * Adapt: swap the route definition and SiteHeader for the host's idioms, and
 * point VARIATIONS at the real component variants. Name the file after the
 * thing being explored (e.g. diagram-lab.tsx, nav-lab.tsx).
 *
 * The rule that makes this useful: variation 01 is ALWAYS the current
 * production component, unmodified. Without a live baseline in the same
 * viewport, "is this better?" is unanswerable.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CoordinationDiagram } from "@/components/roadside/coordination-diagram";
import { SiteHeader } from "@/components/roadside/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagram-lab")({
  head: () => ({
    meta: [
      { title: "Diagram lab" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DiagramLab,
});

type Variation = {
  id: string;
  name: string;
  note: string;
  render: () => React.ReactNode;
};

const VARIATIONS: Variation[] = [
  {
    id: "current",
    name: "Current (production)",
    note: "The component shipping today — baseline for comparison.",
    render: () => <CoordinationDiagram />,
  },
  // Add concepts here. Give each a name AND a one-line rationale, so the
  // tradeoff being tested is legible without reading the code.
  // {
  //   id: "orbit",
  //   name: "Concept A · Orbit",
  //   note: "Radial. Most iconic at a glance.",
  //   render: () => <CoordinationDiagramOrbit />,
  // },
];

// Constrains the container, NOT the viewport — so `lg:` breakpoints do not
// fire. This tests content reflow at a given measure, not responsive behavior.
// For real breakpoint testing, resize the actual browser window.
const WIDTHS = [
  { id: "full", label: "Full", className: "max-w-none" },
  { id: "desktop", label: "Desktop 1120", className: "max-w-[1120px]" },
  { id: "tablet", label: "Tablet 768", className: "max-w-[768px]" },
  { id: "mobile", label: "Mobile 390", className: "max-w-[390px]" },
] as const;

function DiagramLab() {
  const [width, setWidth] = useState<(typeof WIDTHS)[number]["id"]>("full");
  const [grid, setGrid] = useState(false);

  const activeWidth = WIDTHS.find((w) => w.id === width) ?? WIDTHS[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="mb-8">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-primary">
            Internal · not linked from the site
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold uppercase">
            Diagram lab
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Variations rendered against the same content so they can be compared
            directly. Nothing here is wired into the live page until we pick a
            winner.
          </p>
        </header>

        <div className="sticky top-16 z-10 mb-8 flex flex-wrap items-center gap-2 border-y border-border/70 bg-background/90 py-3 backdrop-blur">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Width
          </span>
          {WIDTHS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => setWidth(w.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition",
                width === w.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {w.label}
            </button>
          ))}

          <span className="ml-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Overlay
          </span>
          <button
            type="button"
            onClick={() => setGrid((g) => !g)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition",
              grid
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            Baseline grid
          </button>
        </div>

        <div className="space-y-14">
          {VARIATIONS.map((variation, index) => (
            <section key={variation.id} id={variation.id}>
              <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-display text-lg font-bold uppercase">
                  {String(index + 1).padStart(2, "0")} · {variation.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {variation.note}
                </p>
              </div>

              <div
                className={cn(
                  "relative mx-auto w-full transition-[max-width] duration-200",
                  activeWidth.className,
                )}
              >
                {grid ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 [background-image:repeating-linear-gradient(to_bottom,color-mix(in_oklch,var(--primary)_18%,transparent)_0_1px,transparent_1px_8px)]"
                  />
                ) : null}
                {variation.render()}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

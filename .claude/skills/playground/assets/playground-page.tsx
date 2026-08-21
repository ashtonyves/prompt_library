/**
 * Route directory page. Adapt to the host framework:
 *  - Replace the route-definition block with the host's routing idiom.
 *  - Replace SiteHeader with the host's header (or delete it).
 *  - Keep the ENTRIES / GROUP_ORDER shape — the TOC, counts, and section
 *    ordering are all derived from it, so adding a route is one entry.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, ImageOff, LayoutGrid, List, FlaskConical } from "lucide-react";
import { SiteHeader } from "@/components/roadside/brand";

/**
 * Route mtimes, captured alongside the screenshots by the capture script.
 * Files whose mtime is a bogus pre-2000 epoch (archive extract, no git history)
 * are stored as null and rendered as "Modified unknown" rather than shown as a
 * misleading date.
 */
type Mtimes = Record<string, number | null>;

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Playground,
});

type Entry = {
  /** Written as a plain string so this page stays a directory, not a typed route graph. */
  href: string;
  title: string;
  note: string;
  file: string;
  /** Basename in /public/playground-shots. Omit when there's no capture. */
  shot?: string;
  group: string;
  /** Set when the screenshot shows a gate rather than the page itself. */
  gated?: string;
};

// One entry per route. Order within a group is render order.
const ENTRIES: Entry[] = [
  {
    href: "/",
    title: "Home",
    note: "Marketing entry point",
    file: "src/routes/index.tsx",
    shot: "home",
    group: "Marketing",
  },
  // ...add the rest of the host app's routes here.
];

/** Stable DOM id for a section, used by the TOC anchors and scroll-spy. */
function slugify(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Referenced by GROUP_ORDER and the isSandbox check so a rename can't
 *  silently drop the sandbox treatment. */
const SANDBOX_GROUP = "Design sandboxes";

// Sandboxes lead: they're what you're actively working in.
const GROUP_ORDER = [
  SANDBOX_GROUP,
  "Marketing",
  "Case views",
  "Agent console",
] as const;

const API_ROUTES: { pattern: string; file: string }[] = [
  // { pattern: "/api/example", file: "src/routes/api/example.ts" },
];

const API_HEADING = "API endpoints";

/** Every section in render order, with its item count for the TOC badge. */
const SECTIONS = [
  ...GROUP_ORDER.map((group) => ({
    id: slugify(group),
    label: group as string,
    count: ENTRIES.filter((e) => e.group === group).length,
  })),
  { id: slugify(API_HEADING), label: API_HEADING, count: API_ROUTES.length },
].filter((s) => s.count > 0);

/** Hoisted so the effect isn't re-run by a new array identity each render. */
const SECTION_IDS = SECTIONS.map((s) => s.id);

/**
 * Highlights the section currently in view.
 *
 * Uses scroll position, NOT IntersectionObserver: an observer-based version
 * pinned the first section, because short trailing sections never satisfied a
 * viewport-fraction threshold. The last heading scrolled past the sticky header
 * wins; at the very bottom the final section is promoted only if it is actually
 * on screen (without that visibility test, any page whose last section sits
 * below the fold gets pinned as soon as scrolling bottoms out).
 */
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const compute = () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return;

      // Offset clears the sticky header stack.
      const passed = elements.filter(
        (el) => el.getBoundingClientRect().top <= 140,
      );
      let current = passed[passed.length - 1] ?? elements[0];

      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && scrollTop >= maxScroll - 2) {
        const last = elements[elements.length - 1];
        if (last && last.getBoundingClientRect().top < window.innerHeight) {
          current = last;
        }
      }

      if (current) setActiveId(current.id);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids]);

  return activeId;
}

function TableOfContents({
  sections,
  activeId,
}: {
  sections: typeof SECTIONS;
  activeId: string;
}) {
  return (
    <nav
      aria-label="Sections"
      className={
        // Mobile: sticky chip rail pinned under the site header (h-16), so
        // section jumps stay reachable while scrolling.
        // Desktop: sticky sidebar column.
        "sticky top-16 z-10 -mx-4 mb-8 border-b border-border/70 bg-background/95 px-4 py-3 backdrop-blur " +
        "lg:top-24 lg:z-0 lg:mx-0 lg:mb-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
      }
    >
      <p className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-muted-foreground lg:mb-3">
        On this page
      </p>
      {/* Horizontal scroll on mobile keeps every section reachable without
          wrapping to two lines and eating vertical space. */}
      <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} className="shrink-0 lg:shrink">
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center justify-between gap-2 whitespace-nowrap rounded-md border px-3 py-1.5 text-xs font-semibold transition lg:whitespace-normal lg:border-0 lg:border-l-2 lg:pl-3 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground lg:bg-transparent lg:text-primary"
                    : "border-border text-muted-foreground hover:text-foreground lg:border-border/70 lg:hover:border-primary/50"
                }`}
              >
                <span>{section.label}</span>
                <span
                  className={
                    isActive
                      ? "text-primary-foreground/80 lg:text-primary/70"
                      : "text-muted-foreground/70"
                  }
                >
                  {section.count}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type ViewMode = "cards" | "list";
const VIEW_STORAGE_KEY = "playground:view";

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  const options: { id: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
    { id: "cards", label: "Cards", icon: LayoutGrid },
    { id: "list", label: "List", icon: List },
  ];

  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex overflow-hidden rounded-md border border-border/70"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = view === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function formatDate(ms: number | null | undefined) {
  if (!ms) return "Modified unknown";
  return new Date(ms).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Playground() {
  const [dates, setDates] = useState<Mtimes>({});
  const activeId = useActiveSection(SECTION_IDS);
  // Starts as "cards" on both server and client; the stored preference is
  // applied after mount so SSR markup and first client render match.
  const [view, setView] = useState<ViewMode>("cards");

  useEffect(() => {
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    if (stored === "cards" || stored === "list") setView(stored);
  }, []);

  const changeView = (next: ViewMode) => {
    setView(next);
    localStorage.setItem(VIEW_STORAGE_KEY, next);
  };

  useEffect(() => {
    let active = true;
    fetch("/playground-shots/mtimes.json")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: Mtimes) => {
        if (active) setDates(data);
      })
      .catch(() => {
        /* Dates are a nicety — the directory still works without them. */
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Smooth anchor jumps, scoped to this page — the scroll container is
          <html>, so a class on a child element wouldn't apply. */}
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <header className="mb-6">
          <p className="font-display text-xs font-bold uppercase tracking-wide text-primary">
            Internal · not linked from the site
          </p>
          {/* Single row at every width — the toggle is what keeps the header
              from stacking, so it must not wrap onto its own line. */}
          <div className="mt-2 flex items-center justify-between gap-3">
            <h1 className="font-display text-3xl font-bold uppercase">
              Playground
            </h1>
            <div className="shrink-0">
              <ViewToggle view={view} onChange={changeView} />
            </div>
          </div>
        </header>

        <div className="gap-10 lg:grid lg:grid-cols-[200px_1fr] lg:items-start">
          <TableOfContents sections={SECTIONS} activeId={activeId} />

          <div className="space-y-12">
            {GROUP_ORDER.map((group) => {
              const entries = ENTRIES.filter((e) => e.group === group);
              if (entries.length === 0) return null;

              // Sandboxes are internal tooling, not part of the product. The
              // dashed, tinted container marks them as "scaffolding" rather
              // than just drawing another box around a section.
              const isSandbox = group === SANDBOX_GROUP;

              return (
                <section
                  key={group}
                  id={slugify(group)}
                  className={
                    isSandbox
                      ? "scroll-mt-28 rounded-xl border border-dashed border-primary/30 bg-muted/40 p-5 sm:p-6"
                      : "scroll-mt-28"
                  }
                >
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="font-display text-lg font-bold uppercase">
                      {group}
                    </h2>
                    {isSandbox ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        <FlaskConical className="h-3 w-3" aria-hidden />
                        Internal
                      </span>
                    ) : null}
                  </div>

                  {view === "cards" ? (
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {entries.map((entry) => (
                        <li key={entry.href}>
                          <Card entry={entry} modified={dates?.[entry.file]} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="divide-y divide-border/70 overflow-hidden rounded-lg border border-border/70">
                      {entries.map((entry) => (
                        <li key={entry.href}>
                          <Row entry={entry} modified={dates?.[entry.file]} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}

            {API_ROUTES.length > 0 ? (
              <section id={slugify(API_HEADING)} className="scroll-mt-28">
                <h2 className="font-display text-lg font-bold uppercase">
                  {API_HEADING}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Server routes — listed for reference, not viewable in a
                  browser.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {API_ROUTES.map((route) => (
                    <li
                      key={route.pattern}
                      className="rounded-full border border-border/70 px-3 py-1"
                    >
                      <code className="text-xs text-muted-foreground">
                        {route.pattern}
                      </code>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  entry,
  modified,
}: {
  entry: Entry;
  modified: number | null | undefined;
}) {
  const isDynamic = entry.href.includes("$") || entry.href.includes(":");

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/70 bg-muted">
        {entry.shot ? (
          <img
            src={`/playground-shots/${entry.shot}.png`}
            alt={`Screenshot of ${entry.title}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="h-5 w-5" aria-hidden />
            <span className="text-xs">No capture</span>
          </div>
        )}

        {entry.gated ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur">
            <Lock className="h-3 w-3" aria-hidden />
            Gated
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <h3 className="font-display text-sm font-bold uppercase leading-tight">
          {entry.title}
        </h3>
        <code className="mt-1 block truncate text-xs text-primary">
          {entry.href}
        </code>
        <p className="mt-2 text-xs text-muted-foreground">{entry.note}</p>
        {entry.gated ? (
          <p className="mt-1 text-xs text-muted-foreground">{entry.gated}</p>
        ) : null}
        <p className="mt-3 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
          {formatDate(modified)}
        </p>
      </div>
    </>
  );

  const shell =
    "group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-background transition";

  // Dynamic routes have no linkable URL — render as a non-interactive card.
  if (isDynamic) {
    return <div className={`${shell} opacity-70`}>{inner}</div>;
  }

  // Plain anchor, not a router Link: the router would intercept the click and
  // navigate in place, defeating target="_blank".
  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      className={`${shell} hover:border-primary/50 hover:shadow-sm`}
    >
      {inner}
    </a>
  );
}

/** Compact one-line row — the dense-scanning alternative to cards. */
function Row({
  entry,
  modified,
}: {
  entry: Entry;
  modified: number | null | undefined;
}) {
  const isDynamic = entry.href.includes("$") || entry.href.includes(":");

  const inner = (
    <>
      <span className="font-display text-sm font-bold uppercase">
        {entry.title}
      </span>
      <code className="text-xs text-primary">{entry.href}</code>
      {entry.gated ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          <Lock className="h-3 w-3" aria-hidden />
          Gated
        </span>
      ) : null}
      <span className="ml-auto flex items-center gap-4">
        <span className="hidden text-xs text-muted-foreground sm:inline">
          {entry.note}
        </span>
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {formatDate(modified)}
        </span>
      </span>
    </>
  );

  const shell =
    "flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-3 transition";

  if (isDynamic) {
    return <div className={`${shell} opacity-70`}>{inner}</div>;
  }

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      className={`${shell} bg-background hover:bg-accent`}
    >
      {inner}
    </a>
  );
}

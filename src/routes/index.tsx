import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Coffee,
  Heart,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

import chocolateAsset from "../assets/chocolate.png.asset.json";
import classicAsset from "../assets/classic.png.asset.json";
import flyingAsset from "../assets/flying.png.asset.json";
import premiumAsset from "../assets/premium.png.asset.json";
import signatureAsset from "../assets/signature.png.asset.json";
import specialAsset from "../assets/special.png.asset.json";

type CoffeeItem = {
  name: string;
  price: number;
  image: string;
  description: string;
};

const coffees: [CoffeeItem, ...CoffeeItem[]] = [
  {
    name: "Classic Coffee",
    price: 11,
    image: classicAsset.url,
    description: "Freshly prepared coffee with a rich aroma and smooth taste.",
  },
  {
    name: "Flying Coffee",
    price: 13,
    image: flyingAsset.url,
    description: "A beautiful coffee creation with a smooth and refreshing taste.",
  },
  {
    name: "Premium Coffee",
    price: 15,
    image: premiumAsset.url,
    description: "Premium coffee prepared with carefully selected ingredients.",
  },
  {
    name: "Cafe Special",
    price: 17,
    image: specialAsset.url,
    description: "Our special cafe drink with a rich flavour and creamy finish.",
  },
  {
    name: "Signature Coffee",
    price: 19,
    image: signatureAsset.url,
    description: "A signature coffee with a premium cafe-style presentation.",
  },
  {
    name: "Chocolate Coffee",
    price: 21,
    image: chocolateAsset.url,
    description: "A delicious chocolate coffee with a rich and smooth finish.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coffee House — Premium Café Menu" },
      {
        name: "description",
        content: "Explore Coffee House's premium coffee menu, signature drinks, and daily specials.",
      },
      { property: "og:title", content: "Coffee House — Premium Café Menu" },
      {
        property: "og:description",
        content: "Rich coffee, smooth flavours, and premium café favourites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CafeMenu,
});

function AppButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function CafeMenu() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CoffeeItem | null>(null);
  const [specialIndex, setSpecialIndex] = useState(0);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return normalized
      ? coffees.filter((coffee) => coffee.name.toLowerCase().includes(normalized))
      : coffees;
  }, [query]);

  const special = coffees[specialIndex] ?? coffees[0];

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const toggleFavourite = (name: string) => {
    setFavourites((current) => {
      const next = new Set(current);
      if (next.has(name)) {
        next.delete(name);
        setToast("Removed from favourites");
      } else {
        next.add(name);
        setToast("Added to favourites");
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-page-shell px-0 py-0 sm:px-5 sm:py-8">
      <main className="relative mx-auto min-h-screen w-full max-w-[460px] overflow-hidden bg-background shadow-cafe sm:min-h-[880px] sm:rounded-[28px]">
        <header className="relative overflow-hidden rounded-b-[32px] bg-primary px-6 pb-11 pt-9 text-primary-foreground">
          <div className="absolute -right-10 -top-16 h-44 w-44 rounded-full border border-primary-foreground/10" />
          <div className="absolute -right-2 -top-7 h-28 w-28 rounded-full border border-primary-foreground/10" />
          <div className="relative flex items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-foreground text-primary shadow-soft">
              <Coffee size={28} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-[25px] font-bold leading-tight">Coffee House</p>
              <p className="mt-1 text-xs text-primary-foreground/70">Good coffee. Good mood.</p>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-5 -mt-5 flex h-16 items-center gap-3 rounded-2xl border border-border bg-card px-4 shadow-soft">
          <Search className="text-primary" size={21} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search your coffee..."
            aria-label="Search menu"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <AppButton
              onClick={() => setQuery("")}
              aria-label="Clear search"
              title="Clear search"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X size={17} />
            </AppButton>
          )}
        </div>

        <section className="px-5 pb-2 pt-9" aria-labelledby="menu-heading">
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-foreground">Freshly crafted</p>
              <h1 id="menu-heading" className="font-display text-[30px] font-bold leading-none text-foreground">New Menu</h1>
            </div>
            <AppButton
              onClick={() => {
                setQuery("");
                setToast("Showing all menu items");
              }}
              className="mb-0.5 gap-1 rounded-md px-1 py-1 text-sm font-semibold text-primary hover:text-accent-foreground"
            >
              View all <ArrowRight size={15} aria-hidden="true" />
            </AppButton>
          </div>

          <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-6 pt-7">
            {filtered.length ? (
              filtered.map((coffee) => (
                <article
                  key={coffee.name}
                  onClick={() => setSelected(coffee)}
                  className="group relative min-w-[168px] max-w-[168px] snap-start cursor-pointer overflow-hidden rounded-lg border border-border bg-card p-3 shadow-card transition-transform duration-200 hover:-translate-y-1"
                >
                  <AppButton
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavourite(coffee.name);
                    }}
                    aria-label={`${favourites.has(coffee.name) ? "Remove" : "Add"} ${coffee.name} ${favourites.has(coffee.name) ? "from" : "to"} favourites`}
                    title="Favourite"
                    className={`absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-card shadow-soft ${
                      favourites.has(coffee.name) ? "text-favourite" : "text-muted-foreground"
                    }`}
                  >
                    <Heart size={17} fill={favourites.has(coffee.name) ? "currentColor" : "none"} />
                  </AppButton>
                  <div className="grid h-36 place-items-center rounded-md bg-muted">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="h-32 w-32 object-contain drop-shadow-[0_10px_8px_var(--image-shadow)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-3 min-h-10 text-[15px] font-bold leading-tight text-foreground">{coffee.name}</h2>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-primary">${coffee.price.toFixed(2)}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                      <ArrowRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <div className="flex h-56 w-full flex-col items-center justify-center text-center text-muted-foreground">
                <Coffee size={34} strokeWidth={1.5} />
                <p className="mt-3 text-sm">No coffee found</p>
              </div>
            )}
          </div>
        </section>

        <section className="relative mx-5 mb-8 mt-3 min-h-[270px] overflow-hidden rounded-lg bg-primary px-5 py-6 text-primary-foreground shadow-cafe" aria-label="Coffee special">
          <div className="absolute -right-16 -top-12 h-64 w-64 rounded-full bg-special-ring" />
          <div className="absolute -bottom-28 -left-20 h-52 w-52 rounded-full border border-primary-foreground/10" />
          <div className="relative z-10 w-[46%]">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">
              <Sparkles size={12} aria-hidden="true" /> Special
            </div>
            <h2 className="font-display text-[31px] font-bold leading-[0.98]">{special.name}</h2>
            <p className="mt-4 font-display text-xl font-bold text-highlight">${special.price.toFixed(2)}</p>
          </div>
          <img
            key={special.name}
            src={special.image}
            alt={special.name}
            className="special-enter absolute -right-3 top-7 h-56 w-56 object-contain drop-shadow-[0_18px_12px_var(--image-shadow-strong)]"
          />
          <div className="absolute bottom-5 left-5 z-20 flex gap-2.5">
            {coffees.slice(0, 3).map((coffee, index) => (
              <AppButton
                key={coffee.name}
                onClick={() => setSpecialIndex(index)}
                aria-label={`Show ${coffee.name} special`}
                title={coffee.name}
                className={`h-12 w-12 rounded-full border p-1 ${
                  specialIndex === index
                    ? "border-highlight bg-primary-foreground shadow-soft"
                    : "border-primary-foreground/20 bg-primary-foreground/10"
                }`}
              >
                <img src={coffee.image} alt="" className="h-full w-full object-contain" />
              </AppButton>
            ))}
          </div>
        </section>

        {selected && (
          <section className="fixed inset-0 z-50 overflow-y-auto bg-overlay p-0 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <div className="mx-auto flex min-h-full w-full max-w-[460px] flex-col overflow-hidden bg-background shadow-cafe sm:min-h-0 sm:rounded-[28px]">
              <header className="flex items-center justify-between px-5 py-5">
                <AppButton onClick={() => setSelected(null)} aria-label="Go back" title="Go back" className="h-11 w-11 rounded-full border border-border bg-card text-foreground hover:bg-muted">
                  <ArrowLeft size={20} />
                </AppButton>
                <p className="font-display text-xl font-bold">Details</p>
                <AppButton
                  onClick={() => toggleFavourite(selected.name)}
                  aria-label="Toggle favourite"
                  title="Favourite"
                  className={`h-11 w-11 rounded-full border border-border bg-card ${favourites.has(selected.name) ? "text-favourite" : "text-foreground"}`}
                >
                  <Heart size={20} fill={favourites.has(selected.name) ? "currentColor" : "none"} />
                </AppButton>
              </header>
              <div className="relative flex min-h-[670px] flex-1 flex-col overflow-hidden rounded-t-[34px] bg-primary px-6 pb-8 pt-9 text-primary-foreground">
                <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-special-ring" />
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-highlight">Coffee House signature</p>
                  <h1 id="detail-title" className="mt-2 max-w-[280px] font-display text-[38px] font-bold leading-[0.98]">{selected.name}</h1>
                  <div className="mt-4 flex items-center gap-2 text-highlight">
                    <div className="flex" aria-label="Rated 4.8 out of 5">
                      {[0, 1, 2, 3, 4].map((star) => <Star key={star} size={15} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-bold text-primary-foreground">4.8</span>
                  </div>
                </div>
                <div className="relative z-10 grid flex-1 place-items-center py-4">
                  <img src={selected.image} alt={selected.name} className="h-72 w-72 object-contain drop-shadow-[0_24px_18px_var(--image-shadow-strong)]" />
                </div>
                <div className="relative z-10 border-t border-primary-foreground/15 pt-5">
                  <p className="font-display text-lg font-bold">Description</p>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-primary-foreground/70">{selected.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">Price</p>
                      <p className="font-display text-3xl font-bold text-highlight">${selected.price.toFixed(2)}</p>
                    </div>
                    <AppButton onClick={() => setToast(`${selected.name} selected`)} className="h-12 gap-2 rounded-md bg-primary-foreground px-5 text-sm font-bold text-primary shadow-soft hover:bg-highlight">
                      Choose drink <ArrowRight size={17} />
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-md bg-toast px-4 py-3 text-sm font-semibold text-toast-foreground shadow-cafe transition-all duration-200 ${
            toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          {toast}
        </div>
      </main>
    </div>
  );
}
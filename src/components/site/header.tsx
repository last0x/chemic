import Link from "next/link";
import Image from "next/image";

type Tab = "engineering" | "home";

const tabClass = (active: boolean) =>
  `rounded-sm border px-3 py-1.5 hover:text-primary ${
    active
      ? "border-border bg-primary-tint text-primary"
      : "border-transparent"
  }`;

export function Header({ active = "engineering" }: { active?: Tab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-3 px-4 md:gap-6 md:px-6">
       
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <span
            className="text-sm font-bold uppercase leading-none tracking-[0.02em] md:text-base"
            style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
          >
            <span className="text-secondary">Chemic</span>{" "}
            <span className="text-primary">Engineering</span>
          </span> */}

          <Image
              src="/chemic-logo.svg"
              alt=""
              width={56}
              height={56}
              className="h-10 w-10 shrink-0 md:h-12 md:w-12"
            />

        <nav
          className={`flex items-center gap-3 text-xs uppercase tracking-widest text-ink-soft md:gap-6 md:text-sm ${
            active === "home" ? "font-medium" : "font-mono"
          }`}
        >
          <Link href="/" className={tabClass(active === "engineering")}>
            ENGINEERING
          </Link>
          <Link href="/home" className={tabClass(active === "home")}>
            HOME
          </Link>
        </nav>
      </div>
    </header>
  );
}

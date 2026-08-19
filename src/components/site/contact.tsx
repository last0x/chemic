import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "6596664158"; // +65 9666 4158

const WHATSAPP_MESSAGES = {
  engineering: "Hi, I'd like to find out more about your engineering services.",
  home: "Hi, I'd like to find out more about Chemic Home networking and smart home.",
} as const;

function whatsappHref(variant: keyof typeof WHATSAPP_MESSAGES) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[variant])}`;
}

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.03 3C9.1 3 3.46 8.55 3.46 15.4c0 2.35.65 4.55 1.79 6.44L3 29l7.4-2.19a12.9 12.9 0 0 0 5.63 1.3h.01c6.93 0 12.57-5.55 12.57-12.4C28.6 8.86 22.96 3 16.03 3zm0 22.68h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.4 1.3 1.32-4.24-.25-.44a10.16 10.16 0 0 1-1.6-5.5C5.3 9.69 10.13 5.1 16.03 5.1c2.85 0 5.53 1.1 7.55 3.1a10.32 10.32 0 0 1 3.02 7.2c0 5.7-4.83 10.29-10.57 10.29zm5.8-7.7c-.32-.16-1.89-.92-2.18-1.03-.29-.11-.5-.16-.72.16-.21.32-.83 1.03-1.02 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.55a9.5 9.5 0 0 1-1.76-2.16c-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.72-1.72-.99-2.35-.26-.63-.53-.54-.72-.55h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.38 5.38 4.74.75.32 1.34.51 1.8.66.76.24 1.44.21 1.99.13.61-.09 1.89-.77 2.15-1.51.27-.75.27-1.39.19-1.51-.08-.13-.29-.21-.61-.37z" />
    </svg>
  );
}

const DETAILS = [
  {
    label: "Address",
    value: (
      <>
        61 Kaki Bukit Avenue 1, #06-25
        <br />
        Shun Li Industrial Park, Singapore 417943
      </>
    ),
  },
  {
    label: "Call",
    value: <>+65 6747 3035</>,
  },
  {
    label: "Email",
    value: (
      <a href="mailto:contact@chemic.sg" className="hover:text-primary">
        contact@chemic.sg
      </a>
    ),
  },
];

export function Contact({
  variant = "engineering",
}: {
  variant?: "engineering" | "home";
}) {
  const isHome = variant === "home";

  return (
    <section
      id="contact"
      className={cn(
        "px-4 py-10 md:px-6 md:py-16",
        isHome ? "bg-surface" : "bp-grid bp-corners",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-xl flex-col p-5 md:p-8",
          isHome
            ? "rounded-2xl bg-[#f1f9f4]"
            : "bp-corners rounded-lg bg-[#f1f9f4]",
        )}
      >
        <p
          className={cn(
            "text-xs tracking-widest text-primary md:tracking-[0.2em]",
            isHome ? "font-medium uppercase" : "font-mono uppercase",
          )}
        >
          Contact
        </p>
        <h2
          className={cn(
            "mt-3 text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-5xl",
            isHome ? "font-display" : "font-serif",
          )}
        >
          Let&apos;s talk about {isHome ? "your home" : "your line"}
        </h2>

        <dl className="mt-10 space-y-6 border-t border-border pt-8">
          {DETAILS.map((d) => (
            <div key={d.label} className="flex gap-6">
              <dt
                className={cn(
                  "w-24 shrink-0 text-xs uppercase tracking-widest text-ink-soft",
                  isHome ? "font-medium" : "font-mono",
                )}
              >
                {d.label}
              </dt>
              <dd className="text-sm leading-relaxed text-ink">{d.value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <a
            href={whatsappHref(variant)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-8 inline-flex h-auto min-h-12 w-full items-center justify-center gap-2 whitespace-normal rounded-md bg-build px-4 py-3 text-center text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-6",
              isHome ? "rounded-full font-medium" : "font-mono",
            )}
          >
            <WhatsAppMark className="h-4 w-4" />
            Chat immediately on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

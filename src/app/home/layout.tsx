import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Chemic Home | Home Networking and Smart Home",
  description:
    "Your long-term digital home partner — PoE networking, Wi-Fi, and smart home, built to last.",
};

export default function HomeLayout({ children }: LayoutProps<"/home">) {
  return (
    <div
      className={`${fraunces.variable} home-theme flex min-h-full flex-1 flex-col bg-bg text-ink`}
    >
      {children}
    </div>
  );
}

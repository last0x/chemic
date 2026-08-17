export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-xs text-ink-soft md:flex-row md:items-center md:justify-between md:px-6">
        <p className="font-mono uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Chemic Engineering Services Pte Ltd. 
        </p>
        <div className="flex gap-2 font-mono uppercase tracking-widest">
          Made by
          <a href="https://dotcode.xyz" className="text-primary/90 hover:text-primary">dotcode</a>
        </div>
      </div>
    </footer>
  );
}

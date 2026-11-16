export function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>;
}

export function Action({ href, children, variant = "yellow", arrow = true }) {
  return <a href={href} className={`action action--${variant}`}>{children}{arrow && <Arrow />}</a>;
}

export function Kicker({ children }) {
  return <p className="kicker">{children}</p>;
}

const symbols = {
  leaf: "M4 19c-4-8 4-14 16-16 0 12-4 19-13 17M3 22 14 11",
  shield: "M12 2c3 3 6 4 9 4v6c0 5-4 8-9 11-5-3-9-6-9-11V6c3 0 6-1 9-4Zm-4 10 3 3 5-6",
  quality: "M12 2l3 2 3 1 1 3 2 3-1 3-2 3-3 1-3 2-3-2-3-1-2-3-1-3 2-3 1-3 3-1 3-2ZM8 18l-2 4 5-1m5-3 2 4-5-1m3-10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  gear: "M9 3h6l1 3 3 1 2 4-2 2v3l-3 2-1 3H9l-1-3-3-2v-3l-2-2 2-4 3-1 1-3Zm7 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  chart: "M3 22v-6h4v6H3Zm7 0V12h4v10h-4Zm7 0V8h4v14h-4ZM2 12l6-6 4 3 8-7m-5 0h5v5",
  headset: "M4 15v-3a8 8 0 0 1 16 0v4a5 5 0 0 1-5 5h-3M4 12H3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v-7H4Zm16 0h1a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v-7h1Zm-7 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
};

export function Icon({ name }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round"><path d={symbols[name]} /></svg>;
}

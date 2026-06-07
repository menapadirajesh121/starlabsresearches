import { useEffect, useRef } from "react";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function useCardAnimation(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const el = ref.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(".card-animate"));

    // Reset so re-filtered cards animate in again
    cards.forEach((card) => card.classList.remove("in-view"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target);
            entry.target.style.animationDelay = `${idx * 0.07}s`;
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

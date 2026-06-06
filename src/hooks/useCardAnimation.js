import { useEffect, useRef } from "react";

export default function useCardAnimation() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll(".card-animate");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.animationDelay = `${i * 0.08}s`;
          e.target.classList.add("in-view");
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);
  return ref;
}

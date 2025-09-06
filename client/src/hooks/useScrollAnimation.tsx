import { useEffect, useRef } from "react";

export function useScrollAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    element.classList.add("opacity-0", "translate-y-4", "transition-all", "duration-700");
    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return elementRef;
}

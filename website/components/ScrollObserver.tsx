"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Honor prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.querySelectorAll(".reveal-on-scroll, .reveal-scale-up, .reveal-fade-in, .reveal-left, .reveal-right, [data-reveal]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.08,
    });

    const registerElements = () => {
      const selectors = [
        ".reveal-on-scroll",
        ".reveal-scale-up",
        ".reveal-fade-in",
        ".reveal-left",
        ".reveal-right",
        "[data-reveal]",
      ].join(", ");

      const elements = document.querySelectorAll(selectors);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If already in viewport on mount, reveal promptly
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("is-revealed");
        } else if (!el.classList.contains("is-revealed")) {
          observer.observe(el);
        }
      });
    };

    registerElements();

    // Re-check as dynamic content arrives (e.g. Firebase fetch)
    const mutationObserver = new MutationObserver(() => {
      registerElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}

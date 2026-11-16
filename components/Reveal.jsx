"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    function openLinkedSegment() {
      const id = window.location.hash.slice(1);
      if (!id.startsWith("segmento-")) return;
      const target = document.getElementById(id);
      if (target instanceof HTMLDetailsElement) target.open = true;
    }
    openLinkedSegment();
    window.addEventListener("hashchange", openLinkedSegment);
    return () => window.removeEventListener("hashchange", openLinkedSegment);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add("revealed");
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".section-copy, .market, .interactive-card, .case-card, .catalog-card, .feature-photo, .product-photo, .petro-area, .petro-case-lead, .prime-content, .petro-scenarios article").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}

import { Injectable } from '@angular/core';

type LenisLike = {
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void;
  stop?: () => void;
  start?: () => void;
};

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private lenis: LenisLike | null = null;

  register(lenis: LenisLike): void {
    this.lenis = lenis;
  }

  scrollTo(target: string, offsetPx = 0): void {
    if (typeof document === 'undefined') return;
    const el = document.querySelector(target) as HTMLElement | null;
    if (!el) return;

    if (this.lenis) {
      const px = el.getBoundingClientRect().top + window.scrollY + offsetPx;
      this.lenis.scrollTo(px, { duration: 0.9 });
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  setLocked(locked: boolean): void {
    if (!this.lenis) return;
    if (locked) this.lenis.stop?.();
    else this.lenis.start?.();
  }
}

import { Component, afterNextRender, inject } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar';
import { HeroComponent } from './sections/hero/hero';
import { AboutComponent } from './sections/about/about';
import { ReleaseComponent } from './sections/release/release';
import { GalleryComponent } from './sections/gallery/gallery';
import { StreamingComponent } from './sections/streaming/streaming';
import { SocialsComponent } from './sections/socials/socials';
import { FooterComponent } from './sections/footer/footer';
import { LoaderComponent } from './shared/loader/loader';
import { ScrollService } from './services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoaderComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ReleaseComponent,
    GalleryComponent,
    StreamingComponent,
    SocialsComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private scrollService = inject(ScrollService);

  constructor() {
    afterNextRender(() => {
      this.bootstrap();
    });
  }

  private async bootstrap(): Promise<void> {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]);

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    this.scrollService.register(lenis);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
      gsap.set(el, { opacity: 0, y: 16 });
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    this.setupIframeGuards();
  }

  private setupIframeGuards(): void {
    document.querySelectorAll<HTMLIFrameElement>('iframe').forEach((iframe) => {
      const wrapper = iframe.parentElement;
      if (!wrapper) return;

      // Ensure wrapper is a positioning context for the guard
      if (getComputedStyle(wrapper).position === 'static') {
        wrapper.style.position = 'relative';
      }

      const guard = document.createElement('div');
      guard.style.cssText = 'position:absolute;inset:0;z-index:1;';
      wrapper.appendChild(guard);

      // Forward wheel events to Lenis instead of letting the iframe eat them
      guard.addEventListener('wheel', (e) => {
        e.preventDefault();
        window.dispatchEvent(new WheelEvent('wheel', {
          deltaY: e.deltaY,
          deltaX: e.deltaX,
          deltaMode: e.deltaMode,
          bubbles: true,
        }));
      }, { passive: false });

      // Briefly step aside so clicks/taps reach the iframe player controls
      const release = () => {
        guard.style.pointerEvents = 'none';
        setTimeout(() => (guard.style.pointerEvents = ''), 300);
      };
      guard.addEventListener('mousedown', release);
      guard.addEventListener('touchend', release, { passive: true });
    });
  }
}

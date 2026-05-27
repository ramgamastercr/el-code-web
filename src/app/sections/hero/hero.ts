import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  PLATFORM_ID,
  inject,
  OnDestroy,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnDestroy {
  @ViewChild('matrixCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  currentMotto = signal('');

  private platformId = inject(PLATFORM_ID);
  private rafId = 0;
  private typeTimeout: ReturnType<typeof setTimeout> | null = null;
  private resizeHandler: (() => void) | null = null;
  private visibilityHandler: (() => void) | null = null;

  private readonly mottos = [
    'Música, Arte y Códigos, <EL CODE> es #1...',
    'Música programada para hackear corazones <3...',
    'La matrix es un error, el glitch somos nosotros...',
    'Somos dueños de nuestros códigos, arquitectos de nuestro destino...',
    '<EL CODE> es presente, pasado y futuro...',
    'Música codificada desde los nucleos del kernel...',
    'Sentimientos reales en un mundo artificial...',
  ];

  private mottoIndex = 0;
  private charIndex = 0;
  private isDeleting = false;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.initMatrix();
      this.startTypewriter();
      this.animateEntrance();
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.typeTimeout) clearTimeout(this.typeTimeout);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.visibilityHandler) document.removeEventListener('visibilitychange', this.visibilityHandler);
  }

  private initMatrix(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const fontSize  = isMobile ? 13 : 14;
    const colWidth  = isMobile ? 26 : 14;   // wider cols → fewer drops on mobile
    const chars = 'アイウエオカキクケコ01001101ABCDEFabcdef0123456789!@#';

    // Cap mobile at 24 fps — ~2.5× less CPU work than 60 fps
    const frameInterval = isMobile ? 1000 / 24 : 0;
    let lastFrameTime = 0;

    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      columns = Math.floor(canvas.width / colWidth);
      drops   = Array(columns).fill(1);
    };

    resize();
    this.resizeHandler = resize;
    window.addEventListener('resize', this.resizeHandler);

    // Free the CPU when the tab goes to background
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
      } else if (!this.rafId) {
        this.rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    this.visibilityHandler = handleVisibility;

    const trailAlpha = isMobile ? 0.07 : 0.04;

    const draw = (timestamp: number) => {
      this.rafId = requestAnimationFrame(draw);

      if (frameInterval && timestamp - lastFrameTime < frameInterval) return;
      lastFrameTime = timestamp;

      ctx.fillStyle = `rgba(0, 0, 0, ${trailAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const r = Math.random();
        if (r > 0.97) {
          ctx.fillStyle = 'rgba(200, 255, 230, 1.0)';
        } else if (r > 0.07) {
          ctx.fillStyle = `rgba(0, 255, 156, ${Math.random() * 0.35 + 0.65})`;
        } else {
          ctx.fillStyle = 'rgba(0, 255, 156, 0.35)';
        }
        ctx.fillText(char, i * colWidth, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.978) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    this.rafId = requestAnimationFrame(draw);
  }

  private startTypewriter(): void {
    const tick = () => {
      const motto = this.mottos[this.mottoIndex];
      if (this.isDeleting) {
        this.currentMotto.set(motto.substring(0, this.charIndex - 1));
        this.charIndex--;
      } else {
        this.currentMotto.set(motto.substring(0, this.charIndex + 1));
        this.charIndex++;
      }

      let delay = this.isDeleting ? 40 : 90;
      if (!this.isDeleting && this.charIndex === motto.length) {
        delay = 2800;
        this.isDeleting = true;
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.mottoIndex = (this.mottoIndex + 1) % this.mottos.length;
        delay = 400;
      }
      this.typeTimeout = setTimeout(tick, delay);
    };

    this.typeTimeout = setTimeout(tick, 800);
  }

  private async animateEntrance(): Promise<void> {
    // Skip GSAP import on mobile — saves the 70 KB dynamic load while resources are already loading
    if (window.innerWidth < 768) return;
    const { gsap } = await import('gsap');
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from('.hero-tag',      { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.hero-title',    { y: 70, opacity: 0, duration: 1.1, ease: 'power4.out' }, '-=0.4')
      .from('.hero-motto',    { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.hero-scroll',   { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4');
  }
}

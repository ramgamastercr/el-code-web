import {
  Component,
  signal,
  HostListener,
  PLATFORM_ID,
  inject,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);

  readonly links = [
    { label: 'Artista',   target: '#about' },
    { label: 'Release',   target: '#release' },
    { label: 'Galería',   target: '#gallery' },
    { label: 'Streaming', target: '#streaming' },
    { label: 'Contacto',     target: '#socials' },
  ];

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const open = this.isMenuOpen();
      document.body.classList.toggle('menu-open', open);
      this.scrollService.setLocked(open);
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 40);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  handleNav(event: Event, target: string): void {
    event.preventDefault();
    this.isMenuOpen.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('menu-open');
    }
    this.scrollService.setLocked(false);
    this.scrollService.scrollTo(target);
  }
}

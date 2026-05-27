import { Component, signal, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface ConsoleLine {
  text: string;
}

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class LoaderComponent implements OnInit {
  protected visible  = signal(true);
  protected exiting  = signal(false);
  protected progress = signal(0);
  protected lines    = signal<ConsoleLine[]>([]);

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.style.overflow = 'hidden';
    this.run();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }

  private push(text: string): void {
    this.lines.update(ls => [...ls, { text }]);
  }

  private async run(): Promise<void> {
    const pageReady = new Promise<void>(resolve => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    const minDuration = this.delay(3000);

    await this.delay(250);
    this.push('BOOT: EL_CODE_OS v1.0.0');
    this.progress.set(8);

    await this.delay(550);
    this.push('FREQ: CONNECTING TO NEON_FREQUENCY...');
    this.progress.set(22);

    await this.delay(650);
    this.push('LOAD: identity.module ............. OK');
    this.progress.set(42);

    await this.delay(600);
    this.push('LOAD: audio.streams ............... OK');
    this.progress.set(60);

    await this.delay(650);
    this.push('LOAD: visual.matrix ............... OK');
    this.progress.set(76);

    await this.delay(500);
    this.push('INIT: scroll.engine ............... OK');
    this.progress.set(90);

    await Promise.all([pageReady, minDuration]);

    this.push('CHECK: ALL_SYSTEMS ................ PASS');
    this.progress.set(100);

    await this.delay(380);
    this.push('> BIENVENIDO A LA FRECUENCIA_');

    await this.delay(900);

    document.documentElement.style.overflow = '';
    this.exiting.set(true);
    await this.delay(750);
    this.visible.set(false);
  }
}

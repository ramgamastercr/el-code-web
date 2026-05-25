import { Component, inject } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-release',
  standalone: true,
  templateUrl: './release.html',
})
export class ReleaseComponent {
  private scrollService = inject(ScrollService);

  scrollTo(event: Event, target: string): void {
    event.preventDefault();
    this.scrollService.scrollTo(target, -100);
  }
}

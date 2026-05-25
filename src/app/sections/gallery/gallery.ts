import { Component } from '@angular/core';

interface GalleryItem {
  id: number;
  code: string;
  label: string;
  src: string;
  alt: string;
  cls: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.html',
})
export class GalleryComponent {
  items: GalleryItem[] = [
    {
      id: 1,
      code: 'IMG_001',
      label: 'Studio Session',
      src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop',
      alt: 'EL CODE — Sesión de estudio urbano futurista',
      cls: 'col-span-12 md:col-span-7 lg:col-span-7 h-[280px] md:h-[420px]',
    },
    {
      id: 2,
      code: 'IMG_002',
      label: 'Night Mood',
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
      alt: 'EL CODE — Atmósfera nocturna cyberpunk',
      cls: 'col-span-6 md:col-span-5 lg:col-span-5 h-[280px] md:h-[420px]',
    },
    {
      id: 3,
      code: 'IMG_003',
      label: 'Identity',
      src: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=800&auto=format&fit=crop',
      alt: 'EL CODE — Identidad visual digital',
      cls: 'col-span-6 md:col-span-4 lg:col-span-4 h-[260px] md:h-[340px]',
    },
    {
      id: 4,
      code: 'IMG_004',
      label: 'Backstage',
      src: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=800&auto=format&fit=crop',
      alt: 'EL CODE — Detrás de cámaras',
      cls: 'col-span-6 md:col-span-4 lg:col-span-4 h-[260px] md:h-[340px]',
    },
    {
      id: 5,
      code: 'IMG_005',
      label: 'Neon Portrait',
      src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
      alt: 'EL CODE — Retrato con iluminación neón',
      cls: 'col-span-12 md:col-span-4 lg:col-span-4 h-[260px] md:h-[340px]',
    },
    {
      id: 6,
      code: 'IMG_006',
      label: 'Future Vision',
      src: 'https://images.unsplash.com/photo-1614680376739-414d95ff43df?q=80&w=1400&auto=format&fit=crop',
      alt: 'EL CODE — Visión urbana del futuro costarricense',
      cls: 'col-span-12 h-[320px] md:h-[440px]',
    },
  ];
}

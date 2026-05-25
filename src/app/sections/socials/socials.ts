import { Component } from '@angular/core';

interface Social {
  name: string;
  handle: string;
  url: string;
  tag: string;
  desc: string;
}

@Component({
  selector: 'app-socials',
  standalone: true,
  templateUrl: './socials.html',
})
export class SocialsComponent {
  socials: Social[] = [
    {
      name: 'Instagram',
      handle: '@elcodecr',
      url: 'https://www.instagram.com/elcodecr',
      tag: 'PHOTO / STORIES',
      desc: 'Visuales, drops y momentos diarios.',
    },
    {
      name: 'TikTok',
      handle: '@elcodecr',
      url: 'https://www.tiktok.com/@elcodecr',
      tag: 'SHORT-FORM',
      desc: 'Clips, snippets y la cultura del momento.',
    },
    {
      name: 'YouTube',
      handle: '@elcodecr',
      url: 'https://www.youtube.com/@elcodecr',
      tag: 'OFFICIAL CHANNEL',
      desc: 'Videos oficiales, lyric videos y BTS.',
    },
    {
      name: 'Facebook',
      handle: '/elcodecr',
      url: 'https://www.facebook.com/elcodecr',
      tag: 'COMMUNITY',
      desc: 'Comunidad oficial y eventos.',
    },
  ];
}

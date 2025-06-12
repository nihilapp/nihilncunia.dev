import { SiteConfig } from '@/_entities/common';
import { nihilLogo, nihilLogoWhite } from '@/_images';

export const siteConfig: SiteConfig = {
  title: '니힐 블로그 v3',
  description: '프론트엔드, 백엔드, 개발 노트, 기술 공유 등 다양한 개발 이야기를 담는 니힐의 개발 블로그입니다.',
  keywords: '니힐, 개발 블로그, 프로그래밍, 프론트엔드, 백엔드, Next.js, TypeScript, 기술, 개발자, 포트폴리오',
  author: {
    name: 'NIHILncunia',
    url: 'https://github.com/NIHILncunia',
  },
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'http://localhost:3000',
  cover: {
    link: '/opengraph-image.png',
    alt: '니힐 블로그 v3 개발 기술 블로그 대표 이미지',
  },
  logo: nihilLogo.src,
  darkLogo: nihilLogoWhite.src,
  version: 'v0.0.0',
  googleVerfi: '',
  googleAdSrc: '',
  googleAnalyticsId: '',
  get apiRoute() {
    return `${this.url}/api`;
  },
};

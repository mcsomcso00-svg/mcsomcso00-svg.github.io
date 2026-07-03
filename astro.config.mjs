// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 之後買了自訂網域改這裡即可（hreflang/sitemap/canonical 都吃這個值）
export default defineConfig({
  site: 'https://mcsomcso00-svg.github.io',
  trailingSlash: 'always',
  i18n: {
    locales: ['zh-hant', 'zh-hans', 'en'],
    defaultLocale: 'zh-hant',
    routing: {
      prefixDefaultLocale: true, // 一律 /zh-hant/ /zh-hans/ /en/，對稱好管 hreflang
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-hant',
        locales: { 'zh-hant': 'zh-Hant', 'zh-hans': 'zh-Hans', en: 'en' },
      },
    }),
  ],
});

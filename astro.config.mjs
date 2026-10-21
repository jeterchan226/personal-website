// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Replace with the real domain once one is bound; used for canonical/hreflang URLs.
  site: 'https://jeterchan.netlify.app',
  integrations: [react()],
  i18n: {
    locales: ['zh-tw', 'en'],
    defaultLocale: 'zh-tw',
    routing: {
      prefixDefaultLocale: true,
      // `/` is redirected by Netlify (public/_redirects) based on browser language,
      // so Astro must not generate its own redirect page there.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

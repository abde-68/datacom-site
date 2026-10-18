import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';


// IMPORTANT: remplacez 'site' par votre domaine definitif avant la mise en production.
export default defineConfig({
  site: 'https://abde-68.github.io/',
  base: '/datacom-site',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'auto',
  },
});

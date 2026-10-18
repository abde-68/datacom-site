import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4321', reducedMotion: 'reduce', launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] } },
  projects: [ { name:'ordinateur', use:{ viewport:{width:1440,height:900} } }, { name:'mobile', use:{ viewport:{width:390,height:844}, isMobile:true, hasTouch:true } } ],
  webServer: { command:'npm run preview -- --host 127.0.0.1', url:'http://127.0.0.1:4321/datacom-site/', reuseExistingServer:true },
});

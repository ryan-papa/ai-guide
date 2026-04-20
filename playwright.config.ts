import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000/ai-guide/',
  },
  projects: [
    {name: 'mobile-chromium', use: {...devices['Pixel 5']}},
  ],
  webServer: {
    command: 'npm run serve -- --port 3000 --no-open',
    url: 'http://localhost:3000/ai-guide/',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});

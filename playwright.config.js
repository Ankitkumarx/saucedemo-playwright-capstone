const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },

  retries: 1,

  reporter: [
    ['html'],
    ['list']
  ]
});
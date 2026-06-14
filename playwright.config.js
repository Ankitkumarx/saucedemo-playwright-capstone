const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

    testDir: './tests',

    fullyParallel: true,

    workers: 4,

    retries: 1,

    timeout: 60000,

    reporter: [
        ['html'],
        ['list']
    ],

    use: {

        baseURL: 'https://www.saucedemo.com',

        browserName: 'chromium',

        headless: false,

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        trace: 'retain-on-failure'
    }

});
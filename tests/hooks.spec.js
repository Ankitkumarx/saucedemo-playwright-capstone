const { test } = require('@playwright/test');

test.beforeEach(async ({ page }, testInfo) => {

    console.log(
        `STARTED: ${testInfo.title}`
    );

});

test.afterEach(async ({ page }, testInfo) => {

    console.log(
        `COMPLETED: ${testInfo.title}`
    );

    console.log(
        `STATUS: ${testInfo.status}`
    );

});
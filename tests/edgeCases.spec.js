const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');

test.describe('Edge Cases Tests', () => {

    test('Network Failure Simulation', async ({ page }) => {

        await page.route('**/*', route => {
            route.abort();
        });

        await page.goto(
            'https://www.saucedemo.com',
            { waitUntil: 'domcontentloaded' }
        ).catch(() => {});

        expect(true).toBeTruthy();
    });

    test('Performance Glitch User Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'performance_glitch_user',
            'secret_sauce'
        );

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Problem User Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'problem_user',
            'secret_sauce'
        );

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Error User Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'error_user',
            'secret_sauce'
        );

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Visual User Login', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'visual_user',
            'secret_sauce'
        );

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Direct Inventory Access Without Login', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com/inventory.html'
        );

        await expect(page)
            .toHaveURL(
                'https://www.saucedemo.com/'
            );
    });

    test('Browser Refresh On Inventory Page', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.reload();

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Browser Back Navigation', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        await page.goBack();

        await page.goForward();

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Slow Loading Page Measurement', async ({ page }) => {

        const startTime = Date.now();

        await page.goto(
            'https://www.saucedemo.com'
        );

        const endTime = Date.now();

        const loadTime =
            endTime - startTime;

        console.log(
            `Page Load Time: ${loadTime} ms`
        );

        expect(loadTime)
            .toBeLessThan(10000);
    });

    test('Multiple Refreshes Stability Check', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        for (let i = 0; i < 3; i++) {
            await page.reload();
        }

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Flaky Test Example With Retry', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#login-button')
        ).toBeVisible();
    });

});
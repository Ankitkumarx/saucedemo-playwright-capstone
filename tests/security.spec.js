const { test, expect } = require('@playwright/test');

test.describe('Security Tests', () => {

    test('XSS Script Injection In Username', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            '<script>alert("XSS")</script>'
        );

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('HTML Injection In Username', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            '<h1>Hacked</h1>'
        );

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('SQL Injection Style Input', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            "' OR '1'='1"
        );

        await page.fill(
            '#password',
            "' OR '1'='1"
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Special Characters In Username', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            '!@#$%^&*()_+{}[]'
        );

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Long Username Input', async ({ page }) => {

        const longText =
            'A'.repeat(500);

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            longText
        );

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Long Password Input', async ({ page }) => {

        const longPassword =
            'P'.repeat(500);

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            'standard_user'
        );

        await page.fill(
            '#password',
            longPassword
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('JavaScript URI Injection', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            'javascript:alert(1)'
        );

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Unicode Input Validation', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            '测试用户😀'
        );

        await page.fill(
            '#password',
            'secret_sauce'
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Whitespace Only Input', async ({ page }) => {

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            '     '
        );

        await page.fill(
            '#password',
            '     '
        );

        await page.click('#login-button');

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();
    });

    test('Input Fields Should Not Execute Script', async ({ page }) => {

        let dialogAppeared = false;

        page.on('dialog', () => {
            dialogAppeared = true;
        });

        await page.goto(
            'https://www.saucedemo.com'
        );

        await page.fill(
            '#user-name',
            '<script>alert(1)</script>'
        );

        await page.fill(
            '#password',
            'password'
        );

        await page.click('#login-button');

        expect(dialogAppeared).toBeFalsy();
    });

});
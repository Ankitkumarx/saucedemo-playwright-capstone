const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductPage = require('../src/pages/ProductPage');

test.describe('Product Listing Tests', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });

    test('Verify Products Count Greater Than Zero', async ({ page }) => {

        const productPage = new ProductPage(page);

        const count = await productPage.getProductCount();

        expect(count).toBeGreaterThan(0);
    });

    test('Validate Product Tiles', async ({ page }) => {

        const products = page.locator('.inventory_item');

        const count = await products.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {

            await expect(
                products.nth(i).locator('img')
            ).toBeVisible();

            await expect(
                products.nth(i).locator('.inventory_item_name')
            ).toBeVisible();

            await expect(
                products.nth(i).locator('.inventory_item_price')
            ).toBeVisible();

            await expect(
                products.nth(i).locator('button')
            ).toBeVisible();
        }
    });

    test('Verify Product Images Are Displayed', async ({ page }) => {

        const images = page.locator('.inventory_item img');

        const count = await images.count();

        for (let i = 0; i < count; i++) {

            await expect(
                images.nth(i)
            ).toBeVisible();
        }
    });

    test('Verify Product Names Are Displayed', async ({ page }) => {

        const names = page.locator('.inventory_item_name');

        const count = await names.count();

        for (let i = 0; i < count; i++) {

            const text = await names.nth(i).textContent();

            expect(text.trim().length).toBeGreaterThan(0);
        }
    });

    test('Verify Product Prices Are Displayed', async ({ page }) => {

        const prices = page.locator('.inventory_item_price');

        const count = await prices.count();

        for (let i = 0; i < count; i++) {

            const price = await prices.nth(i).textContent();

            expect(price).toContain('$');
        }
    });

    test('Verify Add To Cart Buttons Exist', async ({ page }) => {

        const buttons = page.locator('button.btn_inventory');

        const count = await buttons.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {

            await expect(
                buttons.nth(i)
            ).toBeVisible();
        }
    });

    test('Sort Products A to Z', async ({ page }) => {

        await page.selectOption(
            '.product_sort_container',
            'az'
        );

        await expect(
            page.locator('.inventory_item').first()
        ).toBeVisible();
    });

    test('Sort Products Z to A', async ({ page }) => {

        await page.selectOption(
            '.product_sort_container',
            'za'
        );

        await expect(
            page.locator('.inventory_item').first()
        ).toBeVisible();
    });

    test('Sort Products Price Low To High', async ({ page }) => {

        await page.selectOption(
            '.product_sort_container',
            'lohi'
        );

        const firstPrice = await page
            .locator('.inventory_item_price')
            .first()
            .textContent();

        expect(firstPrice).toContain('$');
    });

    test('Sort Products Price High To Low', async ({ page }) => {

        await page.selectOption(
            '.product_sort_container',
            'hilo'
        );

        const firstPrice = await page
            .locator('.inventory_item_price')
            .first()
            .textContent();

        expect(firstPrice).toContain('$');
    });

});
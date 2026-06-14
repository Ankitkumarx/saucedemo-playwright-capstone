const { test, expect } = require('@playwright/test');
const LoginPage = require('../src/pages/LoginPage');
const ProductDetailPage = require('../src/pages/ProductDetailPage');

test.describe('Product Detail Tests', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );
    });

    test('Open Product Detail Page', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        await expect(
            page.locator('.inventory_details_name')
        ).toBeVisible();
    });

    test('Validate Product Description', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        const description =
            await page.locator(
                '.inventory_details_desc'
            ).textContent();

        expect(
            description.trim().length
        ).toBeGreaterThan(0);
    });

    test('Validate Product Price', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        const price =
            await page.locator(
                '.inventory_details_price'
            ).textContent();

        expect(price).toContain('$');
    });

    test('Validate Product Image', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        await expect(
            page.locator('.inventory_details_img')
        ).toBeVisible();
    });

    test('Add Product To Cart From Detail Page', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        await productDetail.addToCart();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');
    });

    test('Verify Remove Button Appears After Add', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        await productDetail.addToCart();

        await expect(
            page.locator('button')
                .filter({ hasText: 'Remove' })
        ).toBeVisible();
    });

    test('Back Navigation To Product Listing', async ({ page }) => {

        const productDetail =
            new ProductDetailPage(page);

        await productDetail.openFirstProduct();

        await productDetail.backToProducts();

        await expect(page)
            .toHaveURL(/inventory/);
    });

    test('Product Name Should Match Detail Page', async ({ page }) => {

        const firstProductName =
            await page.locator(
                '.inventory_item_name'
            ).first().textContent();

        await page.locator(
            '.inventory_item_name'
        ).first().click();

        const detailProductName =
            await page.locator(
                '.inventory_details_name'
            ).textContent();

        expect(
            detailProductName.trim()
        ).toBe(
            firstProductName.trim()
        );
    });

});
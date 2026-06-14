const { test, expect } = require('@playwright/test');

test.describe('API Mocking Tests', () => {

    test('Mock Inventory Page Response', async ({ page }) => {

        await page.route(
            '**/inventory.html',
            async route => {

                await route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: `
                        <html>
                        <body>
                            <h1>Mock Inventory Page</h1>
                        </body>
                        </html>
                    `
                });

            }
        );

        await page.goto(
            'https://www.saucedemo.com/inventory.html'
        );

        await expect(
            page.locator('h1')
        ).toContainText(
            'Mock Inventory Page'
        );
    });

    test('Mock API Response With JSON', async ({ page }) => {

        await page.route(
            '**/mock-products',
            async route => {

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        products: [
                            {
                                id: 1,
                                name: 'Sauce Labs Backpack',
                                price: 29.99
                            }
                        ]
                    })
                });

            }
        );

        const response = await page.evaluate(async () => {
            const resp = await fetch('https://www.saucedemo.com/mock-products');
            return {
                status: resp.status,
                data: await resp.json()
            };
        });

        expect(response.status).toBe(200);

        const data = response.data;

        expect(
            data.products.length
        ).toBeGreaterThan(0);
    });

    test('Validate Response Status Code', async ({ page }) => {

        const response =
            await page.goto(
                'https://www.saucedemo.com'
            );

        expect(
            response.status()
        ).toBe(200);
    });

    test('Mock Login Failure Response', async ({ page }) => {
         
        await page.route(
            '**/login',
            async route => {
                 
                await route.fulfill({
                    status: 401,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        error: 'Unauthorized'
                    })
                });
                 
            }
        );
         
        const response = await page.evaluate(async () => {
            const resp = await fetch('https://www.saucedemo.com/login');
            return {
                status: resp.status,
                data: await resp.json()
            };
        });
         
        expect(response.status).toBe(401);
        expect(response.data.error).toBe('Unauthorized');
    });

    test('Intercept Network Request', async ({ page }) => {

        let requestCaptured = false;

        page.on('request', request => {

            if (
                request.url().includes(
                    'saucedemo'
                )
            ) {
                requestCaptured = true;
            }

        });

        await page.goto(
            'https://www.saucedemo.com'
        );

        expect(
            requestCaptured
        ).toBeTruthy();
    });

    test('Intercept Network Response', async ({ page }) => {

        let responseCaptured = false;

        page.on('response', response => {

            if (
                response.status() === 200
            ) {
                responseCaptured = true;
            }

        });

        await page.goto(
            'https://www.saucedemo.com'
        );

        expect(
            responseCaptured
        ).toBeTruthy();
    });

    test('Block Image Requests', async ({ page }) => {

        await page.route(
            '**/*.{png,jpg,jpeg,gif}',
            route => route.abort()
        );

        await page.goto(
            'https://www.saucedemo.com'
        );

        await expect(
            page.locator('#login-button')
        ).toBeVisible();
    });

    test('Modify Response Using Route Fulfill', async ({ page }) => {

        await page.route(
            '**/inventory.html',
            async route => {

                const response =
                    await route.fetch();

                const body =
                    await response.text();

                const modifiedBody =
                    body.replace(
                        'Products',
                        'Modified Products'
                    );

                await route.fulfill({
                    response,
                    body: modifiedBody
                });

            }
        );

        await page.goto(
            'https://www.saucedemo.com/inventory.html'
        );
    });

});
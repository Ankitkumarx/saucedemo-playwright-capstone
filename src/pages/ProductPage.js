class ProductPage {

    constructor(page) {

        this.page = page;

        this.products = '.inventory_item';

        this.productNames = '.inventory_item_name';

        this.productPrices = '.inventory_item_price';

        this.sortDropdown =
            '.product_sort_container';
    }

    async getProductCount() {

        return await this.page
            .locator(this.products)
            .count();
    }

    async sortProducts(value) {

        await this.page.selectOption(
            this.sortDropdown,
            value
        );
    }

    async getProductNames() {

        return await this.page
            .locator(this.productNames)
            .allTextContents();
    }

    async getProductPrices() {

        return await this.page
            .locator(this.productPrices)
            .allTextContents();
    }
}

module.exports = ProductPage;
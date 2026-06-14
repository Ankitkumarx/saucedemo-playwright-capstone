class ProductDetailPage {

    constructor(page) {

        this.page = page;

        this.firstProduct =
            '.inventory_item_name';

        this.productName =
            '.inventory_details_name';

        this.productDescription =
            '.inventory_details_desc';

        this.productPrice =
            '.inventory_details_price';

        this.productImage =
            '.inventory_details_img';

        this.addToCartButton =
            'button.btn_inventory';

        this.backButton =
            '#back-to-products';
    }

    async openFirstProduct() {

        await this.page
            .locator(this.firstProduct)
            .first()
            .click();
    }

    async addToCart() {

        await this.page.click(
            this.addToCartButton
        );
    }

    async backToProducts() {

        await this.page.click(
            this.backButton
        );
    }

    async getProductName() {

        return await this.page
            .locator(this.productName)
            .textContent();
    }

    async getProductDescription() {

        return await this.page
            .locator(this.productDescription)
            .textContent();
    }

    async getProductPrice() {

        return await this.page
            .locator(this.productPrice)
            .textContent();
    }
}

module.exports = ProductDetailPage;
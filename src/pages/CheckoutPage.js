class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.firstName = '#first-name';
        this.lastName = '#last-name';
        this.postalCode = '#postal-code';

        this.continueBtn = '#continue';
        this.finishBtn = '#finish';
        this.cancelBtn = '#cancel';
    }

    async fillCheckoutInfo(
        firstName,
        lastName,
        postalCode
    ) {

        await this.page.fill(
            this.firstName,
            firstName
        );

        await this.page.fill(
            this.lastName,
            lastName
        );

        await this.page.fill(
            this.postalCode,
            postalCode
        );
    }

    async continueCheckout() {

        await this.page.click(
            this.continueBtn
        );
    }

    async finishCheckout() {

        await this.page.click(
            this.finishBtn
        );
    }

    async cancelCheckout() {

        await this.page.click(
            this.cancelBtn
        );
    }
}

module.exports = CheckoutPage;
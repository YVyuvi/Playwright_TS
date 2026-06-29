import { Page, Locator } from '@playwright/test'

export class CartPage {

    //define the variables - private and readonly
    private readonly page: Page;
    private readonly productNamesInCart: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.productNamesInCart = this.page.locator('#tbodyid tr td:nth-child(2)');
    }

    //actions methods
    async checkProductInCart(productName: string): Promise<boolean> {

        await this.productNamesInCart.first().waitFor();
        const products = await this.productNamesInCart.all();

        for (const product of products) {
            const name = (await product.textContent())?.trim();
            if (name === productName) {
                return true;
            }
        }

        return false;
    }

}
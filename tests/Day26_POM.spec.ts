import test, { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import {HomePage} from '../pages/HomePage'
import {CartPage} from '../pages/CartPage'

//Duplication of elements/locators
//updation/modify the locators

//Wrapping up of data and methods into one single class and the variables or properties Whatever we created inside the class should not be accessible outside of the class.
//So for that reason, we made everything as a private.

//Second thing is the locators are fixed. So these locators most of the times won't change every time. So they are read only.
//So we don't need to modify them. So we apply the two properties for those variables private as well as read only.

test('Verify Login and Add to Cart', async ({page}) => {

    await page.goto('https://demoblaze.com/index.html');

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    //Login Page
    await loginPage.clickLoginLink();
    await loginPage.enterUserName('pavano1');
    await loginPage.enterPassword('test@123');
    await loginPage.clickLoginButton();

    //loginPage.performLogin('pavano1', 'test@123');

    //Home Page
    await homePage.addProductToCart('Nexus 6');
    await page.waitForTimeout(2000);
    await homePage.gotoCart();
    await page.waitForTimeout(2000);
    
    //Cart Page
    const isProductInCart = await cartPage.checkProductInCart('Nexus 6');
    
    //Validation
    expect(isProductInCart).toBe(true);
})
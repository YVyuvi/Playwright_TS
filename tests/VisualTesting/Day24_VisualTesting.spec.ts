import test, { expect } from "@playwright/test";

test(`Verify visual testing`, async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    //await page.goto('https://demowebshop.tricentis.com/register');

    //Compare snapshot of the page
    //App 1:
    expect(await page.screenshot()).toMatchSnapshot("homepage.png");

    //App 2:
    await expect(page).toHaveScreenshot();

    //Compare snapshot of the element
    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    expect(await logo.screenshot()).toMatchSnapshot("logo.png");

});
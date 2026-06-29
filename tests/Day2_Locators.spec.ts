/*
Locator - Identifies the element on the page.
DOM - Document Object Model
DOM - is an API Interface provided by the browser.

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/

import { test, expect, Locator } from '@playwright/test'

test("Verify playwright Built-in Locators", async ({page}) => {
    await page.goto("https://demo.nopcommerce.com/");

    //1. page.getByAltText() - identifies images (and similar elements) based on the alt attribute.
    //Use this locator when your element supports alt text such as img and area elements.

    const logo:Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

    //2. page.getByText() - Find an element by the text it contains. You can match by a substring, exact string,
    //Locate by visible text
    //Use this locator to find non interactive elements like div, span, p, etc.
    //For interactive elements like button, a, input, etc. use role locators

    await expect(page.getByText("Welcome to our store")).toBeVisible(); //full string/full text
    await expect(page.getByText("Welcome to our store", { exact: true })).toBeVisible();
    await expect(page.getByText("Welcome to")).toBeVisible();  //substring/partial text
    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible();  //regular expression

    //3.page.getByRole() - Locating by role (not an attribute)
    //Role locators include button, checkbox, headings, links, lists, tables, and many more and
    // follow W3C specifications for ARIA role.
    //Prefer for interactive elements like buttons, links, checkboxes, lists, headings,tables, etc.

    await page.getByRole("link", {name:'Register'}).click();
    await expect(page.getByRole("heading", {name:'Register'})).toBeVisible();

    //4.page.getByLabel() - locate form control by label's text
    // when to use: Ideal for form fields with visible labels

    //await page.getByLabel('First name:').type("abcde"); type is deprecated
    await page.getByLabel('First name:').fill("abcde");

    //5.page.getByPlaceHolder() - Finds element with a given placeholder text.
    // Best for inputs without a label but having a placeholder

    await page.getByPlaceholder("Search store").fill("abced");

    //6.page.getByTitle() to locate an element by its title attribute.
    //when to use: when your element has a meaningful title attribute.

    await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");
    await expect(page.getByTitle("Home page link")).toHaveText("Home");
    await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");

    //7.page.getByTestId() - Locate an element based on its data-testid attribute (other attribute can be configured)
    //when to use: when text or role based locators are unstable or not suitable.

    await expect(page.getByTestId("profile-name")).toHaveText("John Doe");
    await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
})
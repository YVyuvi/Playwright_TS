/*
XPath axes define the relationship between the current node and nodes in the document. 
They allow you to navigate through elements and attributes in an XML document.
*/

import { test, expect, Locator } from '@playwright/test'

test("Verify Xpath Axes", async ({page}) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //Self
    await expect(page.locator("//td[text()='Germany']/self::td")).toHaveText('Germany');

    //parent - get parent <tr> of "Germany" cell
    await expect(page.locator("//td[text()='Germany']/parent::tr")).toContainText('Maria Anders');

    //child - get all <td> children of the second <tr> in the table
    await expect(page.locator("//table[@id='customers']//tr[2]/child::td")).toHaveCount(3);

    //Ancestor - get ancestor <table> of the "Germany" cell
    await expect(page.locator("//td[text()='Germany']/ancestor::table")).toHaveAttribute('id','customers');

    //descendant - get all <td> under the table
    await expect(page.locator("//table[@id='customers']//descendant::td")).toHaveCount(18);

    //following - get <td> that comes after "Germany" in document order
    await expect(page.locator("//td[text()='Germany']/following::td[1]")).toHaveText('Centro comercial Moctezuma');

    //following sibling - get <td> that right after "Maria Anders" in document order
    await expect(page.locator("//td[text()='Maria Anders']/following-sibling::td")).toHaveCount(1);

    //preceding - get <td> just before "germany"
    await expect(page.locator("//td[text()='Germany']/preceding::td[1]")).toHaveText('Maria Anders');

    //preceding sibling - get <td> just left of  "germany"
    await expect(page.locator("//td[text()='Germany']/preceding-sibling::td").nth(0)).toHaveText('Alfreds Futterkiste');
})

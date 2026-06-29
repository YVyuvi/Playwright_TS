/*
keyboard methods:
insertText
type
down
press
up

await page.keyboard
*/

import { test, expect, Locator } from '@playwright/test'

test("Verify Keyboard Actions", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const input1 = page.locator('#input1');
    await input1.focus();  //focus the element
    await page.keyboard.insertText("welcome");  //provide the text on the textbox
    //await page.keyboard.type("welcome");

    //select all text (Ctrl + A)
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    //await page.keyboard.press('Control+A');

    //copy (Ctrl + c )
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');
    //await page.keyboard.press('Control+C');

    //Tab
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //Paste (ctrl + v)
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    //await page.keyboard.press('Control+V');

    await page.waitForTimeout(2000);
})
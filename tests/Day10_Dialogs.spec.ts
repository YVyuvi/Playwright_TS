//alert(), confirm(). prompt() dialogs/JSalerts

//1. By default, dialogs are auto-dismissed by playwright, so you don't have to handle them.
//2. However, you can register a dialog handler before the action that triggers the dialog to either
// dialog.accept() or dialog.dismiss() it

import { test, expect, Locator } from '@playwright/test'

test("Verify simple dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on('dialog', (dialog) => {
        console.log("Dialog Type is : ", dialog.type()); // returns type of the dialog
        expect(dialog.type()).toContain('alert');  
        console.log("Dialog Text is : ", dialog.message()); // returns message from the dialog
        expect(dialog.message()).toContain('I am an alert box');
        dialog.accept();
    });
    

    await page.locator('#alertBtn').click();

    await page.waitForTimeout(2000);
})

test("Verify Confirm dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on('dialog', dialog => {
        console.log("Dialog Type is : ", dialog.type()); // returns type of the dialog
        expect(dialog.type()).toContain('confirm');  
        console.log("Dialog Text is : ", dialog.message()); // returns message from the dialog
        expect(dialog.message()).toContain('Press a button!');
        dialog.accept(); //close dialog box by accepting
        //dialog.dismiss(); //close dialog box by dismissing
    });
    

    await page.locator('#confirmBtn').click(); //open confirmation dialog
    const text:string = await page.locator('#demo').innerText();
    console.log("Output is :", text);
    expect(text).toBe("You pressed OK!");
    //expect(text).toBe("You pressed Cancel!");
    await page.waitForTimeout(2000);
})

test("Verify Prompt dialog", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on('dialog', dialog => {
        console.log("Dialog Type is : ", dialog.type()); // returns type of the dialog
        expect(dialog.type()).toContain('prompt');  
        console.log("Dialog Text is : ", dialog.message()); // returns message from the dialog
        expect(dialog.message()).toContain('Please enter your name:');

        expect(dialog.defaultValue()).toContain('Harry Potter');  //checks default value of the dialog

        //dialog.accept('XYZ'); //close dialog box by accepting with input
        dialog.dismiss(); //close dialog box by dismissing
    });
    

    await page.locator('#promptBtn').click(); //open prompt dialog
    const text:string = await page.locator('#demo').innerText();
    console.log("Output is :", text);
    //expect(text).toBe("Hello XYZ! How are you today?");
    expect(text).toBe("User cancelled the prompt.");
    await page.waitForTimeout(2000);
})
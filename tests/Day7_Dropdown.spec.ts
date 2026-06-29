import { test, expect, Locator } from '@playwright/test'

test("Verify Single Select Dropdown", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select Options in a single dropdown
    await page.locator("#country").selectOption("India");  //By visible text
    await page.locator("#country").selectOption({value:'uk'});  //By value
    await page.locator("#country").selectOption({label:'Canada'}); //By label
    await page.locator("#country").selectOption({index:4});  //By index

    //2. count of options
    const optionsCount:Locator = page.locator("#country>option");
    await expect(optionsCount).toHaveCount(10);

    //3. check an option present in the dropdown
    const optionsText:string[] = (await optionsCount.allTextContents()).map(text => text.trim());
    expect(optionsText).toContain("Japan");

    //4. Printing options from the dropdown
    for(const option of optionsText)
    {
        console.log(option)
    }

    await page.waitForTimeout(3000);
})

test("Verify Multiple Select Dropdown", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select Options in a multiple dropdown
    await page.locator("#colors").selectOption(["Red", "Blue"]);  //By visible text
    await page.locator("#colors").selectOption(["green", "yellow"]);  //By value
    await page.locator("#colors").selectOption([{label:'White'}, {label:'Red'}]); //By label
    await page.locator("#colors").selectOption([{index:4}, {index:3}]);  //By index

    //2. count of options
    const optionsCount:Locator = page.locator("#colors>option");
    await expect(optionsCount).toHaveCount(7);

    //3. check an option present in the dropdown
    const optionsText:string[] = (await optionsCount.allTextContents()).map(text => text.trim());
    expect(optionsText).toContain("White");

    //4. Printing options from the dropdown
    for(const option of optionsText)
    {
        console.log(option)
    }

    await page.waitForTimeout(3000);
})

test("Verify Dropdown is sorted", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropdownOptions:Locator = page.locator("#animals>option");
    //const dropdownOptions:Locator = page.locator("#colors>option");
    const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
    const originalList:string[] = [...optionsText];
    const sortedList:string[] = [...optionsText].sort();  // sort is mutable. it will change the original array itself. to avoid this we have to use (...) spread operator
    expect(originalList).toEqual(sortedList);

    await page.waitForTimeout(3000);
})

test("Verify Dropdown contains duplicates", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //const dropdownOptions:Locator = page.locator("#animals>option");
    const dropdownOptions:Locator = page.locator("#colors>option");
    const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());
   
    const myset = new Set<string>();
    const duplicates:string[] = [];

    for(const text of optionsText)
    {
        if(myset.has(text))
        {
            duplicates.push(text);
        }
        else{
            myset.add(text);
        }
    }

    expect(duplicates.length).toBe(0);
    

    await page.waitForTimeout(3000);
})

test.only("Verify AutoSuggest/hidden/Bootstrap Dropdown", async ({page}) => {
    await page.goto("https://www.flipkart.com/");

    await page.locator("input[name='q']").fill("mobile");
    await page.waitForTimeout(5000);
    // Use selectorsHub debug tool
    // Use source page and click on pause button
    // Use ctrl+shift+p on inspect page and type emulate a focused page
    const allOptions:Locator = page.locator("ul>li");
    // Use ctrl+shift+p on inspect page and type do not emulate a focused page

    console.log("count : ", await allOptions.count());
    console.log("Print 3rd ele", await allOptions.nth(3).innerText());

    for(let i=0; i<await allOptions.count(); i++)
    {
        //console.log("Print all ele", await allOptions.nth(i).innerText());
        console.log("Print all ele", await allOptions.nth(i).textContent());
    }

    for(let i=0; i<await allOptions.count(); i++)
    {
        const text = await allOptions.nth(i).innerText();
       if(text === 'mobiles')
       {
        await allOptions.nth(i).click();
        break;
       }
    }   

})

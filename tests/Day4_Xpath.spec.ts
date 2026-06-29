/*
XPath stands for XML Path Language.
It is a syntax used to navigate through elements and attributes in an XML document.
In web automation, XPath is used to locate elements on a webpage by their structure and attributes.

1. Absolute XPath (Full XPath) /html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]
2. Relative XPath //img[@alt='Tricentis Demo Web Shop']
3. XPath with Single Attribute //input[@id='small-searchterms']
4. XPath with Multiple Attributes //input[@value='Search'][@type='submit']
5. XPath with and Operator //input[@value='Search' and @type='submit']
6. XPath with or Operator //input[@value='Search' or @type='submit']
7. XPath with contains() Function h2//a[contains(@href,'computer')]
8. XPath with starts-with() Function //h2//a[starts-with(@href,'/build')]
9. XPath with text() Function  //*[text()="Register"]   //*[contains(text(), "Fiction")]
10. XPath with last() Function //div[@class='column follow-us']//li[last()]
11. XPath with position() Function //div[@class='column follow-us']//li[position()=2]

*/

import { test, expect, Locator } from '@playwright/test'

test("Verify Xpath Locators", async ({page}) => {
   await page.goto("https://demowebshop.tricentis.com/");

   //1.Absolute Xpath (not recommended)
   await expect(page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]")).toBeVisible();

   //2.Relative Xpath
   await expect(page.locator("//img[@alt='Tricentis Demo Web Shop']")).toBeVisible(); 

   //3.contains()
   const products:Locator = page.locator("//h2/a[contains(@href,'computer')]");
   const productCount:number = await products.count();
   console.log(productCount);
   expect(productCount).toBeGreaterThan(0);
   //console.log(await products.textContent()); //Error: locator.textContent: Error: strict mode violation(matching more than one element)
   console.log(await products.first().textContent());
   console.log(await products.last().textContent());
   console.log(await products.nth(2).textContent()); //index starts frm 0
   let productTitles:string[] = await products.allTextContents(); 
   console.log(productTitles);
   for(let i of productTitles)
   {
    console.log(i)
   }

   //4.starts-with()
   const buildingProducts:Locator = page.locator("//h2/a[starts-with(@href,'/build')]");
   expect(await buildingProducts.count()).toBeGreaterThan(0);

   //5.text()
   expect(await page.locator("//a[text()='Register']")).toBeVisible();
   expect(await page.locator("//a[normalize-space()='Register']")).toBeVisible(); // removes spaces if any

   //6.last()
   expect(await page.locator("//div[@class='column follow-us']//li[last()]")).toBeVisible();

   //7.position()
   expect(await page.locator("//div[@class='column follow-us']//li[position()=3]")).toBeVisible();

   //8.Dynamic elements
   await page.goto("https://testautomationpractice.blogspot.com/");

   for(let i=1; i<=5; i++)
   {
        const button:Locator = page.locator("//button[text()='STOP' or text()='START']");
        ////button[@name='start' or @name='stop']
        //button[contains(@name,'st')]
        //button[starts-with(@name,'st')]
        //page.getByRole('button', {name: /START|STOP/ }) //getbyrole method
        //page.locator('button[name="start"], button[name="stop"]')  // css selector
        await button.click();
   }

})
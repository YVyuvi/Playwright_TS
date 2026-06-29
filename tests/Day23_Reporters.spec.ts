import { test, expect } from '@playwright/test';


//1.HTML Report
// reporter: [ ['html', {open:'always'}]],  
// reporter: [ ['html', {open:'always', outputFolder: 'my-report'}]], 
// npx playwright show-report my-report
// npx playwright test test Day23_Reporters.spec.ts --reporter=html

//2.List Report
//reporter: 'list',
//npx playwright test --reporter=list

//3.Line Report
//reporter: 'line',
//npx playwright test --reporter=line

//4.Dot Report
//reporter: 'dot',
//npx playwright test --reporter=dot


//5.Json Report
//reporter: [['json', { outputFile: 'results.json' }]],
//npx playwright test --reporter=json

//6.JUnit Report
//reporter: [['junit', { outputFile: 'results.xml' }]],
//npx playwright test --reporter=junit


// Allure Report
// npm install -D allure-playwright
// reporter: 'allure-playwright',
// npx playwright test --reporter=allure-playwright
// To view the report - npm install -g allure-commandline
// allure generate ./allure-results -o ./allure-report  //to generate the reports
// allure open ./allure-report - to open allure report
// allure generate ./allure-results -o ./allure-report --clean

test.describe('Demoblaze Tests', () => {

    // Login before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoblaze.com/index.html');
        await page.locator('#login2').click();
        await page.locator('#loginusername').fill('pavano1');
        await page.locator('#loginpassword').fill('test@123');
        await page.locator("button[onclick='logIn()']").click();

        // Better than waitForTimeout: wait for the logout button to appear
        await expect(page.locator('#logout2')).toBeVisible();
    });

    // Logout after each test
    test.afterEach(async ({ page }) => {
        await page.locator('#logout2').click();
    });

    test('Find no of products', async ({ page }) => {
        const products = page.locator('.card-title');
        const count = await products.count();
        console.log("No of products:", count);
        await expect(products).toHaveCount(9);
    });

    test('Add product to cart', async ({ page }) => {
        await page.locator("text='Samsung galaxy s6'").click();

        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
        });

        await page.locator('a.btn.btn-success.btn-lg').click();
    });
});
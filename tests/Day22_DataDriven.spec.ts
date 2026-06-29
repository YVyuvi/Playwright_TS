import test, { expect } from "@playwright/test";
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

//parameterization with multiple data
const searchItems: string[] = ['laptop', 'Gift card', 'smartphone', 'monitor'];

//using for-of loop
for (const item of searchItems) {
    test(`Verify Parameterization with for-of ${item}`, async ({ page }) => {
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);
        await page.locator('input.button-1.search-box-button').click();
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
    });
};

//using for-each
searchItems.forEach((item) => {
    test(`Verify Parameterization with for-each ${item}`, async ({ page }) => {
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);
        await page.locator('input.button-1.search-box-button').click();
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
    });
});


//Parameterization with multiple set of data
const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"]
];

for (const [email, password, validity] of loginTestData) {
    test.describe('Login data driven test', async () => {
        test(`Login test for ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            //fill form
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('input.button-1.login-button').click();

            if (validity.toLowerCase() === 'valid') {
                //Assert logout is visible
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 2000 });
            } else {
                //Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 2000 });
                //Assert the page is still in login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    })
}


//*****************************************************Data Driven using Json***********************************************************
//import fs from 'fs';

//Read data from json
const jsonPath = "testdata/data.json";
const loginData: any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('Data Driven using Json', async () => {
    for (const { email, password, validity } of loginData) {
        test(`Login test using ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            //fill form
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('input.button-1.login-button').click();

            if (validity.toLowerCase() === 'valid') {
                //Assert logout is visible
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 2000 });
            } else {
                //Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 2000 });
                //Assert the page is still in login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    }
})


//*****************************************************Data Driven using CSV***********************************************************
//npm install csv-parse
//import {parse} from 'csv-parse/sync';


// 1. Define the interface to match your CSV headers
interface LoginData {
    email: string;
    password: string;
    validity: string;
}

//Read data from csv
const csvPath = 'testdata/data.csv'
const filecontent = fs.readFileSync(csvPath, 'utf-8');
const loginCSVData: any = parse(filecontent, { columns: true, skip_empty_lines: true, });

test.describe('Data Driven using CSV', async () => {
    for (const data of loginCSVData) {
        test(`Login test using ${data.email} and ${data.password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            //fill form
            await page.locator('#Email').fill(data.email);
            await page.locator('#Password').fill(data.password);
            await page.locator('input.button-1.login-button').click();

            if (data.validity.toLowerCase() === 'valid') {
                //Assert logout is visible
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 2000 });
            } else {
                //Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 2000 });
                //Assert the page is still in login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    }
})


//*****************************************************Data Driven using XLSX***********************************************************
// npm install xlsx
// import * as XLSX from 'xlsx';

//Read data from xlsx
const xlsxPath = 'testdata/data.xlsx'
const workbook = XLSX.readFile(xlsxPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const loginXLSXData: any = XLSX.utils.sheet_to_json(worksheet);

test.describe('Data Driven using XLSX', async () => {
    for (const { email, password, validity } of loginXLSXData) {
        test.only(`Login test using ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login');

            //fill form
            await page.locator('#Email').fill(email);
            await page.locator('#Password').fill(password);
            await page.locator('input.button-1.login-button').click();

            if (validity.toLowerCase() === 'valid') {
                //Assert logout is visible
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 2000 });
            } else {
                //Assert error message is visible
                const errorMessage = page.locator('.validation-summary-errors');
                await expect(errorMessage).toBeVisible({ timeout: 2000 });
                //Assert the page is still in login page
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
            }
        });
    }
})
import { test, expect, Locator } from '@playwright/test'
import fs, { existsSync } from 'fs';

test("Verify file upload", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //single file upload
    await page.locator('#singleFileInput').setInputFiles('tests/uploads/Code.txt');
    await page.getByRole('button', { name: 'Upload Single File' }).click();
    const msg1 = await page.locator('#singleFileStatus').textContent();
    expect(msg1).toContain('Code.txt');
    await page.waitForTimeout(2000);

    //multiple file upload
    await page.locator('#multipleFilesInput').setInputFiles(['tests/uploads/Code.txt', 'tests/uploads/new po.txt']);
    await page.getByRole('button', { name: 'Upload Multiple Files' }).click();
    const msg2 = await page.locator('#multipleFilesStatus').textContent();
    expect(msg2).toContain('Code.txt');
    expect(msg2).toContain('new po.txt');
    await page.waitForTimeout(2000);
})

test("Verify text file download", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    
    await page.locator('#inputText').fill("Welcome");
    await page.locator('#generateTxt').click();

    // start waiting for the download before clicking
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator("#txtDownloadLink").click()]);

    //save the file to custom path
    const downloadPath = 'tests/uploads/test1.txt'
    await download.saveAs(downloadPath);

    //check if file exists in the path
    const fileexist = fs.existsSync(downloadPath); //returns true if file exists, not if file not exists
    expect(fileexist).toBeTruthy();

    //cleanup download files
    if(fileexist)
    {
        fs.unlinkSync(downloadPath)
    }

    await page.waitForTimeout(2000);
})


test("Verify pdf file download", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    
    await page.locator('#inputText').fill("Welcome");
    await page.locator('#generatePdf').click();

    // start waiting for the download before clicking
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator("#pdfDownloadLink").click()]);

    //save the file to custom path
    const downloadPath = 'tests/uploads/test1.pdf'
    await download.saveAs(downloadPath);

    //check if file exists in the path
    const fileexist = fs.existsSync(downloadPath); //returns true if file exists, not if file not exists
    expect(fileexist).toBeTruthy();

    //cleanup download files
    if(fileexist)
    {
        fs.unlinkSync(downloadPath)
    }

    await page.waitForTimeout(2000);
})
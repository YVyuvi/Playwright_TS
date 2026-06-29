import { test, expect, Locator, Page } from '@playwright/test'

test("Verify JQuery date Picker", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput:Locator = page.locator("#datepicker")
    await expect(dateInput).toBeVisible();

    //App 1 : using fill method
    //dateInput.fill("05/20/2026");

    //App 2 : using date picker
    await dateInput.click();
    const date = '30'
    const month = 'July'
    const year = '2025'

    while(true){
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();
        const currentYear = await page.locator('.ui-datepicker-year').textContent();

        if(currentMonth===month && currentYear===year){
            const allDates = await page.locator('.ui-datepicker-calendar td').all();
            for(let dt of allDates){
                const currentDate = await dt.textContent();
                if(currentDate===date){
                    await dt.click();
                    break;
                }
            }

            break;
        }
        //Future date
        //await page.locator('.ui-datepicker-next').click();

        //Past date
        await page.locator('.ui-datepicker-prev').click();
    }

    /*const allDates = await page.locator('.ui-datepicker-calendar td').all();
            for(let dt of allDates){
                const currentDate = await dt.textContent();
                if(currentDate===date){
                    await dt.click();
                    break;
                }
            }*/

    await page.waitForTimeout(2000);
})

test("Verify JQuery date Picker using reusable method", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput:Locator = page.locator("#datepicker")
    await expect(dateInput).toBeVisible();

    //App 1 : using fill method
    //dateInput.fill("05/20/2026");

    //App 2 : using date picker
    await dateInput.click();
    const date = '30'
    const month = 'July'
    const year = '2024'

    selectDate(year, month, date, page, false)
    expect(dateInput).toHaveValue("07/30/2024")

    await page.waitForTimeout(2000);
})

async function selectDate(tergetYear:string, targetMonth:string, TargetDate:string, page:Page, isFuture:boolean){
    while(true){
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();
        const currentYear = await page.locator('.ui-datepicker-year').textContent();

        if(currentMonth===targetMonth && currentYear===tergetYear){
            const allDates = await page.locator('.ui-datepicker-calendar td').all();
            for(let dt of allDates){
                const currentDate = await dt.textContent();
                if(currentDate===TargetDate){
                    await dt.click();
                    break;
                }
            }

            break;
        }

        if(isFuture){
            //Future date
            await page.locator('.ui-datepicker-next').click();
        }else{
            //Past date
            await page.locator('.ui-datepicker-prev').click();
        }    
    }
}

test("Verify Bootstrap date Picker", async ({page}) => {
    await page.goto("https:/www.booking.com/");
    await page.getByRole('button', { name: 'Dismiss sign-in info.' }).click();

    const dateInput:Locator = page.getByTestId('searchbox-dates-container')
    await expect(dateInput).toBeVisible();
    await dateInput.click();

    // Check-in Date Selection
    const checkinDate = '5'
    const checkinMonth = 'July'
    const checkinYear = '2026'
    let chechinDateSelected = false;

    while(true){
        const checkinMonthYear = await page.locator("h3[aria-live='polite']").nth(0).innerText();
        const currentMonth = checkinMonthYear.split(" ")[0];
        const currentYear = checkinMonthYear.split(" ")[1];

        if(currentMonth===checkinMonth && currentYear===checkinYear){
            const allDates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
            for(let dt of allDates){
                const currentDate = await dt.textContent();
                if(currentDate===checkinDate){
                    await dt.click();
                    chechinDateSelected = true;
                    break;
                }
            }

            break;
        }else{
        await page.locator("button[aria-label='Next month']").click();
        }
    }
    //Assertion
    expect(chechinDateSelected).toBeTruthy();

    await page.waitForTimeout(2000);

    // Check-out Date Selection
    const checkoutDate = '25'
    const checkoutMonth = 'August'
    const checkoutYear = '2026'
    let chechoutDateSelected = false;

    while(true){
        const checkinMonthYear = await page.locator("h3[aria-live='polite']").nth(1).innerText();
        const currentMonth = checkinMonthYear.split(" ")[0];
        const currentYear = checkinMonthYear.split(" ")[1];

        if(currentMonth===checkoutMonth && currentYear===checkoutYear){
            const allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
            for(let dt of allDates){
                const currentDate = await dt.textContent();
                if(currentDate===checkoutDate){
                    await dt.click();
                    chechoutDateSelected = true;
                    break;
                }
            }

            break;
        }else{
        await page.locator("button[aria-label='Next month']").click();
        }
    }

    //Assertion
    expect(chechoutDateSelected).toBeTruthy();

    await page.waitForTimeout(2000);
})
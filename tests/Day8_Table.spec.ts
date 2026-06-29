import { test, expect, Locator } from '@playwright/test'

test("Verify Static Web Table", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1. no of rows
    const rows:Locator = table.locator("tr");
    //const rows:Locator = page.locator("table[name='BookTable'] tbody tr");
    await expect(rows).toHaveCount(7);
    expect(await rows.count()).toBe(7);

    //2.no of columns
    const columns:Locator = rows.locator("th");
    //const rows:Locator = page.locator("table[name='BookTable'] tbody tr th");
    await expect(columns).toHaveCount(4);
    expect(await columns.count()).toBe(4);

    //3. Read all the data from row 3
    const thirdRowCells:Locator = rows.nth(3).locator("td");
    const thirdRowTexts:string[] = await thirdRowCells.allInnerTexts();
    console.log(thirdRowTexts);
    await expect(thirdRowCells).toHaveText([ 'Learn JS', 'Animesh', 'Javascript', '300' ]);

    for(let text of thirdRowTexts)
    {
       console.log(text); 
    }

    //4. Read all the data from the table
    const allRowData:Locator[] = await rows.all();
    for(let row of allRowData)
    {
        console.log(await row.locator("td").allInnerTexts());
    }

    //5. print book names where author is mukesh
    const mukeshBooks:string[] = [];
    for(let row of allRowData.slice(1))
    {
        const cells:string[] = await row.locator("td").allInnerTexts();
        const author=cells[1];
        const book=cells[0];
        if(author == "Mukesh")
        {
            console.log(`${author} \t ${book}`)
            mukeshBooks.push(book);
        }
    }
    expect(mukeshBooks).toHaveLength(2);

    //6. calculate total price of all books
    let totaPrice:number=0;
    for(let row of allRowData.slice(1))
    {
        const cells:string[] = await row.locator("td").allInnerTexts();
        const price = cells[3];
        totaPrice=totaPrice+parseInt(price);
    }
    console.log(totaPrice)
    expect(totaPrice).toBe(7100)
})


test("Verify Dynamic Web Table", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table#taskTable tbody");
    await expect(table).toBeVisible();

    //For chrome process get the value of cpu
    //1.Read each row to check chrome presence
    const rows:Locator[] = await table.locator("tr").all();
    console.log(rows.length);
    expect(rows).toHaveLength(4);

    let cpuLoad:string = ''

    for(const row of rows)
    {
        const processName:string = await row.locator("td").nth(0).innerText();
        if(processName=="Chrome")
        {
            cpuLoad = await row.locator('td:has-text("%")').innerText();
            //const cpuLoad:string = await row.locator("td",{hasText("%")').innerText();
            console.log(cpuLoad);
            break;
        }
    }

    //2.compare it with value in the cpu label
    let label:string = await page.locator("strong.chrome-cpu").innerText();
    console.log(label);
    expect(label).toContain(cpuLoad);
})

test("Verify Pagination Tables", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    //1.Read the data from all the table pages
    let hasNextPages=true;
    while(hasNextPages)
    {
        const rows = await page.locator('#example_wrapper tbody tr').all();
        for(let row of rows)
        {
            console.log(await row.innerText());
        }
        await page.waitForTimeout(2000);
        //button[aria-label='Next']
        //button:has-text("›")
        //page.locator('nav').locator('button').nth(8)

        const nextButton:Locator = page.locator("button[aria-label='Next']");
        const isDisabled = await nextButton.getAttribute('class');

        if(isDisabled?.includes('disabled'))
        {
            hasNextPages=false;
        }else
        {
            await nextButton.click();
        }   
    }

    //2. filter the rows and check the rows count
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    
    const dropdown:Locator = page.locator('#dt-length-0');
    await dropdown.selectOption({label:'25'});

    //app1
    const rows = await page.locator('#example_wrapper tbody tr').all();
    expect(rows.length).toBe(25);

    //app2
    const row2 = page.locator('#example_wrapper tbody tr');
    await expect(row2).toHaveCount(25);

    //3. search for specific data in a table
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchBox:Locator = page.locator('#dt-search-0');
    await searchBox.fill('Paul Byrd');

    if(rows.length>=1)
    {
        let matchFoubd = false;
        for(let row of rows)
        {
            const text = await row.innerText();
            if(text.includes('Paul Byrd'))
            {
                console.log("Match Found");
                matchFoubd=true;
                break;
            }
        }
        expect(matchFoubd).toBeTruthy();
        //expect(matchFoubd).toBe(true);
    }
    else{
        console.log("Match Not Found")
    }

})

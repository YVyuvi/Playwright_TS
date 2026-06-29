import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */

  //To change timeout globally for all tests (default is 30000 ms (30 secs)) //Yuvi
  //timeout:60000,

  //To change timeout globally for expect conditions (default is 5000 ms (5 secs))  //Yuvi
  //expect:{timeout:10000},

  //Parallel or serial //Yuvi
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,

  // Retry on locally //Yuvi
  //retries: 3,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  //workers:1, //Yuvi

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /*reporter: [ ['html', {open:'always', outputFolder: 'my-report'}],
              ['list'],
              ['line'],
              ['dot'],
              ['json', {open:'always',  outputFile: 'my-report/results.json' }],
              ['junit', {open:'always',  outputFile: 'my-report/results.xml' }]
            ], */           //Yuvi

  //reporter: [['allure-playwright', {cleanup:true,}]],  //Yuvi


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    //scrennshot for failed test cases //Yuvi
    screenshot:'only-on-failure', 

    //for taking videos during failure //Yuvi
    video:'retain-on-failure',

    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */ //Yuvi
    //trace: 'retain-on-failure',

    // This ignores SSL errors for all tests
    ignoreHTTPSErrors: true, //Yuvi
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      //fullyParallel:true, //Yuvi //only in chromium it will run parallel
    },
/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

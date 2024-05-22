import { test, expect, Browser, Page, Locator } from "@playwright/test";
import { webkit, chromium, firefox } from "playwright";

test('login test', async() => {
    const browser:Browser = await chromium.launch({headless: false});
    const page:Page = await browser.newPage();

    //Get into the Login Page
    await page.goto("https://dev.ysrbs.com/#/login");
    //Get the UserName and Password
    await page.locator("xpath = //input[@id='mat-input-0']").type("ramya@palebluesoftware.com", {delay: 200}); 
    await page.locator("xpath = //input[@id='mat-input-1']").type("sundari@1963", {delay: 100}); 
    const loginButton = await page.locator("[type = 'submit']");
    loginButton.first().click();
    // Validation for Invalid Username or password
    await page.waitForSelector("xpath = //div[@aria-label='Invalid username or password.']", { timeout: 5000 });
    const errorMessage = await page.locator("xpath = //div[@aria-label='Invalid username or password.']").textContent();
    console.log("The Login Page error:", errorMessage);
    await page.screenshot({path: "loginPageErrorMessage.png"});
    await page.waitForTimeout(5000);
    //Enter the Valid password
    await page.locator("xpath = //input[@id='mat-input-1']").clear();
    await page.locator("xpath = //input[@id='mat-input-1']").type("sundari1963", {delay: 100}); 
    await page.screenshot({path: "loginPage.png"});
    await loginButton.first().click();
    //Navigate to the dashboard
    await page.locator("xpath = //div[@title='Firewheel Lodge']").first().click();
    await page.goto("https://dev.ysrbs.com/#/dashboard");

    const title = await page.title();
    console.log("The Home Page title:", title);
    
    await page.screenshot({path: "dashboard.png"});
    expect(title).toEqual("Yellowstone");

    browser.close();

});

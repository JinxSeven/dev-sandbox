import { chromium, test } from '@playwright/test'

test('Test Basics - Login', async () => { 
    const chrome = await chromium.launch({ headless: false });
    const chromeContext = await chrome.newContext();
    const contextPage = await chromeContext.newPage();

    await contextPage.goto('https://ecommerce-playground.lambdatest.io/');
    await contextPage.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    await contextPage.click("text=Login");

    // Handling Inputs
    await contextPage.pause();
    await contextPage.locator("input[name='email']").pressSequentially('jakethejuke@proton.mail');
    await contextPage.pause();
    await contextPage.locator("input[name='password']").pressSequentially('jukethejake');
    await contextPage.pause();
    await contextPage.click("input[value='Login'][type='submit']");
    await contextPage.pause();
    
})
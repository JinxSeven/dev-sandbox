import { chromium, expect, test } from '@playwright/test'

test('Test Basics - Interactions', async () => {
    const chrome = await chromium.launch({ headless: false });
    const chromeContext = await chrome.newContext();
    const contextPage = await chromeContext.newPage();

    await contextPage.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    
    await contextPage.locator("(//input[@id='user-message'])[1]").pressSequentially("Grand Theft Auto");

    const inputElem = contextPage.locator("(//input[@id='user-message'])[1]");

    expect(inputElem).toHaveValue("Grand Theft Auto");

    await console.log(inputElem.inputValue());
})
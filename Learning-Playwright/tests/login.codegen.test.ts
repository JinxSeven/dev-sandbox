import { test, expect } from '@playwright/test';

test('Codegen Test Basics - Login', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io/');

    await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    await page.getByRole('link', { name: 'Login' }).click();
    
    await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill('koushik350@gmail.com');
    await page.getByRole('textbox', { name: 'E-Mail Address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('Pass123$');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.getByRole('link', { name: ' Edit your account' }).click();
    await page.getByRole('textbox', { name: 'First Name *' }).dblclick();
    await page.getByRole('textbox', { name: 'First Name *' }).fill('LetKaushik');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/account');

    // Couldn't Hover
    await page.hover("//a[@data-toggle='dropdown']//span[normalize-space() = 'My account']");
    await page.getByRole('link', { name: 'Logout', exact: true }).click();
});
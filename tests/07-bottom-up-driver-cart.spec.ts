import {
  test,
  expect,
  BrowserContext,
  Page,
} from '@playwright/test';

// Driver A -> F Shopping Cart REAL นะครับ 

async function driverOpenCart(
  context: BrowserContext
): Promise<Page> {

  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);

  const page = await context.newPage();

  // Driver เรียก Shopping Cart (F) ตรง ๆ
  await page.goto('https://www.saucedemo.com/cart.html');

  await expect(page).toHaveURL(/cart\.html/);

  return page;
}

test('Bottom-Up DRIVER: Driver A -> F Shopping Cart REAL', async ({ browser }) => {

  const context = await browser.newContext();

  try {
    const page = await driverOpenCart(context);
    await expect(page.locator('.cart_list')).toBeVisible();
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(0);

  } finally {
    await context.close();
  }
});

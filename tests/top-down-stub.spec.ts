import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// data name 
const STUDENT_FIRST_NAME = 'Worrawatt';
const STUDENT_LAST_NAME = 'Jarrenwong';

const CARD_STUB_PATH = path.resolve(__dirname, '..', 'stubs', 'card.html');
const CARD_STUB_HTML = fs.readFileSync(CARD_STUB_PATH, 'utf-8');

test('Top-Down STUB -> Inventory STUB (card.html)', async ({ page }) => {

  // login 
  await page.goto('/');

  await page.locator('#user-name')
    .fill('standard_user');

  await page.locator('#password')
    .fill('secret_sauce');

  await Promise.all([
    page.waitForURL(/inventory\.html/),
    page.locator('#login-button').click(),
  ]);

  console.log('Current URL:', page.url());
  await page.setContent(CARD_STUB_HTML);

  // Assert : REAL A -> STUB B (card.html)

  await expect(
    page.locator('[data-test="stub-inventory"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="stub-inventory"]')
  ).toContainText('Fake Inventory from Stub (card.html)');


  // sr card.html 
  const studentNameLocator = page.locator('[data-test="student-name"]');

  await expect(studentNameLocator).toBeVisible();
  await expect(studentNameLocator).toContainText(STUDENT_FIRST_NAME);
  await expect(studentNameLocator).toContainText(STUDENT_LAST_NAME);

});

// npx playwright test tests/top-down-stub.spec.ts --headed

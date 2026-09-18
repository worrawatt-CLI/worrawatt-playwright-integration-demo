import { test, expect } from '@playwright/test';

// name nakub 
const STUDENT_FIRST_NAME_TH = 'วรวรรธน์';
const STUDENT_LAST_NAME_TH = 'เจริญวงค์';
const STUDENT_FIRST_NAME_EN = 'Worrawatt';
const STUDENT_LAST_NAME_EN = 'Jarrenwong';

test('Top-Down STUB: Login REAL -> Inventory STUB (with student name)', async ({ page }) => {

  // =====================================================
  // REAL A : Login จริง
  // =====================================================
  await page.goto('/');

  await page.locator('#user-name')
    .fill('standard_user');

  await page.locator('#password')
    .fill('secret_sauce');

  // รอ navigation หลังจาก login
  await Promise.all([
    page.waitForURL(/inventory\.html/),
    page.locator('#login-button').click(),
  ]);

  console.log('Current URL:', page.url());

  // =====================================================
  // STUB B : Inventory
  // saucedemo.com is an SPA — inventory content is rendered
  // by client-side JS (no HTTP request to /inventory.html).
  // Replace the SPA-rendered DOM with our stub HTML.
  await page.setContent(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Stub Inventory</title>
      </head>
      <body>
        <h1>Stub Inventory</h1>
        <div class="inventory_list" data-test="stub-inventory">
          Fake Inventory from Stub B
          <p data-test="student-name">
            ${STUDENT_FIRST_NAME_TH} ${STUDENT_LAST_NAME_TH}
            (${STUDENT_FIRST_NAME_EN} ${STUDENT_LAST_NAME_EN})
          </p>
        </div>
      </body>
    </html>
  `);

  // =====================================================
  // Assert : REAL A -> STUB B
  // =====================================================

  await expect(
    page.locator('[data-test="stub-inventory"]')
  ).toBeVisible();

  await expect(
    page.locator('[data-test="stub-inventory"]')
  ).toContainText('Fake Inventory from Stub B');


  // ตรวจสอบ
  const studentNameLocator = page.locator('[data-test="student-name"]');

  await expect(studentNameLocator).toBeVisible();

  // ตรวจชื่อจริง th
  await expect(studentNameLocator).toContainText(STUDENT_FIRST_NAME_TH);
  // ตรวจนามสกุล th
  await expect(studentNameLocator).toContainText(STUDENT_LAST_NAME_TH);
  // ตรวจชื่อจริง en
  await expect(studentNameLocator).toContainText(STUDENT_FIRST_NAME_EN);
  // ตรวจนามสกุล en
  await expect(studentNameLocator).toContainText(STUDENT_LAST_NAME_EN);
});

// npx playwright test tests/02-top-down-stub.spec.ts --headed

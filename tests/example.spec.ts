import { test, expect } from '@playwright/test';

test('has title, and first heading', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/notes/i);

  await expect(page.getByRole("heading", {name: /welcome to note/i})).toBeVisible()
});




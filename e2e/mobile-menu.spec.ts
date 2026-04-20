import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Mobile navbar sidebar', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/');
  });

  test('opens above content and is clickable', async ({page}) => {
    await page.locator('.navbar__toggle').click();
    const sidebar = page.locator('.navbar-sidebar--show');
    await expect(sidebar).toBeVisible();
    const firstLink = sidebar.locator('.menu__link:visible').first();
    await expect(firstLink).toBeVisible();
    const box = await firstLink.boundingBox();
    expect(box).not.toBeNull();
    const topEl = await page.evaluate(
      ({x, y}) => {
        const el = document.elementFromPoint(x, y);
        return el?.closest('.navbar-sidebar') ? 'sidebar' : 'other';
      },
      {x: box!.x + box!.width / 2, y: box!.y + box!.height / 2},
    );
    expect(topEl).toBe('sidebar');
  });

  test('closes on backdrop click', async ({page}) => {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar--show')).toBeVisible();
    const vw = page.viewportSize()!.width;
    await page.locator('.navbar-sidebar__backdrop').click({position: {x: vw - 20, y: 200}});
    await expect(page.locator('.navbar-sidebar--show')).toHaveCount(0);
  });

  test('closes on ESC', async ({page}) => {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar--show')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.navbar-sidebar--show')).toHaveCount(0);
  });

  test('closes and navigates on menu link click', async ({page}) => {
    await page.locator('.navbar__toggle').click();
    const link = page.locator('.navbar-sidebar .menu__link[href]').first();
    const href = await link.getAttribute('href');
    await link.click();
    if (href && !href.startsWith('#')) {
      await page.waitForURL((url) => url.pathname.includes(href));
    }
    await expect(page.locator('.navbar-sidebar--show')).toHaveCount(0);
  });

  test('axe accessibility with sidebar open', async ({page}) => {
    await page.locator('.navbar__toggle').click();
    await expect(page.locator('.navbar-sidebar--show')).toBeVisible();
    const results = await new AxeBuilder({page})
      .include('.navbar-sidebar')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

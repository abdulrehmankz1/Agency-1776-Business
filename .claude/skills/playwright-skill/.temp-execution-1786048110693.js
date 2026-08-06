const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3001/contact';
const DIR = 'C:/Users/user/AppData/Local/Temp/claude/C--Users-user-Documents-development-claude-projects-Agency-1776-Business/9490d45a-55c8-4725-8832-e6ee66d313bc/scratchpad/';
const LABEL = 'Where Are Leads Getting Lost?';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2500);

  await page.evaluate((label) => {
    const b = [...document.querySelectorAll('[role=combobox]')]
      .find((x) => x.getAttribute('aria-label') === label);
    if (window.__smoother__) window.__smoother__.scrollTo(b, false, 'center center');
    else b.scrollIntoView({ block: 'center' });
  }, LABEL);
  await page.waitForTimeout(800);

  const btn = page.getByRole('combobox', { name: LABEL });
  await btn.click();
  await page.waitForTimeout(400);

  const listbox = page.getByRole('listbox', { name: LABEL });
  const m0 = await listbox.evaluate((el) => ({
    scrollHeight: el.scrollHeight, clientHeight: el.clientHeight, scrollTop: el.scrollTop,
  }));
  console.log('overflow?', m0.scrollHeight > m0.clientHeight, JSON.stringify(m0));

  // Viewport screenshot around the dropdown to check opacity (bleed-through).
  const box = await listbox.boundingBox();
  await page.screenshot({
    path: DIR + 'leads-open.png',
    clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: box.width + 260, height: box.height + 40 },
  });

  // Scroll test.
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, 220);
  await page.waitForTimeout(500);
  const after = await listbox.evaluate((el) => el.scrollTop);
  console.log('scrollTop after wheel:', after, '→ scrolled?', after > 5);

  await page.screenshot({
    path: DIR + 'leads-scrolled.png',
    clip: { x: Math.max(0, box.x - 20), y: Math.max(0, box.y - 20), width: box.width + 260, height: box.height + 40 },
  });
  await browser.close();
})();

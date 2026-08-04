const { chromium } = require('playwright');
const BASE = 'http://localhost:3000';

// Phone check runs BEFORE the required-select check in handleSubmit, so:
//  - partial phone  -> error mentions "complete phone number"  (BLOCKED by phone rule)
//  - empty/complete -> phone rule passes; next check (empty selects) errors about
//                      choosing an option  => proves the phone rule did NOT block.
(async () => {
  const browser = await chromium.launch({ headless: true });
  const cases = [
    ['PARTIAL', '555123', /complete phone number/i, true],
    ['EMPTY', '', /complete phone number/i, false],
    ['COMPLETE', '5551234567', /complete phone number/i, false],
  ];
  let allPass = true;
  for (const [name, phone, phoneErrRe, shouldBlock] of cases) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1400 } });
    const page = await ctx.newPage();
    let posted = false;
    await page.route('**/api/contact', (route) => {
      posted = true;
      route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.goto(BASE + '/contact', { waitUntil: 'networkidle', timeout: 20000 });
    await page.fill('input[name="name"]', 'QA Tester');
    await page.fill('input[name="email"]', 'qa@example.com');
    await page.fill('textarea[name="message"]', 'Testing phone validation.');
    if (phone) {
      await page.fill('input[name="phone"]', phone);
      // A phone present makes the SMS-consent checkboxes required — tick them
      // so native validation passes and the JS phone rule is what governs.
      const boxes = await page.$$('input[type="checkbox"]');
      for (const b of boxes) await b.check({ force: true });
    }
    await page.evaluate(() => document.querySelector('form').requestSubmit());
    await page.waitForTimeout(1000);

    const alertEl = await page.$('p[role="alert"]');
    const errTxt = alertEl ? (await alertEl.innerText()).trim() : '';
    const phoneField = await page.inputValue('input[name="phone"]');
    const phoneBlocked = phoneErrRe.test(errTxt);
    const ok = phoneBlocked === shouldBlock && (!shouldBlock ? !phoneBlocked : true) && (shouldBlock ? !posted : true);

    console.log(`\n=== ${name} (typed ${JSON.stringify(phone)}) ===`);
    console.log('  phone field    :', JSON.stringify(phoneField));
    console.log('  error shown    :', JSON.stringify(errTxt));
    console.log('  posted to API? :', posted);
    console.log('  phone-blocked  :', phoneBlocked, '| expected block:', shouldBlock, '=>', ok ? 'PASS' : 'FAIL');
    if (!ok) allPass = false;
    await ctx.close();
  }
  console.log('\nRESULT:', allPass ? 'ALL PASS ✅' : 'SOME FAIL ❌');
  await browser.close();
})();

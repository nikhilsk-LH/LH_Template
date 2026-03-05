const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write']
  });
  const page = await context.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('http://localhost:5173');
  
  // click 'Test Slot'
  await page.click('text=Test Slot');
  await page.waitForTimeout(500);

  // Find all cards
  const cards = await page.$$('.group.relative');
  console.log('Cards found:', cards.length);
  
  for (let i = 0; i < cards.length; i++) {
    try {
      await cards[i].click();
      await page.waitForTimeout(500); // wait for toast
      
      const toast = await page.$('.fixed.bottom-5');
      if (toast) {
        console.log('Card ' + i + ' copied successfully. Toast:', await toast.textContent());
        // remove the toast so it doesn't block the next click
        await page.evaluate(() => {
          const t = document.querySelector('.fixed.bottom-5');
          if (t) t.remove();
        });
      } else {
        console.log('Card ' + i + ' did not show toast');
      }
    } catch (e) {
      console.log('Card ' + i + ' failed to copy:', e.message);
    }
  }
  
  await browser.close();
})();

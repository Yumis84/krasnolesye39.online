'use strict';
// Export the actual website intro as a reference video for Higgsfield.
// Usage: node scripts/render-intro.cjs [url] [outputDir]
// Requires: npm install; ffmpeg on PATH; Playwright Chromium installed.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const url = process.argv[2] || 'http://127.0.0.1:8765/';
const out = path.resolve(process.argv[3] || 'outputs/higgsfield-source');
const fps = 12;
const seconds = 10;
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
    await page.route('https://vishtynets.ru/**', route => route.abort());
    await page.goto(url, { waitUntil: 'load' });
    await page.locator('#open').click();
    // Prevent the website redirect at the end of the ten-second experience.
    await page.evaluate(() => { window.addEventListener('beforeunload', e => e.preventDefault()); });
    const start = Date.now();
    for (let i = 0; i < fps * seconds; i++) {
      const expected = start + Math.round(i * 1000 / fps);
      const delay = expected - Date.now();
      if (delay > 0) await new Promise(resolve => setTimeout(resolve, delay));
      await page.screenshot({ path: path.join(out, `frame-${String(i).padStart(4, '0')}.png`), animations: 'allow' });
    }
    await page.close();
  } finally { await browser.close(); }
  const mp4 = path.join(out, 'krasnolesye-online-v4-source.mp4');
  const cmd = spawnSync('ffmpeg', ['-y','-framerate',String(fps),'-i',path.join(out,'frame-%04d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','22','-movflags','+faststart',mp4], { stdio: 'inherit' });
  if (cmd.status !== 0) throw new Error('ffmpeg export failed');
  console.log('Rendered source clip: ' + mp4);
})().catch(err => { console.error(err); process.exitCode = 1; });

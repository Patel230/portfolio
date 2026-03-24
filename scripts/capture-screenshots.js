import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const websites = [
  {
    name: 'growth',
    url: 'https://growth.gateandtech.in/',
    outputDir: 'public/images/gallery/growth'
  },
  {
    name: 'mindshift',
    url: 'https://mindshift.gateandtech.in/',
    outputDir: 'public/images/gallery/mindshift'
  },
  {
    name: 'iterate',
    url: 'https://graycodeai.github.io/iterate/',
    outputDir: 'public/images/gallery/iterate'
  },
  {
    name: 'gateandtech',
    url: 'https://gateandtech.in/',
    outputDir: 'public/images/gallery/gateandtech'
  }
];

async function captureScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('Starting screenshot capture...\n');

  for (const site of websites) {
    console.log(`Capturing: ${site.name}`);
    console.log(`  URL: ${site.url}`);
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    try {
      await page.goto(site.url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Wait for animations and lazy loading
      await new Promise(r => setTimeout(r, 2000));
      
      // Get page height for full page screenshot
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = 1080;
      const totalScreenshots = 5;
      
      // Calculate scroll positions for 5 evenly distributed screenshots
      const scrollStep = Math.max(0, (bodyHeight - viewportHeight) / (totalScreenshots - 1));
      
      // Capture 5 screenshots
      for (let i = 0; i < totalScreenshots; i++) {
        const y = Math.min(i * scrollStep, bodyHeight - viewportHeight);
        await page.evaluate((scrollY) => {
          window.scrollTo(0, scrollY);
        }, y);
        
        await new Promise(r => setTimeout(r, 500));
        
        const screenshotNum = (i + 1).toString().padStart(2, '0');
        const outputPath = path.join(__dirname, '..', site.outputDir, `${screenshotNum}.png`);
        
        await page.screenshot({
          path: outputPath,
          type: 'png',
          clip: {
            x: 0,
            y: 0,
            width: 1920,
            height: viewportHeight
          }
        });
        
        console.log(`  ✓ Saved: ${screenshotNum}.png`);
      }
      
    } catch (error) {
      console.error(`  ✗ Error capturing ${site.name}: ${error.message}`);
    }
    
    await page.close();
    console.log('');
  }

  await browser.close();
  console.log('Screenshot capture complete!');
}

captureScreenshots().catch(console.error);

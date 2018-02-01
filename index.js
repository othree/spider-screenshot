const fs = require('fs');
const path = require('path');

const urlp = require('url');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');

const spiderScreenshot = async function (program) {
  const print = program.verbose ? console.log.bind(console) : msg => {};

  const ENTRY_URL = program.url;
  const CONSTRAIN_URL = program.constrainUrl || ENTRY_URL;
  const SCREENSHOT_DIR = program.output;

  const BLACK_LIST = program.blackList ? fs.readFileSync(program.blackList).toString('utf8').split(/\n/) : [];

  const browser = await puppeteer.launch({headless: !program.debug});
  const page = await browser.newPage();
  const ua = await browser.userAgent();
  await page.emulate({
    viewport: {
      width: program.width,
      height: program.height,
      deviceScaleFactor: program.deviceScaleFactor
    },
    userAgent: program.userAgent || ua
  });

  let results = {[ENTRY_URL]: true};
  let queue = [ENTRY_URL];

  let tick = async (force, cb) => {
    let url = force || queue.shift();
    if (url) {
      try {
        await spider(url, cb);
        return tick(false, cb);
      } catch (e) {
        print(e);
        return tick(false, cb);
      }
    }
    return Promise.resolve();
  };

  let spider = async (url, cb) => {
    print(url);
    await page.goto(url, {timeout: 10 * 1000, waitUntil: ['networkidle2']});
    await cb(page);

    let currentURL = page.url();

    if (results[currentURL] === 2) { // Deal with redirect to existing page
      return Promise.resolve();
    } else {
      results[currentURL] = 2;
    }

    const hrefs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map(e => `${e.protocol}//${e.hostname}${e.pathname}`);
    });
    for (let href of hrefs) {
      let u = urlp.parse(href);
      if (href.indexOf(CONSTRAIN_URL) === 0 &&
        !results[href] &&
        BLACK_LIST.indexOf(u.pathname) === -1) {
        results[href] = 1;
        queue.push(href);
      }
    }
    return Promise.resolve();
  };

  let screenshot = page => {
    let url = page.url();
    let pathname = url.substring(CONSTRAIN_URL.length);
    let filename = pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, program.seperator) || 'index';
    mkdirp.sync(SCREENSHOT_DIR);
    return page.screenshot({path: path.join(SCREENSHOT_DIR, filename + '.png')});
  };

  await tick(false, screenshot);
  await browser.close();
};

module.exports = spiderScreenshot;

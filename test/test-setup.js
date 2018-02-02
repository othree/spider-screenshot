module.exports = async (browser, page) => {
  await page.goto('http://www.google.com', {timeout: 10 * 1000, waitUntil: ['networkidle2']});
  console.log('setup script!!');
  return true;
};

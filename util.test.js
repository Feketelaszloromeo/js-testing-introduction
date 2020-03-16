const  { generateText, checkandGenerate} = require('./util');
const puppeteer = require('puppeteer');


test('should output name and age', () => {
    const text = generateText('Romeo', 33);
    expect(text).toBe('Romeo (33 years old)');
    const text2 = generateText('Lacika', 25);
    expect(text2).toBe('Lacika (25 years old)');
});


test ('should output data-less text', () => {
    const text = generateText();
    expect(text).toBe('undefined (undefined years old)');
})


test ('should generate a valid text output', () => {
     const text = checkandGenerate('Romeo', 33);
     expect(text).toBe('Romeo (33 years old)')
})

test ('should create an element', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
        });
    const page = await browser.newPage();
   await  page.goto('file:///C:/Users/fekete.laszlo.romeo/Desktop/gitea-repos/TEST_js/js-testing-introduction/index.html');

   await page.click('input#name');
   await page.type('input#name', 'Laci');
   await page.click('input#age');
   await page.type('input#age', '19');
   await page.click('#btnAddUser');
   const finalText = await page.$eval('.user-item', el => el.textContent)
   expect (finalText).toBe('Laci (19 years old)');
}, 10000);

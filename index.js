const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    // await page.screenshot({ path: "naruto2.png", fullPage: true })

    // scraping text
    const names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)
    })
    await fs.writeFile("names.txt", names.join("\r\n"));

    // simulating the action of button (Client Side) from nodeJS
    await page.click("#clickme")
    const hiddenMessage = await page.$eval("#data", el => el.textContent);
    // console.log(hiddenMessage);
    await fs.writeFile("hiddenMessage.txt", hiddenMessage);

    // scraping image src and downloading them on system
    // const phtos = await page.$$eval("img", (imgs) => {
    //     return imgs.map(x => x.src);
    // })

    await page.type("#ourfield", "blue");

    await Promise.all([page.click("#ourform button"), page.waitForNavigation()])


    const info = await page.$eval("#message", el => el.textContent);
    // console.log(info);
    fs.writeFile("secretText.txt", info)
    // for (const phto of phtos) {
    //     const imagePage = await page.goto(phto);
    //     await fs.writeFile(phto.split("/").pop(), await imagePage.buffer())
    // }



    await browser.close()
}

start();
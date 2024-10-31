import * as fs from 'node:fs';
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { element, elements } from '../../utils/webdriver';
import { anyRow, controlButtons, dictionaryLabel } from '../../seedlang/pages/dictionary';
import { confirmSignIn, emailInput, passwordInput, signInButton } from '../../seedlang/pages/land';
import { getUsagesPage, getWordPage } from '../navigation/word_page';
import { getDeclensionsVerbsWithFrequenciesPath, getSeedlangVerbsWithFrequenciesPath } from '../../utils/paths';
import { Jimp } from 'jimp';


const mainContentClass = ".rAbschnitt";

const elementsToWait = [

];

const getVerbsWithFrequencies = () => {
  const fileContent = fs.readFileSync(getSeedlangVerbsWithFrequenciesPath());
  return JSON.parse(fileContent.toString('utf-8'));
}

const saveVerbsToFile = (verbs: any[]) => {
  fs.writeFileSync(getDeclensionsVerbsWithFrequenciesPath(), JSON.stringify(verbs));
}

export const scrabHtmls = async (driver: WebDriver) => {
  const verbs = getVerbsWithFrequencies();
  

  for (let i = 0; i < 1; i++) {
    const screenshotName = await takeScreenshot(driver, verbs[i].word);
    verbs[i].scrPath = screenshotName;
  }
  saveVerbsToFile(verbs);

  //



      

  // await driver.get("https://www.seedlang.com/");
};




const takeScreenshot = async (driver: WebDriver, word: string): Promise<string> => {
  
      await driver.get(getUsagesPage(word));
      let element = await driver.findElement(By.css(mainContentClass));
      const rect = await element.getRect();
      let image = await driver.takeScreenshot();
      let screenshot = await Jimp.read(Buffer.from(image, 'base64'));
  
      const scrPath = `${word}.png`;
      console.log(rect);
      // screenshot
      //   .crop({x: Math.max(rect.x, 0), y: Math.max(rect.y, 0), w: rect.width, h: rect.height});
      screenshot.write(`${word}.${'png'}`);
  
      return scrPath
}
// const waitUntilRowsAreReady = async (driver: WebDriver) => {
//   await driver.wait(element(driver, dictionaryLabel), 10000);
//   await driver.wait(element(driver, anyRow), 10000);
// }

// export const fetchHtmls = async (driver: WebDriver) => {
  
//   const button = await element(driver, signInButton);
//   await button.click();

//   const email = await element(driver, emailInput);
//   const password = await element(driver, passwordInput);

//   email.sendKeys("artem.marakhovskyi@gmail.com");
//   password.sendKeys("Awesome1789!");

//   const confirm = await element(driver, confirmSignIn);
//   await confirm.click();

//   const dictButton = await element(driver, vocab);
//   await dictButton.click();

//   await waitUntilRowsAreReady(driver);

//   await goThroughPages(driver);
// }

// const processPage = async (driver: WebDriver, idx: number) => {
//   const body = (await driver.findElement(By.xpath("//body")).getAttribute("outerHTML"));
//   fs.writeFileSync(`htmls/page_${idx}.html`, body);
// }

// const getNextButton = async (buttons: WebElement[]) => {
//   for (let i = 0; i < buttons.length; i++) {
//     if ((await buttons.at(i).getAttribute("innerText")).toLowerCase() == "next") {
//       return buttons[i];
//     }
//   }
//   return null;
// };

// const goThroughPages = async (driver: WebDriver) => {
//   let canGoToTheNextPage = false;
//   let pageIdx = 0;
//   do {
//     canGoToTheNextPage = false;
//     const buttons = await elements(driver, controlButtons);
//     const nextButton = await getNextButton(buttons);
//     canGoToTheNextPage = nextButton != null;
//     if (canGoToTheNextPage) {
//       await processPage(driver, pageIdx++);
//       await nextButton.click();
//       await waitUntilRowsAreReady(driver);
//     } else {
//       console.log("Completed")
//     }
//   }
//   while (canGoToTheNextPage);
// }
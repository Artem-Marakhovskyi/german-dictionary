import { Browser, Builder } from "selenium-webdriver";
import declension from './src/declension/cases/index';
export const prepareDriver = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().setTimeouts({implicit: 5000});
  return driver;
};


const run = async () => {
  await declension.scrabHtmls();
  // const driver = await prepareDriver();
  
};

run();

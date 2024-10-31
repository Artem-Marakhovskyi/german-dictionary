import { Browser, Builder } from "selenium-webdriver";
import seedlang from './src/seedlang/cases/index';
export const prepareDriver = async () => {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  await driver.manage().setTimeouts({implicit: 5000});
  return driver;
};


const run = async () => {
  const driver = await prepareDriver();
  await seedlang.login(driver);
};

run();

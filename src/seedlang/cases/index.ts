import * as fs from 'node:fs';
import { element, elements } from "../navigation/seedlang_atoms";
import { vocab } from "../pages/home";
import { confirmSignIn, emailInput, passwordInput, signInButton } from "../pages/land";
import { By, WebDriver, WebElement } from "selenium-webdriver";
import { getVerbs } from './extract_verbs';
import { anyRow, controlButtons, dictionaryLabel } from '../pages/dictionary';
import { next } from 'cheerio/dist/commonjs/api/traversing';

const waitUntilRowsAreReady = async (driver: WebDriver) => {
  await driver.wait(element(driver, dictionaryLabel), 10000);
  await driver.wait(element(driver, anyRow), 10000);
}

const login = async (driver: WebDriver) => {
  await driver.get("https://www.seedlang.com/");
  const button = await element(driver, signInButton);
  await button.click();

  const email = await element(driver, emailInput);
  const password = await element(driver, passwordInput);

  email.sendKeys("artem.marakhovskyi@gmail.com");
  password.sendKeys("Awesome1789!");

  const confirm = await element(driver, confirmSignIn);
  await confirm.click();

  const dictButton = await element(driver, vocab);
  await dictButton.click();

  await waitUntilRowsAreReady(driver);

  await goThroughPages(driver);
}

const processPage = async (driver: WebDriver, idx: number) => {
  const body = (await driver.findElement(By.xpath("//body")).getAttribute("outerHTML"));
  fs.writeFileSync(`htmls/page_${idx}.html`, body);
}

const getNextButton = async (buttons: WebElement[]) => {
  for (let i = 0; i < buttons.length; i++) {
    if ((await buttons.at(i).getAttribute("innerText")).toLowerCase() == "next") {
      return buttons[i];
    }
  }
  return null;
};

const goThroughPages = async (driver: WebDriver) => {
  let canGoToTheNextPage = false;
  let pageIdx = 0;
  do {
    canGoToTheNextPage = false;
    const buttons = await elements(driver, controlButtons);
    const nextButton = await getNextButton(buttons);
    canGoToTheNextPage = nextButton != null;
    if (canGoToTheNextPage) {
      await processPage(driver, pageIdx++);
      await nextButton.click();
      await waitUntilRowsAreReady(driver);
    } else {
      console.log("Completed")
    }
  }
  while (canGoToTheNextPage);
}

export default {
  login,
  getVerbs,
};

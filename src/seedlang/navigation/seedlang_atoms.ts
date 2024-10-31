import { By, WebDriver, WebElement, WebElementPromise } from "selenium-webdriver";

export const getPage = (idx: number): string => {
  return `https://www.seedlang.com/vocab/words/page/${idx + 1}`
}

export const element = (driver: WebDriver, by: By): WebElementPromise => {
  return driver.findElement(by);
};

export const elements = (driver: WebDriver, by: By): Promise<WebElement[]> => {
  return driver.findElements(by);
};
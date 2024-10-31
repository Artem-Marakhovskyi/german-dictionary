import * as fs from 'node:fs';

import * as cheerio from 'cheerio';

const wordClass = ".css-160fpri";
const frequencyBlockClass = ".css-x2i6jg";
const frequent = 'css-9uri6i';

type WordFreq = {word: String; frequency: number};

const parsePage = (idx): WordFreq[] => {
  const htmlBuffer = fs.readFileSync(`htmls/page_${idx}.html`);
  const $ = cheerio.load(htmlBuffer);  
  
  let words = [];
  $(wordClass).each((idx, elem) => {
    words = words.concat([elem.children[0].data]);
  });
  
  let frequencies = [];
  $(frequencyBlockClass).each((idx, elem) => {
    frequencies = frequencies.concat(
      elem.children.map(
        x => x.attribs.class)
      .reduce(
        (p, c) => c == frequent ? p + 1 : p, 0)
    );
  });

  return words.map((w, idx) => {
    return {
      word: w,
      frequency: !!frequencies && frequencies.length == words.length ? frequencies[idx] : 0,
    }
  });
};

export const getVerbs = async () => {
  let pageResults = [];
  for (let i = 0; i <= 179; i++) {
    pageResults = pageResults.concat(parsePage(i));
  }  
  fs.writeFileSync('htmls/result/res.json', JSON.stringify(pageResults));
  
};
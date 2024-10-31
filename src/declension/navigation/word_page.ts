export const getWordPage = (word: String) => {
  return `https://www.verbformen.com/declension/nouns/?w=${word}`;
};

export const getPrepositionsForWord(word: String) => {
  const normalizedWord = word.replace("ß", "s5");
  return `https://www.woerter.net/verbs/usages/${normalizedWord}.htm`;
};
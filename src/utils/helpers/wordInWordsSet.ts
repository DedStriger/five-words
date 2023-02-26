import { getWordsSet } from './getWordsSet';

export const wordInWordsSet = (word: string) => {
  const wordsSet = getWordsSet();
  const isInWordsSet = wordsSet.has(word.toLowerCase());

  return isInWordsSet;
};

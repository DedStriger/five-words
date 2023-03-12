import { WORDS } from 'utils/constants/wordsList';

const startDate = new Date(2023, 0);
const currentDate = new Date();

export const getPastDays = (): number => {
  return Math.ceil((+currentDate - +startDate) / (60 * 60 * 24 * 1000));
};

export const getWordOfDay = (): string => {
  return WORDS[getPastDays()];
};

export const getWordsSet = (): Set<string> => {
  const wordsSet = new Set(WORDS);

  return wordsSet;
};

export const wordInWordsSet = (word: string): boolean => {
  const wordsSet = getWordsSet();
  const isInWordsSet = wordsSet.has(word.toLowerCase());

  return isInWordsSet;
};

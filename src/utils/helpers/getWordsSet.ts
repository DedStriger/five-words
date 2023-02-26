import { WORDS } from 'utils/constants/words';

export const getWordsSet = () => {
  const wordsSet = new Set(WORDS);

  return wordsSet;
};

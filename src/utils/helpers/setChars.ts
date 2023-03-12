export const setChars = (chars: string[], char: string) => Array.from(new Set([...chars, char]));

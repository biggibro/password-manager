import {
  dictionaryDigits,
  dictionaryLowerLetters,
  dictionarySpecialSymbols,
  dictionaryUpperLetters,
} from "./constants/dictionary-generate-password.constants.ts";

interface Props {
  lengthPassword: number;

  symbols?: string;
  withoutRules?: boolean;

  registry?: "upper" | "lower" | "random";
  hasLetter?: boolean;
  hasDigit?: boolean;
  hasSpecialSymbol?: boolean;
}

export const generatePassword = (props: Props): string => {
  const {
    lengthPassword,

    symbols,
    withoutRules,

    registry,
    hasLetter,
    hasDigit,
    hasSpecialSymbol,
  } = props;

  let value = "";
  let password = "";

  if (withoutRules) {
    value = symbols
      ? symbols
      : dictionaryLowerLetters +
        dictionaryUpperLetters +
        dictionaryDigits +
        dictionarySpecialSymbols;

    password = randomGenerator(value, lengthPassword);

    return password;
  }

  if (hasLetter) {
    if (registry === "random") {
      value += dictionaryLowerLetters + dictionaryUpperLetters;
    }

    if (registry === "upper") {
      value += dictionaryUpperLetters;
    }

    if (registry === "lower") {
      value += dictionaryLowerLetters;
    }
  }

  if (hasDigit) {
    value += dictionaryDigits;
  }

  if (hasSpecialSymbol) {
    value += dictionarySpecialSymbols;
  }

  return randomGenerator(value, lengthPassword);
};

const randomGenerator = (chars: string, lengthPassword: number): string => {
  let generated = "";

  if (!chars) {
    return "";
  }

  for (let i = 0; i < lengthPassword; i++) {
    generated += chars[Math.floor(Math.random() * chars.length)];
  }

  return generated;
};

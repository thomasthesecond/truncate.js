/**
 * Takes a string of text and shortens it to the desired number of characters.
 * This will not truncate in the middle of a word.
 * @param  {string} string          The text to be truncated
 * @param  {number} characterLimit  The number of maximum characters
 * @param  {string} [separator=" "] The separator in which to use to split words
 * @return {string}                 The newly truncated text, with or without an ellipsis
 */
export const truncate = (string, characterLimit, separator = " ") => {
  if (string.length <= characterLimit) {
    return string;
  }

  const text = string.substr(0, string.lastIndexOf(separator, characterLimit));
  const lastCharacter = text.slice(-1);
  const punctuationRegExp = /,|;|:|-/;
  const endOfSentenceRegExp = /\.|\?|!/;

  /**
   * Uses a regular expression to check if the truncated text is a full
   * sentance. If it is, then we don’t want to append an ellipsis.
   * @return {string} Either nothing or an ellipsis
   */
  const appendEllipsis = () => {
    if (endOfSentenceRegExp.test(lastCharacter)) {
      return "";
    }

    return "…";
  };

  /**
   * This checks that the string doesn’t end with a punctuation mark that
   * would look strange next to an ellipsis, e.g., "lorem ipsum,…"
   * @return {string} Truncated text
   */
  const returnText = () => {
    if (punctuationRegExp.test(lastCharacter)) {
      return text.slice(0, -1);
    }

    return text;
  };

  return `${returnText()}${appendEllipsis()}`;
};

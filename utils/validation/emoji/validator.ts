export const validator = (emoji: string) => {
  if (!emoji) {
    return true;
  }

  return /\p{Emoji}/u.test(emoji);
};

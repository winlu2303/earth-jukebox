export const vibrate = (pattern = 50) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
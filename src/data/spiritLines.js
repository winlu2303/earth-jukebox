export const spiritLines = {
  greeting: [
    "Welcome! I am the Spirit of Earth. What would you like to know about our planet?",
  ],
  ask: [
    "Ask me anything! I can answer absolutely any question about the Earth and its climate.",
    "I am listening. Ask me anything you want.",
  ],
  
  co: [
    "Listen. This is the breath of the Amazon. It is heavy today.",
    "Carbon monoxide is a deep rumble. The redder the map, the louder the bass.",
  ],
  temperature: [
    "The Arctic is singing high. It is getting warmer.",
    "Cold is the cello. Heat is the bass. Listen where they meet.",
  ],
  pm25: [
    "This is the dust in the air you breathe. Each orange note is a particle.",
  ],
  wind: [
    "Wind plays the flute. Fast gusts, high notes. Still air, silence.",
  ],
  o3: [
    "Ozone sings in bells. Ringing high above the Earth.",
  ],
  precipitation: [
    "Rain falls on the strings. Each drop a pizzicato.",
  ],
  no2: [
    "Nitrogen dioxide is a city song. Purple synth over a burning sky.",
  ],
};

export function pickLine(datasetId) {
  const fallbackKeys = ['greeting', 'ask'];
  const fallbackKey = fallbackKeys[Math.floor(Math.random() * fallbackKeys.length)];
  
  const arr = spiritLines[datasetId] || spiritLines[fallbackKey] || ["I am the Spirit of Earth. Listen."];
  return arr[Math.floor(Math.random() * arr.length)];
}
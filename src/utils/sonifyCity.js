export function sonifyCity({ temperature, precipitation = 0, wind = 0 }) {
  const instruments = [];
  const description = [];

  // --- Температура ---
  if (temperature < 0) {
    instruments.push('Cello');
    description.push('freezing cold');
  } else if (temperature < 15) {
    instruments.push('Strings');
    description.push('cool');
  } else if (temperature < 25) {
    instruments.push('Piano');
    description.push('mild');
  } else if (temperature < 35) {
    instruments.push('Bass');
    description.push('warm');
  } else {
    instruments.push('Bass', 'Synth');
    description.push('scorching heat');
  }

  // --- Осадки ---
  if (precipitation > 20) {
    instruments.push('Piano');
    description.push('heavy rain');
  } else if (precipitation > 5) {
    instruments.push('Piano');
    description.push('light rain');
  }

  // --- Ветер ---
  if (wind > 15) {
    instruments.push('Flute');
    description.push('strong wind');
  } else if (wind > 7) {
    instruments.push('Flute');
    description.push('breeze');
  }

  // Уникальные инструменты (Piano может добавиться дважды: от температуры и от осадков)
  const unique = [...new Set(instruments)];

  return {
    instruments: unique,
    description: description.join(', '),
    summary: unique.join(' + '),
  };
}
export const datasets = {
  co: {
    label: 'Carbon Monoxide',
    instruments: ['Bass', 'Piano', 'Strings'],
    description: 'Carbon Monoxide sounds like a deep bass rumble with occasional piano chords. The more red you see, the louder the bass.',
    video: 'https://youtu.be/4J7y8xUG4rY', // co_final
    api: 'https://svs.gsfc.nasa.gov/api/5110',
    live: 'https://svs.gsfc.nasa.gov/5110/',
    colorPercent: [
      { color: 'red',    instrument: 'Bass',    percent: 8.5 },
      { color: 'orange', instrument: 'Piano',   percent: 16.8 },
      { color: 'yellow', instrument: 'Strings', percent: 66.9 },
      { color: 'green',  instrument: 'Flute',   percent: 4.1 },
      { color: 'blue',   instrument: 'Cello',   percent: 2.2 },
      { color: 'purple', instrument: 'Synth',   percent: 0.9 },
      { color: 'white',  instrument: 'Bells',   percent: 0.6 },
    ],
  },
  temperature: {
    label: 'Temperature',
    instruments: ['Cello', 'Bass'],
    description: 'Temperature sounds like a conversation between cello (cold) and bass (hot). When they overlap, you hear both.',
    video: 'https://youtu.be/q-k22CE-HsU', // temperature_final
    api: 'https://svs.gsfc.nasa.gov/api/5147',
    live: 'https://svs.gsfc.nasa.gov/5147/',
    colorPercent: [
      { color: 'red',    instrument: 'Bass',    percent: 22.0 },
      { color: 'orange', instrument: 'Piano',   percent: 10.0 },
      { color: 'yellow', instrument: 'Strings', percent: 5.0  },
      { color: 'green',  instrument: 'Flute',   percent: 3.0  },
      { color: 'blue',   instrument: 'Cello',   percent: 55.0 },
      { color: 'purple', instrument: 'Synth',   percent: 3.0  },
      { color: 'white',  instrument: 'Bells',   percent: 2.0  },
    ],
  },
  pm25: {
    label: 'Particulate Matter',
    instruments: ['Piano', 'Synth'],
    description: 'PM2.5 sounds like dust in the air — each orange note is a particle drifting by.',
    video: 'https://youtu.be/lkEQDQU6Yn0', // pm25_final
    api: 'https://svs.gsfc.nasa.gov/api/5151',
    live: 'https://svs.gsfc.nasa.gov/5151/',
    colorPercent: [],
  },
  wind: {
    label: 'Wind Speed',
    instruments: ['Flute', 'Bells'],
    description: 'Wind plays the flute. Fast gusts, high notes. Still air, silence.',
    video: 'https://youtu.be/vGPztLyOJZg', // wind_final
    api: 'https://svs.gsfc.nasa.gov/api/5148',
    live: 'https://svs.gsfc.nasa.gov/5148/',
    colorPercent: [],
  },
  o3: {
    label: 'Ozone',
    instruments: ['Bells', 'Strings'],
    description: 'Ozone sings in bells, ringing high above the Earth.',
    video: 'https://youtu.be/QuJOHPC_AQE', // o3_final
    api: 'https://svs.gsfc.nasa.gov/api/5152',
    live: 'https://svs.gsfc.nasa.gov/5152/',
    colorPercent: [],
  },
  precipitation: {
    label: 'Precipitation',
    instruments: ['Strings', 'Piano'],
    description: 'Rain falls on the strings. Each drop is a pizzicato.',
    video: 'https://youtu.be/y3V7Evh-Fxg', // precipitation_final
    api: 'https://svs.gsfc.nasa.gov/api/5149',
    live: 'https://svs.gsfc.nasa.gov/5149/',
    colorPercent: [],
  },
  no2: {
    label: 'Nitrogen Dioxide',
    instruments: ['Synth', 'Bass'],
    description: 'Nitrogen dioxide is a city song — purple synth over a burning sky.',
    video: 'https://youtu.be/oJX7ykSXsNA', // no2_final
    api: 'https://svs.gsfc.nasa.gov/api/5154',
    live: 'https://svs.gsfc.nasa.gov/5154/',
    colorPercent: [],
  },
};
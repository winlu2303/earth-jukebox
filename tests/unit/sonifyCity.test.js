import { describe, it, expect } from 'vitest';
import { sonifyCity } from '../../src/utils/sonifyCity';

describe('sonifyCity', () => {
  it('maps freezing temperature to Cello', () => {
    const r = sonifyCity({ temperature: -5, precipitation: 0, wind: 0 });
    expect(r.instruments).toContain('Cello');
    expect(r.description).toContain('freezing cold');
  });

  it('maps cool temperature to Strings', () => {
    const r = sonifyCity({ temperature: 10, precipitation: 0, wind: 0 });
    expect(r.instruments).toContain('Strings');
    expect(r.description).toContain('cool');
  });

  it('maps mild temperature to Piano', () => {
    const r = sonifyCity({ temperature: 20, precipitation: 0, wind: 0 });
    expect(r.instruments).toContain('Piano');
    expect(r.description).toContain('mild');
  });

  it('maps warm temperature to Bass', () => {
    const r = sonifyCity({ temperature: 30, precipitation: 0, wind: 0 });
    expect(r.instruments).toContain('Bass');
    expect(r.description).toContain('warm');
  });

  it('maps scorching heat to Bass + Synth', () => {
    const r = sonifyCity({ temperature: 40, precipitation: 0, wind: 0 });
    expect(r.instruments).toEqual(expect.arrayContaining(['Bass', 'Synth']));
    expect(r.description).toContain('scorching heat');
  });

  it('adds Piano for light rain', () => {
    const r = sonifyCity({ temperature: 20, precipitation: 10, wind: 0 });
    expect(r.instruments).toContain('Piano');
    expect(r.description).toContain('light rain');
  });

  it('adds Piano for heavy rain', () => {
    const r = sonifyCity({ temperature: 20, precipitation: 30, wind: 0 });
    expect(r.instruments).toContain('Piano');
    expect(r.description).toContain('heavy rain');
  });

  it('adds Flute for breeze', () => {
    const r = sonifyCity({ temperature: 20, precipitation: 0, wind: 10 });
    expect(r.instruments).toContain('Flute');
    expect(r.description).toContain('breeze');
  });

  it('adds Flute for strong wind', () => {
    const r = sonifyCity({ temperature: 20, precipitation: 0, wind: 18 });
    expect(r.instruments).toContain('Flute');
    expect(r.description).toContain('strong wind');
  });

  it('does not duplicate instruments', () => {
    const r = sonifyCity({ temperature: 20, precipitation: 30, wind: 0 });
    expect(r.instruments.filter((i) => i === 'Piano')).toHaveLength(1);
  });

  it('handles missing precipitation and wind (defaults to 0)', () => {
    const r = sonifyCity({ temperature: 20 });
    expect(r.instruments).toEqual(['Piano']);
  });
});
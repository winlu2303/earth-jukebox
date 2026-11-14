import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LiveCitySound from '../../src/components/LiveCitySound';

vi.mock('../../src/components/AccessibilityProvider', () => ({
  useA11y: () => ({ speak: vi.fn() }),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

function mockWeatherSuccess() {
  mockFetch
    // geocoding
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { latitude: 55.75, longitude: 37.62, name: 'Moscow', country: 'Russia' },
        ],
      }),
    })
    // weather
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        current: { temperature_2m: 5, precipitation: 0, wind_speed_10m: 3 },
      }),
    });
}

describe('LiveCitySound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWeatherSuccess();
  });

  it('renders the city input and submit button', () => {
    render(<LiveCitySound />);
    expect(screen.getByLabelText(/city name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /fetch weather/i })).toBeInTheDocument();
  });

  it('fetches weather and shows sonification summary', async () => {
    render(<LiveCitySound />);
    await userEvent.click(screen.getByRole('button', { name: /fetch weather/i }));
    await waitFor(() => {
      expect(screen.getByText(/sounds like/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Moscow/i)).toBeInTheDocument();
    expect(screen.getByText(/Strings/i)).toBeInTheDocument();
  });

  it('shows fallback when city is not found', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ results: [] }),
      });

    render(<LiveCitySound />);
    const input = screen.getByLabelText(/city name/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'Nowhereville');
    await userEvent.click(screen.getByRole('button', { name: /fetch weather/i }));
    await waitFor(() => {
      expect(screen.getByText(/estimated values/i)).toBeInTheDocument();
    });
  });

  it('announces result via aria-live region', async () => {
    render(<LiveCitySound />);
    await userEvent.click(screen.getByRole('button', { name: /fetch weather/i }));
    await waitFor(() => {
      const live = document.querySelector('[aria-live="polite"]');
      expect(live).toBeInTheDocument();
      expect(live.textContent).toMatch(/Moscow/);
    });
  });
});
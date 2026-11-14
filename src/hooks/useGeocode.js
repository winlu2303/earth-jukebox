const cache = new Map() // "City, Country" -> {lat, lng}

export async function geocodeCity(city, country) {
  const key = `${city}, ${country}`
  if (cache.has(key)) return cache.get(key)

  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(`${city}, ${country}`)}` +
    `&format=json&limit=1`

  const res = await fetch(url, {
    headers: { 'Accept-Language': 'en' },
  })
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`)
  const data = await res.json()
  if (!data.length) throw new Error(`City not found: ${key}`)

  const result = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
  cache.set(key, result)
  return result
}
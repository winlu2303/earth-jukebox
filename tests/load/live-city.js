import http from 'k6/http'
import { check, sleep, group } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'https://earth-jukebox.netlify.app'

export const options = {
  stages: [
    { duration: '30s', target: 10 },  
    { duration: '1m',  target: 50 }, 
    { duration: '30s', target: 0 },  
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.05'], // <5% ошибок
  },
}

const CITIES = [
  { city: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6173 },
  { city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  { city: 'Yakutsk', country: 'Russia', lat: 62.0355, lng: 129.6755 },
  { city: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333 },
  { city: 'Tromsø', country: 'Norway', lat: 69.6492, lng: 18.9553 },
]

export default function () {
  const c = CITIES[Math.floor(Math.random() * CITIES.length)]

  group('NASA POWER fetch', () => {
    const date = new Date()
    date.setDate(date.getDate() - 3)
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
    const url =
      `https://power.larc.nasa.gov/api/temporal/daily/point` +
      `?parameters=T2M,PRECTOTCORR,WS2M` +
      `&community=RE&longitude=${c.lng}&latitude=${c.lat}` +
      `&start=${dateStr}&end=${dateStr}&format=JSON`

    const res = http.get(url)
    check(res, {
      'NASA POWER 200': (r) => r.status === 200,
      'has T2M': (r) => r.json('properties.parameter.T2M') !== undefined,
    })
  })

  group('Nominatim geocode', () => {
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?q=${encodeURIComponent(`${c.city}, ${c.country}`)}&format=json&limit=1`
    const res = http.get(url, { headers: { 'User-Agent': 'EarthJukebox-LoadTest/1.0' } })
    check(res, {
      'Nominatim 200': (r) => r.status === 200,
      'has result': (r) => r.json().length > 0,
    })
  })

  sleep(Math.random() * 2 + 1) 
}
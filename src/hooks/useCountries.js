import { useEffect, useState } from 'react'

let cache = null

export function useCountries() {
  const [countries, setCountries] = useState(cache ?? {})
  const [loading, setLoading] = useState(!cache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cache) return
    let cancelled = false
    setLoading(true)
    fetch('/data/countries.min.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        cache = data
        setCountries(data)
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])

  return { countries, loading, error }
}
import { useCallback, useEffect, useRef, useState } from 'react'

export function useAsync<TArgs extends any[], TResult>(fn: (...args: TArgs) => Promise<TResult>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [value, setValue] = useState<TResult | null>(null)
  const mounted = useRef(true)

  useEffect(() => () => { mounted.current = false }, [])

  const run = useCallback(async (...args: TArgs) => {
    setLoading(true)
    setError(null)
    try {
      const v = await fn(...args)
      if (mounted.current) setValue(v)
      return v
    } catch (e) {
      if (mounted.current) setError(e)
      throw e
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [fn])

  return { run, loading, error, value, setValue } as const
}

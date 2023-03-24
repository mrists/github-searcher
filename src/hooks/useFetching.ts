import { useState } from 'react'

export function useFetching(cb: () => Promise<void>): any[] {
  const [error, setError] = useState('')

  const fetching = async () => {
    try {
      await cb()
      setError('')
    } catch (err: unknown) {
      setError((err as Error).message)
    }
  }

  return [fetching, error]
}

import { useState } from 'react'

export function useFetching(cb: () => Promise<void>): any[] {
  const [error, setError] = useState('')

  const fetching = async () => {
    try {
      await cb()
      setError('')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return [fetching, error]
}

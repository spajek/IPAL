'use client'

import { useState, useEffect, useMemo } from 'react'

interface UseSearchOptions<T> {
  data: T[]
  searchFields: (keyof T)[]
  delay?: number
}

export function useSearch<T>({ data, searchFields, delay = 300 }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay])

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return data

    const lowerQuery = debouncedQuery.toLowerCase()
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field]
        return typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
      }),
    )
  }, [data, searchFields, debouncedQuery])

  return {
    query,
    setQuery,
    filteredData,
    isSearching: query !== debouncedQuery,
  }
}

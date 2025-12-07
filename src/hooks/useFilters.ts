'use client'

import { useState, useMemo } from 'react'

interface UseFiltersOptions<T> {
  data: T[]
  filterFn: (item: T, filters: Record<string, string>) => boolean
}

export function useFilters<T>({ data, filterFn }: UseFiltersOptions<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const filteredData = useMemo(() => {
    const hasActiveFilters = Object.values(filters).some((value) => value && value !== 'all')

    if (!hasActiveFilters) return data
    return data.filter((item) => filterFn(item, filters))
  }, [data, filters, filterFn])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({})
  }

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredData,
  }
}

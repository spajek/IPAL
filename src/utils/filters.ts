import { PreConsultationProject, ConsultationProject, Status } from '@/types'

export function filterByStatus<T extends { status: Status }>(items: T[], status: string): T[] {
  if (status === 'all') return items
  return items.filter((item) => item.status === status)
}

export function filterByCategory<T extends { category: string }>(
  items: T[],
  category: string,
): T[] {
  if (category === 'all') return items
  return items.filter((item) => item.category === category)
}

export function filterBySearchQuery<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
  if (!query) return items

  const lowerQuery = query.toLowerCase()
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field]
      return typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
    }),
  )
}

export function filterProjects<T extends PreConsultationProject | ConsultationProject>(
  projects: T[],
  filters: {
    status: string
    category: string
    searchQuery: string
  },
): T[] {
  let filtered = projects

  if (filters.status !== 'all') {
    filtered = filterByStatus(filtered, filters.status)
  }

  if (filters.category !== 'all') {
    filtered = filterByCategory(filtered, filters.category)
  }

  if (filters.searchQuery) {
    filtered = filterBySearchQuery(filtered, filters.searchQuery, [
      'title',
      'description',
      'institution',
    ])
  }

  return filtered
}

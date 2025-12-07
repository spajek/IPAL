export function sortByDate<T extends { createdAt: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc',
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

export function sortByDeadline<T extends { deadline: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'asc',
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.deadline).getTime()
    const dateB = new Date(b.deadline).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

export function sortByRating<T extends { averageRating: number }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc',
): T[] {
  return [...items].sort((a, b) => {
    return order === 'asc' ? a.averageRating - b.averageRating : b.averageRating - a.averageRating
  })
}

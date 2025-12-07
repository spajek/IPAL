/**
 * Formatuje datę do polskiego formatu
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('pl-PL', options)
}

/**
 * Formatuje datę do formatu ISO
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Sprawdza czy data jest przeszła
 */
export function isPastDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

/**
 * Sprawdza czy data jest przyszła
 */
export function isFutureDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj > new Date()
}

/**
 * Zwraca liczbę dni do daty
 */
export function daysUntil(date: string | Date): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = dateObj.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Formatuje liczbę z separatorem tysięcy
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('pl-PL')
}

/**
 * Zwraca inicjały z imienia i nazwiska
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

/**
 * Obcina tekst do określonej długości
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

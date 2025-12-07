/**
 * Sprawdza czy string jest prawidłowym adresem email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sprawdza czy string nie jest pusty
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

/**
 * Sprawdza czy liczba jest w zakresie
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Waliduje rating (1-5)
 */
export function isValidRating(rating: number): boolean {
  return isInRange(rating, 1, 5)
}

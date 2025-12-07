export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

export function isValidRating(rating: number): boolean {
  return isInRange(rating, 1, 5)
}

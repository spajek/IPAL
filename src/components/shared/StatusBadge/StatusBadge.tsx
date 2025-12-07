'use client'

import { Badge } from '@mantine/core'
import { Status } from '@/types'

interface StatusBadgeProps {
  status: Status
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'filled' | 'outline'
}

const statusConfig = {
  active: { color: 'green', label: 'Aktywne' },
  closed: { color: 'gray', label: 'Zakończone' },
  draft: { color: 'yellow', label: 'Projekt' },
  planned: { color: 'blue', label: 'Planowane' },
} as const

export function StatusBadge({ status, size = 'md', variant = 'light' }: StatusBadgeProps) {
  const config = statusConfig[status] || { color: 'gray', label: status }

  return (
    <Badge color={config.color} variant={variant} size={size}>
      {config.label}
    </Badge>
  )
}

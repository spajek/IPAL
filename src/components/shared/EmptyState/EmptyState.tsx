'use client'

import { Paper, Text, Stack } from '@mantine/core'
import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <Paper p="xl" ta="center">
      {icon && (
        <Stack align="center" gap="md" mb="md">
          {icon}
        </Stack>
      )}
      <Text size="lg" fw={500} mb={description ? 'xs' : 0}>
        {title}
      </Text>
      {description && (
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      )}
    </Paper>
  )
}

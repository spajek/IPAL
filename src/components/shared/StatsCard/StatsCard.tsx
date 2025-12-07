'use client'

import { Paper, Group, Text, ThemeIcon } from '@mantine/core'
import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color?: string
}

export function StatsCard({ title, value, icon, color = 'blue' }: StatsCardProps) {
  return (
    <Paper p="md" shadow="sm" radius="md" withBorder>
      <Group justify="space-between">
        <div>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed">
            {title}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
        </div>
        <ThemeIcon size={32} color={color}>
          {icon}
        </ThemeIcon>
      </Group>
    </Paper>
  )
}

'use client'

import { Group, Badge } from '@mantine/core'
import { StatusBadge } from '@/components/shared'
import { Status } from '@/types'

interface ProjectCardHeaderProps {
  status: Status
  category: string
}

export function ProjectCardHeader({ status, category }: ProjectCardHeaderProps) {
  return (
    <Group justify="space-between" mb="xs">
      <StatusBadge status={status} />
      <Badge variant="outline">{category}</Badge>
    </Group>
  )
}

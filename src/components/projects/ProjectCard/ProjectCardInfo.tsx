'use client'

import { Stack, Group, Text } from '@mantine/core'
import {
  IconBuilding,
  IconCalendar,
  IconStar,
  IconMessage,
  IconBrain,
  IconFileText,
} from '@tabler/icons-react'
import { Rating } from '@mantine/core'

interface ProjectCardInfoProps {
  institution: string
  deadline: string
  averageRating?: number
  ratingsCount?: number
  commentsCount?: number
  documentsCount?: number
  showAIBadge?: boolean
}

export function ProjectCardInfo({
  institution,
  deadline,
  averageRating,
  ratingsCount,
  commentsCount,
  documentsCount,
  showAIBadge,
}: ProjectCardInfoProps) {
  return (
    <Stack gap="xs">
      <Group gap="xs">
        <IconBuilding size={14} />
        <Text size="xs">{institution}</Text>
      </Group>

      <Group gap="xs">
        <IconCalendar size={14} />
        <Text size="xs">Do: {new Date(deadline).toLocaleDateString('pl-PL')}</Text>
      </Group>

      {averageRating !== undefined && ratingsCount !== undefined && (
        <Group gap="xs">
          <IconStar size={14} />
          <Rating value={averageRating} readOnly size="xs" />
          <Text size="xs">({ratingsCount})</Text>
        </Group>
      )}

      {commentsCount !== undefined && (
        <Group gap="xs">
          <IconMessage size={14} />
          <Text size="xs">{commentsCount} komentarzy</Text>
        </Group>
      )}

      {documentsCount !== undefined && (
        <Group gap="xs">
          <IconFileText size={14} />
          <Text size="xs">{documentsCount} dokumentów</Text>
        </Group>
      )}

      {showAIBadge && (
        <Group gap="xs">
          <IconBrain size={14} />
          <Text size="xs" c="blue">
            Analiza AI
          </Text>
        </Group>
      )}
    </Stack>
  )
}

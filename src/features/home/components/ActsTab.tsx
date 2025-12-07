'use client'

import { SimpleGrid, Skeleton, Card, Text, Badge, Group, Button } from '@mantine/core'
import { IconCalendar, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { Act } from '@/types'
import { EmptyState } from '@/components/shared'
import classes from './HomeCard.module.css'

interface ActsTabProps {
  data: Act[]
  loading: boolean
  searchQuery?: string
}

export function ActsTab({ data, loading, searchQuery }: ActsTabProps) {
  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={220} />
          ))}
      </SimpleGrid>
    )
  }

  if (data.length === 0 && searchQuery) {
    return (
      <EmptyState
        title={`Nie znaleziono wyników dla "${searchQuery}"`}
        description="Spróbuj użyć innych słów kluczowych"
      />
    )
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {data.slice(0, 6).map((item) => (
        <Card key={item.ELI} padding="lg" withBorder className={classes.card}>
          <Group justify="space-between" mb="xs">
            <Badge
              color={
                item.status?.includes('uchylon')
                  ? 'red'
                  : item.status?.includes('obowiązuj')
                  ? 'green'
                  : 'blue'
              }
              tt="none"
              variant="light"
            >
              {item.status}
            </Badge>
            <Group gap={4}>
              <IconCalendar size={14} />
              <Text size="xs" c="dimmed">
                {item.announcementDate}
              </Text>
            </Group>
          </Group>

          <Text fw={600} mt="xs" lineClamp={3} style={{ flexGrow: 1 }} mb="xl">
            {item.title}
          </Text>

          <Button
            component={Link}
            href={`/ustawy/${encodeURIComponent(item.ELI)}`}
            variant="default"
            fullWidth
            rightSection={<IconArrowRight size={16} />}
          >
            Szczegóły
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  )
}

'use client'

import {
  SimpleGrid,
  Skeleton,
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Progress,
} from '@mantine/core'
import { IconBuilding, IconCalendar, IconUsers, IconClock, IconEye } from '@tabler/icons-react'
import Link from 'next/link'
import { ConsultationProject } from '@/types'
import { EmptyState, StatusBadge } from '@/components/shared'
import classes from './HomeCard.module.css'

interface ConsultationsTabProps {
  data: ConsultationProject[]
  loading: boolean
  searchQuery?: string
}

export function ConsultationsTab({ data, loading, searchQuery }: ConsultationsTabProps) {
  if (loading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} height={280} />
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

  if (data.length === 0) {
    return <EmptyState title="Brak aktywnych konsultacji" />
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {data.slice(0, 6).map((project) => (
        <Card key={project.id} padding="lg" withBorder className={classes.card}>
          <Stack justify="space-between" h="100%">
            <div>
              <Group justify="space-between" mb="xs">
                <StatusBadge status={project.status} size="lg" />
                <Badge variant="outline">{project.category}</Badge>
              </Group>

              <Text fw={600} size="md" mb="xs" lineClamp={2}>
                {project.title}
              </Text>

              <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                {project.description}
              </Text>

              <Stack gap="xs" mb="md">
                <Group gap="xs">
                  <IconBuilding size={14} />
                  <Text size="xs">{project.institution}</Text>
                </Group>
                <Group gap="xs">
                  <IconCalendar size={14} />
                  <Text size="xs">
                    Do: {new Date(project.deadline).toLocaleDateString('pl-PL')}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconUsers size={14} />
                  <Text size="xs">{project.participantsCount} uczestników</Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={14} />
                  <Text size="xs">{project.meetingsCount} spotkań</Text>
                </Group>
              </Stack>

              {project.status === 'active' && (
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="xs" fw={500}>
                      Postęp konsultacji
                    </Text>
                    <Text size="xs" c="dimmed">
                      65%
                    </Text>
                  </Group>
                  <Progress value={65} color="green" size="sm" mb="md" />
                </div>
              )}
            </div>

            <Button
              variant="default"
              fullWidth
              leftSection={<IconEye size={16} />}
              component={Link}
              href={`/konsultacje#${project.id}`}
            >
              Zobacz szczegóły
            </Button>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}

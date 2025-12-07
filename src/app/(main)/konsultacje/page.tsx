'use client'

import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Stack,
  Button,
  Select,
  TextInput,
  Grid,
  Modal,
  Tabs,
  Paper,
  ActionIcon,
  Tooltip,
  Progress,
  Timeline,
  Anchor,
  Divider,
  SimpleGrid,
} from '@mantine/core'
import {
  IconSearch,
  IconCalendar,
  IconBuilding,
  IconFileText,
  IconUsers,
  IconFilter,
  IconEye,
  IconDownload,
  IconClock,
  IconMapPin,
  IconVideo,
  IconMail,
  IconPhone,
  IconCheck,
  IconX,
  IconFileDescription,
} from '@tabler/icons-react'
import { consultationProjects } from '../../../mocks/prekonsultacjeMock'
import { AISummary } from '../../../components/ai/AISummary/AISummary'
import { AISummaryGroq } from '@/components/ai/AISummaryGroq'

interface ConsultationProject {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'closed' | 'planned'
  deadline: string
  createdAt: string
  institution: string
  participantsCount: number
  documentsCount: number
  meetingsCount: number
}

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: 'online' | 'offline' | 'hybrid'
  maxParticipants?: number
  registeredParticipants: number
  description: string
}

export default function KonsultacjePage() {
  const [projects] = useState<ConsultationProject[]>(consultationProjects as ConsultationProject[])
  const [selectedProject, setSelectedProject] = useState<ConsultationProject | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const [meetings] = useState<Meeting[]>([
    {
      id: 'm1',
      title: 'Spotkanie ws. reformy opieki zdrowotnej - sesja 1',
      date: '2025-01-15',
      time: '10:00-12:00',
      location: 'Ministerstwo Zdrowia, sala konferencyjna A',
      type: 'hybrid',
      maxParticipants: 50,
      registeredParticipants: 32,
      description:
        'Pierwsze spotkanie konsultacyjne dotyczące planowanej reformy systemu opieki zdrowotnej.',
    },
    {
      id: 'm2',
      title: 'Konsultacje online - reforma edukacji',
      date: '2025-01-20',
      time: '14:00-16:00',
      location: 'Platforma Teams',
      type: 'online',
      maxParticipants: 100,
      registeredParticipants: 78,
      description:
        'Webinar konsultacyjny dotyczący zmian w systemie edukacji podstawowej i średniej.',
    },
    {
      id: 'm3',
      title: 'Panel ekspertów - polityka mieszkaniowa',
      date: '2024-11-25',
      time: '09:00-17:00',
      location: 'Hotel Marriott, Warszawa',
      type: 'offline',
      registeredParticipants: 120,
      description: 'Całodniowy panel ekspertów i interesariuszy ws. nowej polityki mieszkaniowej.',
    },
  ])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'planned':
        return 'blue'
      case 'closed':
        return 'gray'
      default:
        return 'blue'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Trwające'
      case 'planned':
        return 'Planowane'
      case 'closed':
        return 'Zakończone'
      default:
        return status
    }
  }

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'online':
        return <IconVideo size={16} />
      case 'offline':
        return <IconMapPin size={16} />
      case 'hybrid':
        return <IconUsers size={16} />
      default:
        return <IconCalendar size={16} />
    }
  }

  const getMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'online':
        return 'blue'
      case 'offline':
        return 'green'
      case 'hybrid':
        return 'violet'
      default:
        return 'gray'
    }
  }

  const categories = [...new Set(projects.map((p) => p.category))]

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Konsultacje społeczne
          </Title>
          <Text size="lg" c="dimmed">
            Weź udział w szerokich konsultacjach społecznych dotyczących ważnych reform i zmian
            legislacyjnych. Twój głos ma znaczenie w kształtowaniu przyszłości.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
          <Paper p="md" shadow="sm" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Aktywne konsultacje
                </Text>
                <Text fw={700} size="xl">
                  {projects.filter((p) => p.status === 'active').length}
                </Text>
              </div>
              <IconFileText size={32} color="var(--mantine-color-blue-6)" />
            </Group>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Uczestnicy łącznie
                </Text>
                <Text fw={700} size="xl">
                  {projects.reduce((sum, p) => sum + p.participantsCount, 0)}
                </Text>
              </div>
              <IconUsers size={32} color="var(--mantine-color-green-6)" />
            </Group>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Nadchodzące spotkania
                </Text>
                <Text fw={700} size="xl">
                  {meetings.filter((m) => new Date(m.date) > new Date()).length}
                </Text>
              </div>
              <IconCalendar size={32} color="var(--mantine-color-violet-6)" />
            </Group>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                  Dokumenty
                </Text>
                <Text fw={700} size="xl">
                  {projects.reduce((sum, p) => sum + p.documentsCount, 0)}
                </Text>
              </div>
              <IconDownload size={32} color="var(--mantine-color-orange-6)" />
            </Group>
          </Paper>
        </SimpleGrid>

        <Paper p="md" shadow="sm" radius="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                placeholder="Szukaj konsultacji..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                placeholder="Status"
                leftSection={<IconFilter size={16} />}
                data={[
                  { value: 'all', label: 'Wszystkie' },
                  { value: 'active', label: 'Trwające' },
                  { value: 'planned', label: 'Planowane' },
                  { value: 'closed', label: 'Zakończone' },
                ]}
                value={filterStatus}
                onChange={(value) => setFilterStatus(value || 'all')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                placeholder="Kategoria"
                leftSection={<IconFilter size={16} />}
                data={[
                  { value: 'all', label: 'Wszystkie kategorie' },
                  ...categories.map((cat) => ({ value: cat, label: cat })),
                ]}
                value={filterCategory}
                onChange={(value) => setFilterCategory(value || 'all')}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Grid>
          {filteredProjects.map((project) => (
            <Grid.Col key={project.id} span={{ base: 12, lg: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                <Stack justify="space-between" h="100%">
                  <div>
                    <Group justify="space-between" mb="xs">
                      <Badge color={getStatusColor(project.status)} variant="light" size="lg">
                        {getStatusLabel(project.status)}
                      </Badge>
                      <Badge variant="outline">{project.category}</Badge>
                    </Group>

                    <Text fw={600} size="lg" mb="xs">
                      {project.title}
                    </Text>

                    <Text size="sm" c="dimmed" mb="md">
                      {project.description}
                    </Text>

                    <Stack gap="xs" mb="md">
                      <Group gap="xs">
                        <IconBuilding size={16} />
                        <Text size="sm">{project.institution}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconCalendar size={16} />
                        <Text size="sm">
                          Do: {new Date(project.deadline).toLocaleDateString('pl-PL')}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconUsers size={16} />
                        <Text size="sm">{project.participantsCount} uczestników</Text>
                      </Group>
                      <Group gap="xs">
                        <IconClock size={16} />
                        <Text size="sm">{project.meetingsCount} spotkań</Text>
                      </Group>
                      <Group gap="xs">
                        <IconFileText size={16} />
                        <Text size="sm">{project.documentsCount} dokumentów</Text>
                      </Group>
                    </Stack>

                    {/* Progress bar dla trwających konsultacji */}
                    {project.status === 'active' && (
                      <div>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm" fw={500}>
                            Postęp konsultacji
                          </Text>
                          <Text size="sm" c="dimmed">
                            65%
                          </Text>
                        </Group>
                        <Progress value={65} color="green" size="sm" mb="md" />
                      </div>
                    )}
                  </div>

                  <Button
                    variant="light"
                    fullWidth
                    leftSection={<IconEye size={16} />}
                    onClick={() => setSelectedProject(project)}
                  >
                    Zobacz szczegóły
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Nadchodzące spotkania */}
        <div>
          <Title order={2} mb="md">
            Nadchodzące spotkania
          </Title>
          <Grid>
            {meetings
              .filter((meeting) => new Date(meeting.date) >= new Date())
              .map((meeting) => (
                <Grid.Col key={meeting.id} span={{ base: 12, md: 6, lg: 4 }}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mb="xs">
                      <Badge
                        color={getMeetingTypeColor(meeting.type)}
                        variant="light"
                        leftSection={getMeetingTypeIcon(meeting.type)}
                      >
                        {meeting.type === 'online'
                          ? 'Online'
                          : meeting.type === 'offline'
                          ? 'Stacjonarnie'
                          : 'Hybrydowo'}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        {new Date(meeting.date).toLocaleDateString('pl-PL')}
                      </Text>
                    </Group>

                    <Text fw={600} mb="xs" lineClamp={2}>
                      {meeting.title}
                    </Text>

                    <Stack gap="xs" mb="md">
                      <Group gap="xs">
                        <IconClock size={16} />
                        <Text size="sm">{meeting.time}</Text>
                      </Group>
                      <Group gap="xs">
                        <IconMapPin size={16} />
                        <Text size="sm" lineClamp={1}>
                          {meeting.location}
                        </Text>
                      </Group>
                      {meeting.maxParticipants && (
                        <Group gap="xs">
                          <IconUsers size={16} />
                          <Text size="sm">
                            {meeting.registeredParticipants}/{meeting.maxParticipants} miejsc
                          </Text>
                          <Progress
                            value={(meeting.registeredParticipants / meeting.maxParticipants) * 100}
                            size="xs"
                            style={{ flex: 1 }}
                          />
                        </Group>
                      )}
                    </Stack>

                    <Button variant="outline" fullWidth size="sm">
                      Zapisz się
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
          </Grid>
        </div>

        {filteredProjects.length === 0 && (
          <Paper p="xl" ta="center">
            <Text c="dimmed" size="lg">
              Nie znaleziono konsultacji spełniających kryteria wyszukiwania.
            </Text>
          </Paper>
        )}
      </Stack>

      {/* Modal szczegółów projektu */}
      <Modal
        opened={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="xl"
      >
        {selectedProject && (
          <Tabs defaultValue="details">
            <Tabs.List>
              <Tabs.Tab value="details" leftSection={<IconFileText size={16} />}>
                Szczegóły
              </Tabs.Tab>
              <Tabs.Tab value="timeline" leftSection={<IconClock size={16} />}>
                Harmonogram
              </Tabs.Tab>
              <Tabs.Tab value="participants" leftSection={<IconUsers size={16} />}>
                Uczestnicy
              </Tabs.Tab>
              <Tabs.Tab value="documents" leftSection={<IconDownload size={16} />}>
                Dokumenty
              </Tabs.Tab>
              <Tabs.Tab value="document-summary" leftSection={<IconFileDescription size={16} />}>
                Streszczenie dokumentu AI
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details" pt="md">
              <Stack gap="md">
                <Group>
                  <Badge color={getStatusColor(selectedProject.status)} variant="light">
                    {getStatusLabel(selectedProject.status)}
                  </Badge>
                  <Badge variant="outline">{selectedProject.category}</Badge>
                </Group>

                <Text>{selectedProject.description}</Text>

                <Grid>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>
                      Instytucja:
                    </Text>
                    <Text size="sm">{selectedProject.institution}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>
                      Termin zakończenia:
                    </Text>
                    <Text size="sm">
                      {new Date(selectedProject.deadline).toLocaleDateString('pl-PL')}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>
                      Liczba uczestników:
                    </Text>
                    <Text size="sm">{selectedProject.participantsCount}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={600}>
                      Liczba spotkań:
                    </Text>
                    <Text size="sm">{selectedProject.meetingsCount}</Text>
                  </Grid.Col>
                </Grid>

                <Divider />

                <div>
                  <Text fw={600} mb="md">
                    Kontakt
                  </Text>
                  <Stack gap="xs">
                    <Group gap="xs">
                      <IconMail size={16} />
                      <Anchor size="sm">
                        konsultacje@{selectedProject.institution.toLowerCase().replace(/\s+/g, '')}
                        .gov.pl
                      </Anchor>
                    </Group>
                    <Group gap="xs">
                      <IconPhone size={16} />
                      <Text size="sm">+48 22 123 45 67</Text>
                    </Group>
                  </Stack>
                </div>

                <Button fullWidth>Weź udział w konsultacjach</Button>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="timeline" pt="md">
              <Timeline active={2} bulletSize={24} lineWidth={2}>
                <Timeline.Item bullet={<IconCheck size={12} />} title="Rozpoczęcie konsultacji">
                  <Text c="dimmed" size="sm">
                    {new Date(selectedProject.createdAt).toLocaleDateString('pl-PL')}
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<IconUsers size={12} />}
                  title="Spotkania z interesariuszami"
                >
                  <Text c="dimmed" size="sm">
                    Seria {selectedProject.meetingsCount} spotkań konsultacyjnych
                  </Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconFileText size={12} />} title="Analiza otrzymanych uwag">
                  <Text c="dimmed" size="sm">
                    Obecnie w trakcie
                  </Text>
                </Timeline.Item>

                <Timeline.Item bullet={<IconX size={12} />} title="Zakończenie konsultacji">
                  <Text c="dimmed" size="sm">
                    {new Date(selectedProject.deadline).toLocaleDateString('pl-PL')}
                  </Text>
                </Timeline.Item>
              </Timeline>
            </Tabs.Panel>

            <Tabs.Panel value="participants" pt="md">
              <Stack gap="md">
                <Group justify="space-between">
                  <Text fw={600}>Statystyki uczestników</Text>
                  <Text c="dimmed" size="sm">
                    Łącznie: {selectedProject.participantsCount}
                  </Text>
                </Group>

                <SimpleGrid cols={2} spacing="md">
                  <Paper p="md" withBorder>
                    <Text size="sm" c="dimmed">
                      Organizacje pozarządowe
                    </Text>
                    <Text fw={600} size="lg">
                      23%
                    </Text>
                  </Paper>
                  <Paper p="md" withBorder>
                    <Text size="sm" c="dimmed">
                      Obywatele
                    </Text>
                    <Text fw={600} size="lg">
                      45%
                    </Text>
                  </Paper>
                  <Paper p="md" withBorder>
                    <Text size="sm" c="dimmed">
                      Przedsiębiorcy
                    </Text>
                    <Text fw={600} size="lg">
                      19%
                    </Text>
                  </Paper>
                  <Paper p="md" withBorder>
                    <Text size="sm" c="dimmed">
                      Eksperci
                    </Text>
                    <Text fw={600} size="lg">
                      13%
                    </Text>
                  </Paper>
                </SimpleGrid>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="documents" pt="md">
              <Stack gap="md">
                <Text fw={600}>Dokumenty do pobrania ({selectedProject.documentsCount})</Text>

                {Array.from({ length: selectedProject.documentsCount }, (_, i) => (
                  <Paper key={i} p="md" withBorder>
                    <Group justify="space-between">
                      <div>
                        <Text fw={500}>Dokument {i + 1}</Text>
                        <Text size="sm" c="dimmed">
                          {i === 0
                            ? 'Główny projekt dokumentu'
                            : i === 1
                            ? 'Uzasadnienie'
                            : i === 2
                            ? 'Ocena skutków regulacji'
                            : `Załącznik ${i - 2}`}
                        </Text>
                      </div>
                      <ActionIcon variant="light">
                        <IconDownload size={16} />
                      </ActionIcon>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="document-summary" pt="md">
              <AISummaryGroq
                type="konsultacja"
                title={selectedProject.title}
                description={selectedProject.description}
                content={`Projekt konsultacji: ${selectedProject.title}. ${
                  selectedProject.description
                }. Instytucja: ${selectedProject.institution}. Termin: ${new Date(
                  selectedProject.deadline,
                ).toLocaleDateString('pl-PL')}.`}
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </Modal>
    </Container>
  )
}

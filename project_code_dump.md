# src\app\(auth)\layout.tsx:

```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

# src\app\(auth)\login\page.tsx:

```tsx
'use client'

import {
  Container,
  Paper,
  ThemeIcon,
  Group,
  Box,
  Text,
  Badge,
  Stack,
  Title,
  SimpleGrid,
  BackgroundImage,
  Button,
  Overlay,
  Anchor,
} from '@mantine/core'
import Link from 'next/link'
import {
  IconBuildingBank,
  IconDeviceMobile,
  IconFingerprint,
  IconShieldCheck,
  IconStarsFilled,
} from '@tabler/icons-react'

type Provider = {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  badge?: string
  onClick: () => void
}

const providers: Provider[] = [
  {
    id: 'mobywatel',
    title: 'Aplikacja mObywatel',
    subtitle: 'Zaloguj się za pomocą aplikacji mObywatel',
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconDeviceMobile />
      </ThemeIcon>
    ),
    badge: 'Polecane',
    onClick: () => console.log('logowanie z mObywatel'),
  },
  {
    id: 'pz',
    title: 'Profil Zaufany',
    subtitle: 'Zaloguj się przy użyciu Profilu Zaufanego',
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconShieldCheck />
      </ThemeIcon>
    ),
    onClick: () => console.log('logowanie z Profil Zaufany'),
  },
  {
    id: 'be',
    title: 'Bankowość elektroniczna',
    subtitle: 'Zaloguj się za pomocą swojego banku',
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconBuildingBank />
      </ThemeIcon>
    ),
    badge: 'Polecane',
    onClick: () => console.log('logowanie z Bankowość elektroniczna'),
  },
  {
    id: 'edowod',
    title: 'E-dowód',
    subtitle: 'Użyj dowodu osobistego lub czytnika NFC',
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconFingerprint />
      </ThemeIcon>
    ),
    badge: 'Polecane',
    onClick: () => console.log('logowanie z E-dowód'),
  },
  {
    id: 'eid',
    title: 'Use eID',
    subtitle: 'Use your National eID to access online services',
    icon: (
      <ThemeIcon variant="light" size="xl">
        <IconStarsFilled />
      </ThemeIcon>
    ),
    badge: 'Polecane',
    onClick: () => console.log('logowanie z eID'),
  },
]

function LoginButton({ provider }: { provider: Provider }) {
  return (
    <Paper
      withBorder
      p="sm"
      component="button"
      onClick={provider.onClick}
      style={{ cursor: 'pointer', width: '100%', textAlign: 'left' }}
    >
      <Group align="flex-start">
        {provider.icon}

        <Box>
          <Group>
            <Text>{provider.title}</Text>
            {provider.badge && <Badge tt="none">{provider.badge}</Badge>}
          </Group>

          <Text size="sm" c="dimmed">
            {provider.subtitle}
          </Text>
        </Box>
      </Group>
    </Paper>
  )
}

export default function LoginPage() {
  return (
    <Container
      fluid
      h="100vh"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInline: 'min(6vw, 48px)',
      }}
    >
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} w="100%" spacing="xl">
        <Box>
          <Title order={1} size="lg" mb={'md'}>
            Logowanie do{' '}
            <Anchor component={Link} href="/" c="blue" td="underline">
              IPAL
            </Anchor>
          </Title>
          <Stack gap={'xs'}>
            {providers.map((p) => (
              <LoginButton key={p.id} provider={p} />
            ))}
          </Stack>
        </Box>
        <BackgroundImage
          src="https://emerging-europe.com/wp-content/uploads/2023/03/bigstock-administrative-center-in-warsa-468491209-990x556.jpg"
          h="100%"
          style={{ position: 'relative', minHeight: 360, overflow: 'hidden' }}
        >
          <Overlay
            gradient="linear-gradient(120deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.6) 100%)"
            zIndex={1}
          />
          <Container
            ta="center"
            h="100%"
            py="xl"
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'md',
            }}
          >
            <Title order={2} size="xl" c="white">
              Bądź na bieżąco z najnowszymi ustawami
            </Title>
            <Text c="white" size="md">
              Otrzymuj podsumowania AI, alerty o zmianach i jasne streszczenia, aby szybko
              zrozumieć, co naprawdę się zmienia.
            </Text>
            <Group justify="center">
              <Button variant="white" color="dark" size="md">
                Dowiedz się więcej
              </Button>
            </Group>
          </Container>
        </BackgroundImage>
      </SimpleGrid>
    </Container>
  )
}
```

# src\app\(main)\konsultacje\page.tsx:

```tsx
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
```

# src\app\(main)\layout.tsx:

```tsx
import AppShellLayout from '@/components/Layout/AppShell'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AppShellLayout>{children}</AppShellLayout>
}
```

# src\app\(main)\page.tsx:

```tsx
import HomeCards from '@/components/HomeCards/HomeCards'

export default function HomePage() {
  return <HomeCards />
}
```

# src\app\(main)\prekonsultacje\page.tsx:

```tsx
'use client'

import { useState, useMemo } from 'react'
import { Container, Title, Text, Stack, Modal, Tabs } from '@mantine/core'
import {
  IconFileText,
  IconMessage,
  IconStar,
  IconBrain,
  IconFileDescription,
} from '@tabler/icons-react'
import { ProjectFilters, ProjectGrid } from '@/components/projects'
import { Comments } from '@/components/comments'
import { ProjectRating } from '@/components/ProjectRating/ProjectRating'
import { AICommentsAnalysis } from '@/components/ai//AIAnalysis/AICommentsAnalysis'
import { preConsultationProjects } from '@/mocks/prekonsultacjeMock'
import { PreConsultationProject } from '@/types'
import { useProjectComments } from '@/features/consultations/hooks/useProjectComments'
import { AISummaryGroq } from '@/components/ai/AISummaryGroq'

export default function PrekonsultacjePage() {
  const { projects, addComment, rateProject } = useProjectComments(preConsultationProjects)
  const [selectedProject, setSelectedProject] = useState<PreConsultationProject | null>(null)

  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  // Get unique categories
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus
      const matchesCategory = filterCategory === 'all' || project.category === filterCategory

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [projects, searchQuery, filterStatus, filterCategory])

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Prekonsultacje projektów legislacyjnych
          </Title>
          <Text size="lg" c="dimmed">
            Uczestniczenie w prekonsultacjach projektów ustaw i rozporządzeń. Podziel się swoją
            opinią i oceń projekty przed ich oficjalnym wdrożeniem.
          </Text>
        </div>

        <ProjectFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={filterStatus}
          onStatusChange={setFilterStatus}
          categoryFilter={filterCategory}
          onCategoryChange={setFilterCategory}
          categories={categories}
        />

        <ProjectGrid
          projects={filteredProjects}
          onProjectClick={setSelectedProject}
          emptyMessage="Nie znaleziono projektów spełniających kryteria wyszukiwania."
        />
      </Stack>

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
              <Tabs.Tab value="comments" leftSection={<IconMessage size={16} />}>
                Komentarze ({selectedProject.comments.length})
              </Tabs.Tab>
              <Tabs.Tab value="rating" leftSection={<IconStar size={16} />}>
                Oceny
              </Tabs.Tab>
              <Tabs.Tab value="ai-analysis" leftSection={<IconBrain size={16} />}>
                Analiza AI
              </Tabs.Tab>
              <Tabs.Tab value="document-summary" leftSection={<IconFileDescription size={16} />}>
                Streszczenie dokumentu AI
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="document-summary" pt="md">
              {selectedProject && (
                <AISummaryGroq
                  type="prekonsultacja"
                  title={selectedProject.title}
                  description={selectedProject.description}
                  comments={selectedProject.comments.map((c) => c.content)}
                />
              )}
            </Tabs.Panel>

            <Tabs.Panel value="comments" pt="md">
              <Comments
                comments={selectedProject.comments}
                onAddComment={(content, rating) => addComment(selectedProject.id, content, rating)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="rating" pt="md">
              <ProjectRating
                averageRating={selectedProject.averageRating}
                ratingsCount={selectedProject.ratingsCount}
                onRate={(rating, review) => rateProject(selectedProject.id, rating, review)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="ai-analysis" pt="md">
              <AICommentsAnalysis
                comments={selectedProject.comments}
                projectId={selectedProject.id}
                projectTitle={selectedProject.title}
              />
            </Tabs.Panel>

            <Tabs.Panel value="document-summary" pt="md">
              <AISummaryGroq
                type="prekonsultacja"
                title={selectedProject.title}
                description={selectedProject.description}
                content=""
                comments={selectedProject.comments.map((c) => c.content)}
              />{' '}
              // Analizuje komentarze!
            </Tabs.Panel>
          </Tabs>
        )}
      </Modal>
    </Container>
  )
}
```

# src\app\(main)\ustawy\page.tsx:

```tsx
'use client'

import React, { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import {
  Container,
  Title,
  Table,
  Pagination,
  Loader,
  Center,
  Badge,
  Text,
  Stack,
  Select,
  Group,
  Alert,
  LoadingOverlay,
  Box,
  Button,
} from '@mantine/core'
import { IconAlertCircle, IconArrowRight } from '@tabler/icons-react'
import { ApiResponse, fakeFetchUstawy } from '@/mocks/sejmMock'

function UstawyTableContent({
  publisher,
  year,
  page,
  limit,
  onPageChange,
  isPendingTransition,
}: {
  publisher: string
  year: string
  page: number
  limit: number
  onPageChange: (page: number) => void
  isPendingTransition: boolean
}) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    setError(null)

    fakeFetchUstawy(publisher, year, page, limit)
      .then((res) => {
        if (mounted) {
          setData(res)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (mounted) {
          console.error(err)
          setError('Wystąpił błąd podczas pobierania danych.')
          setIsLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [publisher, year, page, limit])

  if (isLoading && !data) {
    return (
      <Center py={60}>
        <Stack align="center">
          <Loader size="lg" />
          <Text size="xs" c="dimmed">
            Pobieranie danych (Mock API)...
          </Text>
        </Stack>
      </Center>
    )
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Błąd" color="red">
        {error}
      </Alert>
    )
  }

  const { items: ustawy = [], totalCount = 0 } = data || {}
  const totalPages = Math.ceil(totalCount / limit)

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || ''
    if (statusLower.includes('obowiązuj')) return 'green'
    if (statusLower.includes('uchylon')) return 'red'
    return 'blue'
  }

  const rows = ustawy.map((ustawa) => (
    <Table.Tr key={ustawa.ELI}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {ustawa.displayAddress}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" style={{ whiteSpace: 'normal' }}>
          {ustawa.title}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(ustawa.status)} variant="light">
          {ustawa.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" style={{ whiteSpace: 'nowrap' }}>
          {ustawa.announcementDate}
        </Text>
      </Table.Td>
      <Table.Td>
        {/* WAŻNE: Encode URI component dla ID zawierającego slashe */}
        <Button
          component={Link}
          href={`/ustawy/${encodeURIComponent(ustawa.ELI)}`}
          variant="light"
          size="xs"
          rightSection={<IconArrowRight size={14} />}
        >
          Szczegóły
        </Button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isPendingTransition || isLoading}
        zIndex={100}
        overlayProps={{ blur: 1 }}
      />

      <Text size="sm" c="dimmed" mb="sm">
        Znaleziono {totalCount} aktów prawnych • Strona {page} z {totalPages}
      </Text>

      <Table.ScrollContainer minWidth={800}>
        <Table striped highlightOnHover withTableBorder withRowBorders verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Pozycja</Table.Th>
              <Table.Th w={400}>Tytuł</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Data ogłoszenia</Table.Th>
              <Table.Th>Akcja</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Center py="xl">
                    <Text c="dimmed">Brak danych</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {totalPages > 1 && (
        <Center mt="md">
          <Pagination
            value={page}
            onChange={onPageChange}
            total={totalPages}
            siblings={1}
            disabled={isPendingTransition || isLoading}
          />
        </Center>
      )}
    </Box>
  )
}

export default function SejmUstawyPage() {
  const [publisher, setPublisher] = useState('DU')
  const [year, setYear] = useState('2025')
  const [page, setPage] = useState(1)
  const limit = 20

  const [isPending, startTransition] = useTransition()

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString())

  const handlePageChange = (val: number) => {
    startTransition(() => setPage(val))
  }

  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    startTransition(() => {
      setter(val)
      setPage(1)
    })
  }

  return (
    <Container fluid py="xl">
      <Stack gap="lg">
        <Title order={1}>Ustawy RP (Mock Data)</Title>
        <Group>
          <Select
            label="Dziennik"
            value={publisher}
            onChange={(val) => handleFilterChange(setPublisher, val || 'DU')}
            data={[
              { value: 'DU', label: 'Dziennik Ustaw (Dz.U.)' },
              { value: 'MP', label: 'Monitor Polski (M.P.)' },
            ]}
            w={250}
          />
          <Select
            label="Rok"
            value={year}
            onChange={(val) => handleFilterChange(setYear, val || '2025')}
            data={years}
            w={150}
          />
        </Group>

        <UstawyTableContent
          publisher={publisher}
          year={year}
          page={page}
          limit={limit}
          onPageChange={handlePageChange}
          isPendingTransition={isPending}
        />
      </Stack>
    </Container>
  )
}
```

# src\app\(main)\ustawy\[id]\ActDetailsView.tsx:

```tsx
'use client'

import Link from 'next/link'
import {
  Container,
  Title,
  Text,
  Timeline,
  Badge,
  Group,
  Button,
  Tabs,
  Stack,
  Card,
  SimpleGrid,
  ThemeIcon,
  Tooltip,
} from '@mantine/core'
import {
  IconCheck,
  IconArrowLeft,
  IconFileText,
  IconBrain,
  IconDownload,
  IconExternalLink,
  IconCalendar,
} from '@tabler/icons-react'
import { ActDetails } from '@/mocks/sejmMock'
import { AISummary } from '../../../../components/ai/AISummary/AISummary'
import { AISummaryGroq } from '@/components/ai/AISummaryGroq'

interface ActDetailsViewProps {
  act: ActDetails
}

export default function ActDetailsView({ act }: ActDetailsViewProps) {
  // Ustalanie aktywnego kroku na podstawie wypełnionych dat
  const activeIndex = act.stages.filter((s: { isCompleted: boolean }) => s.isCompleted).length - 1

  // Linki do plików (konstrukcja na podstawie dokumentacji API)
  const pdfUrl = act.textPDF
    ? `https://api.sejm.gov.pl/eli/acts/${act.publisher}/${act.year}/${act.pos}/text.pdf`
    : null

  const htmlUrl = act.textHTML
    ? `https://api.sejm.gov.pl/eli/acts/${act.publisher}/${act.year}/${act.pos}/text.html`
    : null

  return (
    <Container size="md" py="xl">
      <Button
        component={Link}
        href="/ustawy"
        variant="subtle"
        size="sm"
        mb="md"
        leftSection={<IconArrowLeft size={16} />}
      >
        Powrót do listy
      </Button>

      <Group justify="space-between" mb="xs" align="start">
        <Badge size="lg" color={act.status === 'obowiązujący' ? 'green' : 'blue'} tt="uppercase">
          {act.status}
        </Badge>
        <Text c="dimmed" size="sm" fw={700}>
          {act.displayAddress}
        </Text>
      </Group>

      <Title order={2} mb="md" lh={1.3}>
        {act.title}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
        <Card withBorder padding="sm">
          <Group gap="xs">
            <ThemeIcon variant="light" color="gray">
              <IconCalendar size={18} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Data ogłoszenia
              </Text>
              <Text fw={500}>{act.promulgation || 'Brak danych'}</Text>
            </div>
          </Group>
        </Card>
        <Card withBorder padding="sm">
          <Group gap="xs">
            <ThemeIcon variant="light" color="blue">
              <IconFileText size={18} />
            </ThemeIcon>
            <div>
              <Text size="xs" c="dimmed">
                Typ aktu
              </Text>
              <Text fw={500}>{act.type}</Text>
            </div>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Sekcja pobierania tekstów źródłowych */}
      {(pdfUrl || htmlUrl) && (
        <Group mt="md">
          {pdfUrl && (
            <Button
              component="a"
              href={pdfUrl}
              target="_blank"
              variant="outline"
              color="red"
              leftSection={<IconDownload size={16} />}
            >
              Pobierz akt (PDF)
            </Button>
          )}
          {htmlUrl && (
            <Button
              component="a"
              href={htmlUrl}
              target="_blank"
              variant="outline"
              leftSection={<IconExternalLink size={16} />}
            >
              Tekst aktu (HTML)
            </Button>
          )}
        </Group>
      )}

      {/* Słowa kluczowe */}
      {act.keywords && act.keywords.length > 0 && (
        <Group gap="xs" mt="lg">
          {act.keywords.map((keyword: string, index: number) => (
            <Badge key={index} variant="dot" color="gray" tt="none">
              {keyword}
            </Badge>
          ))}
        </Group>
      )}

      <Tabs defaultValue="timeline" mt="xl">
        <Tabs.List>
          <Tabs.Tab value="timeline" leftSection={<IconFileText size={16} />}>
            Status prawny
          </Tabs.Tab>
          <Tabs.Tab value="ai-summary" leftSection={<IconBrain size={16} />}>
            Streszczenie AI
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="timeline" pt="md">
          <Stack gap="md">
            <Title order={4}>Cykl życia aktu prawnego</Title>

            <Timeline active={activeIndex} bulletSize={32} lineWidth={2}>
              {act.stages.map(
                (stage: {
                  stepNumber: number
                  name: string
                  date: string | null
                  isCompleted: boolean
                }) => (
                  <Timeline.Item
                    key={stage.stepNumber}
                    bullet={
                      stage.isCompleted ? (
                        <IconCheck size={18} />
                      ) : (
                        <Text size="xs" fw={700}>
                          {stage.stepNumber}
                        </Text>
                      )
                    }
                    title={
                      <Text fw={600} size="sm" c={stage.isCompleted ? 'dark' : 'dimmed'}>
                        {stage.name}
                      </Text>
                    }
                  >
                    {stage.date ? (
                      <Text size="sm" c="dimmed" mt={4}>
                        {stage.date}
                      </Text>
                    ) : (
                      <Text size="xs" c="dimmed" mt={4}>
                        Oczekuje na realizację
                      </Text>
                    )}
                  </Timeline.Item>
                ),
              )}
            </Timeline>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="ai-summary" pt="md">
          <AISummaryGroq
            type="ustawa"
            title={act.title}
            description={`Akt prawny ${act.displayAddress}`}
            content={
              act.fullText || act.title + ' – treść aktu prawnego zostanie wkrótce załadowana.'
            }
          />
          // act.fullText – dodaj pobieranie tekstu z PDF (patrz niżej)
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}
```

# src\app\(main)\ustawy\[id]\ActNotFound.tsx:

```tsx
'use client'

import Link from 'next/link'
import { Container, Title, Text, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

interface ActNotFoundProps {
  id: string
}

export default function ActNotFound({ id }: ActNotFoundProps) {
  // Dekodowanie ID dla czytelności (np. DU%2F2025%2F1 -> DU/2025/1)
  const decodedId = decodeURIComponent(id)

  return (
    <Container py="xl" ta="center">
      <Title order={3} c="red" mb="md">
        Nie znaleziono aktu prawnego
      </Title>
      <Text c="dimmed" mb="lg">
        Identyfikator: {decodedId}
      </Text>
      {/* Tutaj 'component={Link}' zadziała poprawnie, 
        ponieważ jesteśmy w komponencie "use client" 
      */}
      <Button
        component={Link}
        href="/ustawy"
        variant="default"
        leftSection={<IconArrowLeft size={16} />}
      >
        Wróć do listy ustaw
      </Button>
    </Container>
  )
}
```

# src\app\(main)\ustawy\[id]\page.tsx:

```tsx
import React from 'react'
import { fakeFetchActDetails } from '@/mocks/sejmMock'
import ActDetailsView from './ActDetailsView'
import ActNotFound from './ActNotFound' // Import nowego komponentu

interface PageProps {
  params: {
    id: string
  }
}

export default async function UstawaDetailsPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params)

  // Pobranie danych z API (server-side)
  const act = await fakeFetchActDetails(id)

  if (!act) {
    // Zamiast renderować UI Mantine bezpośrednio tutaj,
    // zwracamy komponent klientowy, który to obsłuży.
    return <ActNotFound id={id} />
  }

  // ActDetailsView jest już oznaczony jako "use client", więc jest bezpieczny
  return <ActDetailsView act={act} />
}
```

# src\app\api\auth\[...all]\route.ts:

```ts
import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'

export const { POST, GET } = toNextJsHandler(auth)
```

# src\app\api\proxy\eli\[...path]\route.ts:

```ts
// src/app/api/proxy/eli/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server'

const API_BASE = 'https://api.sejm.gov.pl/eli'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params
  const path = resolvedParams.path.join('/')
  const searchParams = request.nextUrl.searchParams.toString()

  const targetUrl = `${API_BASE}/${path}${searchParams ? `?${searchParams}` : ''}`

  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        // KLUCZOWE NAGŁÓWKI – bez nich Sejm zwraca 403
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        Referer: 'https://eli.gov.pl/',
        Origin: 'https://eli.gov.pl',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      },
      // ważne – Next.js domyślnie dodaje swoje nagłówki, które mogą być wykrywane
      // wyłączenie cache na poziomie fetch, bo i tak mamy revalidate
      next: { revalidate: 3600 },
    })

    // Kopiujemy wszystkie nagłówki odpowiedzi (w tym Content-Encoding dla gzip)
    const headers = new Headers(res.headers)
    // Usuwamy potencjalnie problematyczne nagłówki Next.js
    headers.delete('transfer-encoding')

    if (!res.ok) {
      console.error(`Sejm API Error: ${res.status} ${res.statusText} | URL: ${targetUrl}`)
      return NextResponse.json(
        { error: `Sejm API Error: ${res.status} ${res.statusText}` },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data, { headers })
  } catch (error) {
    console.error('Proxy fetch error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
```

# src\app\api\ustawy\route.ts:

```ts
import { NextResponse } from 'next/server'

const API_BASE = 'https://api.sejm.gov.pl/eli'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const url = `${API_BASE}/acts/search?${searchParams.toString()}`

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Next.js Server',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Sejm API error' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
```

# src\app\globals.css:

```css
:root[data-high-contrast='true'] {
  --mantine-color-scheme: dark !important;
  --mantine-color-body: #000000 !important;
  --mantine-color-text: #ffff00 !important;
}

:root[data-high-contrast='true'] body {
  background-color: #000000 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] {
  background-color: #000000 !important;

  --mantine-color-white: #000000 !important;
  --mantine-color-black: #ffff00 !important;

  --mantine-color-default: #000000 !important;
  --mantine-color-default-bg: #000000 !important;
  --mantine-color-default-color: #ffff00 !important;
  --mantine-color-default-border: #ffff00 !important;
  --mantine-color-default-hover: #000000 !important;

  --mantine-primary-color-filled: #ffff00 !important;
  --mantine-primary-color-filled-hover: #e6e600 !important;
  --mantine-primary-color-light: #333300 !important;
  --mantine-primary-color-light-hover: #4d4d00 !important;
  --mantine-primary-color-light-color: #ffff00 !important;

  --mantine-primary-color-text: #000000 !important;
  --mantine-primary-color-bg: #ffff00 !important;

  --mantine-primary-color-0: #ffffcc !important;
  --mantine-primary-color-1: #ffff99 !important;
  --mantine-primary-color-2: #ffff66 !important;
  --mantine-primary-color-3: #ffff33 !important;
  --mantine-primary-color-4: #ffff00 !important;
  --mantine-primary-color-5: #e6e600 !important;
  --mantine-primary-color-6: #cccc00 !important;
  --mantine-primary-color-7: #b3b300 !important;
  --mantine-primary-color-8: #999900 !important;
  --mantine-primary-color-9: #808000 !important;

  --input-bd: #ffff00 !important;
  --input-bg: #000000 !important;
  --input-color: #ffff00 !important;
  --input-placeholder-color: #aaff00 !important;
}

:root[data-high-contrast='true'] a {
  color: #ffff00 !important;
  text-decoration: underline;
}

:root[data-high-contrast='true'] .tabler-icon {
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-ActionIcon-root {
  background-color: #000000 !important;
  border-color: #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-ActionIcon-root[disabled],
:root[data-high-contrast='true'] .mantine-ActionIcon-root[data-disabled] {
  background-color: #000000 !important;
  border-color: #ffff00 !important;
  color: #ffff00 !important;
  opacity: 0.5 !important;
}

:root[data-high-contrast='true'] .mantine-Button-root[disabled],
:root[data-high-contrast='true'] .mantine-Button-root[data-disabled] {
  background-color: #000000 !important;
  border-color: #ffff00 !important;
  color: #ffff00 !important;
  opacity: 0.5 !important;
}

/* Modal components */
:root[data-high-contrast='true'] .mantine-Modal-overlay {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

:root[data-high-contrast='true'] .mantine-Modal-content {
  background-color: #000000 !important;
  border: 2px solid #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Modal-header {
  background-color: #000000 !important;
  border-bottom: 1px solid #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Modal-title {
  color: #ffff00 !important;
  font-weight: bold !important;
}

:root[data-high-contrast='true'] .mantine-Modal-close {
  background-color: #000000 !important;
  border: 1px solid #ffff00 !important;
  color: #ffff00 !important;
}

/* Tabs components */
:root[data-high-contrast='true'] .mantine-Tabs-root {
  background-color: #000000 !important;
}

:root[data-high-contrast='true'] .mantine-Tabs-list {
  background-color: #000000 !important;
  border-bottom: 2px solid #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Tabs-tab {
  background-color: #000000 !important;
  border: 1px solid #ffff00 !important;
  color: #ffff00 !important;
  border-bottom: none !important;
}

:root[data-high-contrast='true'] .mantine-Tabs-tab[data-active='true'] {
  background-color: #ffff00 !important;
  color: #000000 !important;
  font-weight: bold !important;
}

:root[data-high-contrast='true'] .mantine-Tabs-panel {
  background-color: #000000 !important;
  color: #ffff00 !important;
  border: 1px solid #ffff00 !important;
  border-top: none !important;
}

/* Paper components */
/* Normal mode Paper fixes */
.mantine-Paper-root {
  background-color: var(--mantine-color-body) !important;
}

/* High contrast mode */
:root[data-high-contrast='true'] .mantine-Paper-root {
  background-color: #000000 !important;
  border: 1px solid #ffff00 !important;
  color: #ffff00 !important;
}

/* Card components - remove duplicate since handled below */

/* High contrast mode */
:root[data-high-contrast='true'] .mantine-Card-root {
  background-color: #000000 !important;
  border: 2px solid #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Card-root:hover {
  background-color: #1a1a00 !important;
  transform: translateY(-2px) !important;
}

/* Badge components */
:root[data-high-contrast='true'] .mantine-Badge-root {
  background-color: #ffff00 !important;
  color: #000000 !important;
  border: 1px solid #ffff00 !important;
}

/* Input components */
:root[data-high-contrast='true'] .mantine-Input-input {
  background-color: #000000 !important;
  border: 2px solid #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Input-input::placeholder {
  color: #aaff00 !important;
}

:root[data-high-contrast='true'] .mantine-InputWrapper-label {
  color: #ffff00 !important;
  font-weight: bold !important;
}

/* Select components */
:root[data-high-contrast='true'] .mantine-Select-input {
  background-color: #000000 !important;
  border: 2px solid #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Select-dropdown {
  background-color: #000000 !important;
  border: 2px solid #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Select-option {
  background-color: #000000 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Select-option[data-hovered='true'],
:root[data-high-contrast='true'] .mantine-Select-option[data-selected='true'] {
  background-color: #ffff00 !important;
  color: #000000 !important;
}

/* Text and Typography */
:root[data-high-contrast='true'] .mantine-Text-root {
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Title-root {
  color: #ffff00 !important;
}

/* Progress components */
:root[data-high-contrast='true'] .mantine-Progress-root {
  background-color: #000000 !important;
  border: 1px solid #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Progress-section {
  background-color: #ffff00 !important;
}

/* Accordion components */
:root[data-high-contrast='true'] .mantine-Accordion-root {
  background-color: #000000 !important;
}

:root[data-high-contrast='true'] .mantine-Accordion-control {
  background-color: #000000 !important;
  border: 1px solid #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Accordion-content {
  background-color: #000000 !important;
  color: #ffff00 !important;
  border: 1px solid #ffff00 !important;
  border-top: none !important;
}

/* Timeline components */
:root[data-high-contrast='true'] .mantine-Timeline-root {
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Timeline-itemBullet {
  background-color: #ffff00 !important;
  border: 2px solid #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Timeline-itemTitle {
  color: #ffff00 !important;
  font-weight: bold !important;
}

/* Group and Stack */
:root[data-high-contrast='true'] .mantine-Group-root,
:root[data-high-contrast='true'] .mantine-Stack-root {
  color: #ffff00 !important;
}

/* Tooltip */
:root[data-high-contrast='true'] .mantine-Tooltip-tooltip {
  background-color: #ffff00 !important;
  color: #000000 !important;
  border: 1px solid #000000 !important;
}

/* AppShell */
:root[data-high-contrast='true'] .mantine-AppShell-root {
  background-color: #000000 !important;
}

:root[data-high-contrast='true'] .mantine-AppShell-header {
  background-color: #000000 !important;
  border-bottom: 2px solid #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-AppShell-main {
  background-color: #000000 !important;
}

/* Burger menu */
:root[data-high-contrast='true'] .mantine-Burger-root {
  color: #ffff00 !important;
}

/* Anchor links */
:root[data-high-contrast='true'] .mantine-Anchor-root {
  color: #ffff00 !important;
  text-decoration: underline !important;
}

:root[data-high-contrast='true'] .mantine-Anchor-root:hover {
  color: #ffffff !important;
}

/* Rating components */
:root[data-high-contrast='true'] .mantine-Rating-root {
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Rating-symbolBody {
  color: #ffff00 !important;
}

/* Divider */
:root[data-high-contrast='true'] .mantine-Divider-root {
  border-color: #ffff00 !important;
}

/* Grid */
:root[data-high-contrast='true'] .mantine-Grid-root,
:root[data-high-contrast='true'] .mantine-Grid-col {
  color: #ffff00 !important;
}

/* Container */
:root[data-high-contrast='true'] .mantine-Container-root {
  color: #ffff00 !important;
}

/* Focus indicators */
:root[data-high-contrast='true'] *:focus {
  outline: 3px solid #ffff00 !important;
  outline-offset: 2px !important;
}

body {
  background-color: var(--mantine-color-body) !important;
}

.mantine-Grid-col .mantine-Card-root {
  background-color: var(--mantine-color-body) !important;
}

.mantine-Grid-col:nth-child(even) .mantine-Card-root,
.mantine-Grid-col:nth-child(odd) .mantine-Card-root,
.mantine-Grid-col:nth-child(2n) .mantine-Card-root,
.mantine-Grid-col:nth-child(2n + 1) .mantine-Card-root {
  background-color: var(--mantine-color-body) !important;
}

.mantine-Card-root:hover {
  background-color: var(--mantine-primary-color-light) !important;
}

.mantine-Table-root {
  background-color: var(--mantine-color-body) !important;
}

.mantine-Table-tr:nth-of-type(even) {
  background-color: var(--mantine-color-gray-0) !important;
}

.mantine-Table-tr:nth-of-type(odd) {
  background-color: var(--mantine-color-body) !important;
}

.mantine-Table-tr:hover {
  background-color: var(--mantine-primary-color-light) !important;
}

.mantine-Card-root {
  background-color: var(--mantine-color-body) !important;
  transition: all 0.2s ease !important;
}

.mantine-Card-root:hover {
  background-color: var(--mantine-primary-color-light-hover) !important;
  transform: translateY(-2px) !important;
}

/* Normal mode Paper fixes */
.mantine-Paper-root {
  background-color: var(--mantine-color-body) !important;
}

:root[data-high-contrast='true'] body {
  background-color: #000000 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Card-root {
  background-color: #000000 !important;
  border: 2px solid #ffff00 !important;
  color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Card-root:hover {
  background-color: #1a1a00 !important;
  transform: translateY(-2px) !important;
}

:root[data-high-contrast='true'] .mantine-Table-root {
  background-color: #000000 !important;
  color: #ffff00 !important;
  border-color: #ffff00 !important;
}

:root[data-high-contrast='true'] .mantine-Table-thead {
  background-color: #000000 !important;
}

:root[data-high-contrast='true'] .mantine-Table-th {
  background-color: #000000 !important;
  color: #ffff00 !important;
  border-color: #ffff00 !important;
  font-weight: bold !important;
}

:root[data-high-contrast='true'] .mantine-Table-td {
  background-color: #000000 !important;
  color: #ffff00 !important;
  border-color: #ffff00 !important;
}

/* Fix striped table rows */
:root[data-high-contrast='true'] .mantine-Table-tr {
  background-color: #000000 !important;
}

:root[data-high-contrast='true'] .mantine-Table-tr:nth-of-type(odd) {
  background-color: #000000 !important;
}

:root[data-high-contrast='true'] .mantine-Table-tr:nth-of-type(even) {
  background-color: #000000 !important;
}

/* Fix table hover effects */
:root[data-high-contrast='true'] .mantine-Table-tr:hover {
  background-color: #1a1a00 !important;
}

:root[data-high-contrast='true'] .mantine-Table-tr:hover .mantine-Table-td {
  background-color: #1a1a00 !important;
}

/* ScrollContainer */
:root[data-high-contrast='true'] .mantine-Table-scrollContainer {
  background-color: #000000 !important;
}
```

# src\app\layout.tsx:

```tsx
import '@mantine/core/styles.css'
import './globals.css'

import { ColorSchemeScript, MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core'
import { AccessibilityProvider } from '../context/AccessibilityContext'

export const metadata = {
  title: 'IPAL - Interaktywny Portal Analiz Legislacyjnych',
  description:
    'Portal analiz legislacyjnych zgodny z WCAG 2.1. Śledź prawo, konsultacje i prekonsultacje w jednym miejscu.',
  icons: {
    icon: '/icon.svg',
  },
}

const theme = createTheme({
  primaryColor: 'dark',
  defaultRadius: 'xs',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AccessibilityProvider>{children}</AccessibilityProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
```

# src\components\AccessibilityPanel\AccessibilityPanel.tsx:

```tsx
'use client'

import {
  ActionIcon,
  Group,
  Tooltip,
  useMantineColorScheme,
  useComputedColorScheme,
  Button,
} from '@mantine/core'
import {
  IconEye,
  IconEyeOff,
  IconMinus,
  IconPlus,
  IconTypography,
  IconSun,
  IconMoon,
  IconLogin,
} from '@tabler/icons-react'
import { useAccessibility } from '../../context/AccessibilityContext'
import Link from 'next/link'
import cx from 'clsx'
import classes from './ThemeToggleIcons.module.css'

export default function AccessibilityPanel() {
  const { highContrast, toggleHighContrast, increaseFont, decreaseFont, fontSizePercent } =
    useAccessibility()

  const { setColorScheme } = useMantineColorScheme()

  const colorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  const themeTooltipLabel = highContrast
    ? 'Opcja niedostępna w trybie wysokiego kontrastu'
    : colorScheme === 'dark'
    ? 'Włącz jasny motyw'
    : 'Włącz ciemny motyw'

  return (
    <Group gap="xs">
      <Tooltip label={themeTooltipLabel}>
        <span style={{ cursor: highContrast ? 'not-allowed' : 'pointer' }}>
          <ActionIcon
            onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="lg"
            aria-label="Przełącz motyw jasny/ciemny"
            disabled={highContrast}
            style={{ pointerEvents: highContrast ? 'none' : 'auto' }}
          >
            <IconSun className={cx(classes.icon, classes.light)} />
            <IconMoon className={cx(classes.icon, classes.dark)} />
          </ActionIcon>
        </span>
      </Tooltip>

      <Tooltip
        label={highContrast ? 'Wyłącz wysoki kontrast' : 'Włącz wysoki kontrast (czarno-żółty)'}
      >
        <ActionIcon
          onClick={toggleHighContrast}
          variant={highContrast ? 'filled' : 'default'}
          color={highContrast ? 'yellow' : undefined}
          c={highContrast ? 'black' : undefined}
          size="lg"
          aria-label={highContrast ? 'Wyłącz wysoki kontrast' : 'Włącz wysoki kontrast'}
          style={highContrast ? { border: '2px solid yellow' } : {}}
        >
          {highContrast ? <IconEyeOff size={20} /> : <IconEye size={20} />}
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Zmniejsz tekst">
        <ActionIcon
          onClick={decreaseFont}
          variant="default"
          size="lg"
          aria-label="Zmniejsz rozmiar tekstu"
          disabled={fontSizePercent <= 80}
        >
          <IconMinus size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={`Rozmiar tekstu: ${fontSizePercent}%`}>
        <ActionIcon variant="transparent" size="lg" aria-hidden tabIndex={-1}>
          <IconTypography size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Powiększ tekst">
        <ActionIcon
          onClick={increaseFont}
          variant="default"
          size="lg"
          aria-label="Powiększ rozmiar tekstu"
          disabled={fontSizePercent >= 150}
        >
          <IconPlus size={20} />
        </ActionIcon>
      </Tooltip>

      <Link href="/login" style={{ textDecoration: 'none' }}>
        <Button leftSection={<IconLogin size={18} />} variant="filled" size="sm">
          Logowanie
        </Button>
      </Link>
    </Group>
  )
}
```

# src\components\AccessibilityPanel\ThemeToggleIcons.module.css:

```css
.icon {
  width: 20px;
  height: 20px;
}

.light {
  @mixin light {
    display: block;
  }
  @mixin dark {
    display: none;
  }
}

.dark {
  @mixin light {
    display: none;
  }
  @mixin dark {
    display: block;
  }
}
```

# src\components\ai\AIAnalysis\AICommentsAnalysis.tsx:

```tsx
import { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Stack,
  Progress,
  Group,
  Badge,
  SimpleGrid,
  Title,
  Divider,
  Button,
  Alert,
  Loader,
  ThemeIcon,
  List,
  Accordion,
  ActionIcon,
  Tooltip,
} from '@mantine/core'
import {
  IconBrain,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconRefresh,
  IconEye,
  IconThumbUp,
  IconThumbDown,
  IconExclamationMark,
  IconInfoCircle,
  IconUsers,
  IconMessage,
  IconChartBar,
} from '@tabler/icons-react'
import { Comment } from '../../../mocks/prekonsultacjeMock'

interface AIAnalysisProps {
  comments: Comment[]
  projectId: string
  projectTitle: string
}

interface SentimentAnalysis {
  positive: number
  negative: number
  neutral: number
  overall: 'positive' | 'negative' | 'neutral'
}

interface KeyTheme {
  theme: string
  count: number
  sentiment: 'positive' | 'negative' | 'neutral'
  examples: string[]
}

interface AIInsight {
  type: 'concern' | 'suggestion' | 'praise' | 'issue'
  title: string
  description: string
  confidence: number
  commentsCount: number
}

export function AICommentsAnalysis({ comments, projectId, projectTitle }: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<{
    sentiment: SentimentAnalysis
    keyThemes: KeyTheme[]
    insights: AIInsight[]
    summary: string
  } | null>(null)

  // Symulacja analizy AI
  const runAIAnalysis = async () => {
    setIsAnalyzing(true)

    // Symulacja czasu analizy
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mockowa analiza na podstawie komentarzy
    const mockAnalysis = {
      sentiment: {
        positive: Math.floor(Math.random() * 40) + 30, // 30-70%
        negative: Math.floor(Math.random() * 30) + 10, // 10-40%
        neutral: 0,
        overall: 'positive' as 'positive' | 'negative' | 'neutral',
      },
      keyThemes: [
        {
          theme: 'Definicja danych wrażliwych',
          count: 12,
          sentiment: 'neutral' as const,
          examples: ['Należy doprecyzować definicję', 'Zbyt ogólne sformułowania'],
        },
        {
          theme: 'Kary finansowe',
          count: 8,
          sentiment: 'negative' as const,
          examples: ['Zbyt wysokie kary', 'Nieproporcjonalne sankcje'],
        },
        {
          theme: 'Okres przejściowy',
          count: 15,
          sentiment: 'positive' as const,
          examples: ['Potrzebny dłuższy okres', 'Wsparcie dla małych firm'],
        },
        {
          theme: 'Bezpieczeństwo danych',
          count: 20,
          sentiment: 'positive' as const,
          examples: ['Ważne dla obywateli', 'Krok w dobrą stronę'],
        },
      ],
      insights: [
        {
          type: 'concern' as const,
          title: 'Obawy dotyczące implementacji',
          description:
            'Wiele komentarzy wyraża obawy o trudności w implementacji nowych wymogów, szczególnie w małych jednostkach.',
          confidence: 85,
          commentsCount: 23,
        },
        {
          type: 'suggestion' as const,
          title: 'Sugestie dotyczące kar finansowych',
          description:
            'Użytkownicy sugerują wprowadzenie progresywnej skali kar w zależności od wielkości instytucji.',
          confidence: 78,
          commentsCount: 15,
        },
        {
          type: 'praise' as const,
          title: 'Pozytywne przyjęcie celów ustawy',
          description:
            'Większość komentarzy pozytywnie ocenia cel ustawy i potrzebę wzmocnienia ochrony danych.',
          confidence: 92,
          commentsCount: 31,
        },
      ],
      summary:
        'Analiza wykazuje generalnie pozytywny odbiór projektu ustawy, jednak z istotnymi zastrzeżeniami dotyczącymi praktycznej implementacji i wysokości kar finansowych.',
    }

    mockAnalysis.sentiment.neutral =
      100 - mockAnalysis.sentiment.positive - mockAnalysis.sentiment.negative

    let overallSentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    if (mockAnalysis.sentiment.positive > mockAnalysis.sentiment.negative + 20) {
      overallSentiment = 'positive'
    } else if (mockAnalysis.sentiment.negative > mockAnalysis.sentiment.positive + 15) {
      overallSentiment = 'negative'
    } else {
      overallSentiment = 'neutral'
    }

    mockAnalysis.sentiment.overall = overallSentiment

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    if (comments.length > 0) {
      runAIAnalysis()
    }
  }, [comments])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'green'
      case 'negative':
        return 'red'
      case 'neutral':
        return 'gray'
      default:
        return 'blue'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'concern':
        return <IconAlertTriangle size={16} />
      case 'suggestion':
        return <IconInfoCircle size={16} />
      case 'praise':
        return <IconThumbUp size={16} />
      case 'issue':
        return <IconExclamationMark size={16} />
      default:
        return <IconInfoCircle size={16} />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'concern':
        return 'orange'
      case 'suggestion':
        return 'blue'
      case 'praise':
        return 'green'
      case 'issue':
        return 'red'
      default:
        return 'gray'
    }
  }

  if (comments.length === 0) {
    return (
      <Alert icon={<IconInfoCircle size={16} />} title="Brak komentarzy" color="blue">
        Nie ma jeszcze komentarzy do analizy. Dodaj pierwsze komentarze, aby uruchomić analizę AI.
      </Alert>
    )
  }

  return (
    <Stack gap="xl">
      {/* Header z możliwością odświeżenia analizy */}
      <Group justify="space-between">
        <div>
          <Title order={3}>Analiza AI komentarzy</Title>
          <Text size="sm" c="dimmed">
            Analiza {comments.length} komentarzy dla: {projectTitle}
          </Text>
        </div>
        <Button
          variant="light"
          leftSection={<IconRefresh size={16} />}
          onClick={runAIAnalysis}
          loading={isAnalyzing}
        >
          Odśwież analizę
        </Button>
      </Group>

      {isAnalyzing ? (
        <Card p="xl" ta="center">
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text>Analizowanie komentarzy...</Text>
            <Text size="sm" c="dimmed">
              AI przetwarza {comments.length} komentarzy
            </Text>
          </Stack>
        </Card>
      ) : analysis ? (
        <>
          {/* Analiza sentymentu */}
          <Card shadow="sm" p="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Analiza sentymentu</Title>
              <Badge
                color={getSentimentColor(analysis.sentiment.overall)}
                size="lg"
                variant="light"
              >
                {analysis.sentiment.overall === 'positive'
                  ? 'Pozytywny'
                  : analysis.sentiment.overall === 'negative'
                  ? 'Negatywny'
                  : 'Neutralny'}
              </Badge>
            </Group>

            <Stack gap="xs">
              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon color="green" variant="light" size="sm">
                    <IconTrendingUp size={12} />
                  </ThemeIcon>
                  <Text size="sm">Pozytywne</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {analysis.sentiment.positive}%
                </Text>
              </Group>
              <Progress value={analysis.sentiment.positive} color="green" size="sm" />

              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon color="red" variant="light" size="sm">
                    <IconTrendingDown size={12} />
                  </ThemeIcon>
                  <Text size="sm">Negatywne</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {analysis.sentiment.negative}%
                </Text>
              </Group>
              <Progress value={analysis.sentiment.negative} color="red" size="sm" />

              <Group justify="space-between">
                <Group gap="xs">
                  <ThemeIcon color="gray" variant="light" size="sm">
                    <IconMessage size={12} />
                  </ThemeIcon>
                  <Text size="sm">Neutralne</Text>
                </Group>
                <Text size="sm" fw={500}>
                  {analysis.sentiment.neutral}%
                </Text>
              </Group>
              <Progress value={analysis.sentiment.neutral} color="gray" size="sm" />
            </Stack>
          </Card>

          {/* Kluczowe tematy */}
          <Card shadow="sm" p="md" withBorder>
            <Title order={4} mb="md">
              Kluczowe tematy w komentarzach
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              {analysis.keyThemes.map((theme, index) => (
                <Card key={index} p="sm" withBorder>
                  <Group justify="space-between" mb="xs">
                    <Text fw={500} size="sm">
                      {theme.theme}
                    </Text>
                    <Badge color={getSentimentColor(theme.sentiment)} variant="light" size="sm">
                      {theme.count}
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed" lineClamp={2}>
                    {theme.examples[0]}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </Card>

          {/* Kluczowe spostrzeżenia */}
          <Card shadow="sm" p="md" withBorder>
            <Title order={4} mb="md">
              Kluczowe spostrzeżenia AI
            </Title>
            <Accordion>
              {analysis.insights.map((insight, index) => (
                <Accordion.Item key={index} value={`insight-${index}`}>
                  <Accordion.Control>
                    <Group>
                      <ThemeIcon color={getInsightColor(insight.type)} variant="light" size="sm">
                        {getInsightIcon(insight.type)}
                      </ThemeIcon>
                      <div>
                        <Text fw={500}>{insight.title}</Text>
                        <Group gap="xs">
                          <Text size="xs" c="dimmed">
                            Pewność: {insight.confidence}%
                          </Text>
                          <Text size="xs" c="dimmed">
                            •
                          </Text>
                          <Text size="xs" c="dimmed">
                            {insight.commentsCount} komentarzy
                          </Text>
                        </Group>
                      </div>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="sm">{insight.description}</Text>
                    <Progress
                      value={insight.confidence}
                      color={getInsightColor(insight.type)}
                      size="xs"
                      mt="xs"
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card>

          {/* Podsumowanie */}
          <Card shadow="sm" p="md" withBorder>
            <Group mb="md">
              <ThemeIcon color="blue" variant="light">
                <IconBrain size={20} />
              </ThemeIcon>
              <Title order={4}>Podsumowanie AI</Title>
            </Group>
            <Text>{analysis.summary}</Text>
          </Card>

          {/* Statystyki */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <Card p="md" withBorder ta="center">
              <ThemeIcon color="blue" size="lg" mx="auto" mb="xs">
                <IconMessage size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {comments.length}
              </Text>
              <Text size="sm" c="dimmed">
                Komentarzy
              </Text>
            </Card>

            <Card p="md" withBorder ta="center">
              <ThemeIcon color="green" size="lg" mx="auto" mb="xs">
                <IconUsers size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {new Set(comments.map((c) => c.author)).size}
              </Text>
              <Text size="sm" c="dimmed">
                Unikalnych autorów
              </Text>
            </Card>

            <Card p="md" withBorder ta="center">
              <ThemeIcon color="orange" size="lg" mx="auto" mb="xs">
                <IconChartBar size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {analysis.keyThemes.length}
              </Text>
              <Text size="sm" c="dimmed">
                Głównych tematów
              </Text>
            </Card>

            <Card p="md" withBorder ta="center">
              <ThemeIcon color="violet" size="lg" mx="auto" mb="xs">
                <IconBrain size={24} />
              </ThemeIcon>
              <Text fw={600} size="lg">
                {analysis.insights.length}
              </Text>
              <Text size="sm" c="dimmed">
                Spostrzeżeń AI
              </Text>
            </Card>
          </SimpleGrid>
        </>
      ) : null}
    </Stack>
  )
}
```

# src\components\ai\AISummary\AISummary.tsx:

```tsx
import { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Stack,
  Group,
  Button,
  Alert,
  Loader,
  ThemeIcon,
  Badge,
  Divider,
  List,
  ActionIcon,
  Tooltip,
  Progress,
} from '@mantine/core'
import {
  IconBrain,
  IconRefresh,
  IconInfoCircle,
  IconBulb,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconScale,
  IconUsers,
  IconFileText,
} from '@tabler/icons-react'

interface AISummaryProps {
  type: 'ustawa' | 'konsultacja' | 'prekonsultacja'
  title: string
  description?: string
  content?: string
  comments?: any[]
  participants?: number
  status?: string
}

interface AISummaryData {
  mainPoints: string[]
  impact: string
  complexity: 'low' | 'medium' | 'high'
  stakeholders: string[]
  timeline: string
  risks: string[]
  opportunities: string[]
  recommendation: string
  confidence: number
}

export function AISummary({
  type,
  title,
  description,
  content,
  comments,
  participants,
  status,
}: AISummaryProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [summary, setSummary] = useState<AISummaryData | null>(null)

  const generateAISummary = async () => {
    setIsAnalyzing(true)

    // Symulacja czasu analizy
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mockowe streszczenie AI na podstawie typu
    let mockSummary: AISummaryData

    if (type === 'ustawa') {
      mockSummary = {
        mainPoints: [
          'Wprowadzenie nowych standardów ochrony danych osobowych',
          'Wzmocnienie kar za naruszenie przepisów',
          'Uproszczenie procedur dla małych organizacji',
          'Rozszerzenie definicji danych wrażliwych',
        ],
        impact: 'Średni - wpłynie na wszystkie instytucje publiczne i część sektora prywatnego',
        complexity: 'medium',
        stakeholders: ['Instytucje publiczne', 'Firmy IT', 'Organizacje pozarządowe', 'Obywatele'],
        timeline: 'Wejście w życie planowane na 6 miesięcy od publikacji',
        risks: [
          'Wysokie koszty implementacji dla małych firm',
          'Możliwe opóźnienia w dostosowaniu systemów IT',
          'Potrzeba szkoleń dla personelu',
        ],
        opportunities: [
          'Zwiększenie zaufania obywateli do instytucji',
          'Harmonizacja z regulacjami UE',
          'Rozwój sektora cyberbezpieczeństwa',
        ],
        recommendation:
          'Ustawa jest potrzebna, ale wymaga wydłużenia okresu przejściowego i dodatkowego wsparcia dla małych organizacji.',
        confidence: 87,
      }
    } else if (type === 'konsultacja') {
      mockSummary = {
        mainPoints: [
          'Reforma ma na celu poprawę dostępności usług zdrowotnych',
          'Planowane zwiększenie finansowania o 15%',
          'Digitalizacja procesów medycznych',
          'Nowe standardy jakości opieki',
        ],
        impact: 'Wysoki - dotknie wszystkich pacjentów i pracowników służby zdrowia',
        complexity: 'high',
        stakeholders: [
          'Pacjenci',
          'Lekarze',
          'Pielęgniarki',
          'Szpitale',
          'NFZ',
          'Firmy farmaceutyczne',
        ],
        timeline: 'Implementacja w ciągu 2-3 lat w fazach',
        risks: [
          'Opór środowiska medycznego wobec zmian',
          'Wysokie koszty modernizacji infrastruktury',
          'Możliwe przerwy w świadczeniu usług',
        ],
        opportunities: [
          'Skrócenie kolejek do specjalistów',
          'Lepsza koordynacja opieki',
          'Rozwój telemedycyny',
        ],
        recommendation: `Na podstawie ${
          participants || 'wielu'
        } uczestników konsultacji, reforma jest potrzebna ale wymaga ostrożnej implementacji.`,
        confidence: 92,
      }
    } else {
      // prekonsultacja
      mockSummary = {
        mainPoints: [
          'Projekt wprowadza nowe mechanizmy partycypacji obywatelskiej',
          'Cyfryzacja procesów konsultacyjnych',
          'Zwiększenie transparentności procesów legislacyjnych',
          'Nowe narzędzia komunikacji z społeczeństwem',
        ],
        impact: 'Średni - wpłynie na jakość procesów demokratycznych',
        complexity: 'low',
        stakeholders: ['Obywatele', 'Organizacje społeczne', 'Urzędy', 'Media', 'Eksperci'],
        timeline: 'Pilotaż w wybranych urzędach w ciągu 6 miesięcy',
        risks: [
          'Niska aktywność obywateli w nowych formach konsultacji',
          'Problemy techniczne z platformami cyfrowymi',
          'Opór części urzędników',
        ],
        opportunities: [
          'Większe zaangażowanie społeczne w tworzenie prawa',
          'Lepsza jakość projektów ustaw',
          'Wzrost zaufania do instytucji',
        ],
        recommendation: `Projekt ma duży potencjał. ${
          comments?.length || 0
        } komentarzy wskazuje na zainteresowanie społeczne.`,
        confidence: 78,
      }
    }

    setSummary(mockSummary)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    generateAISummary()
  }, [type, title])

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'green'
      case 'medium':
        return 'yellow'
      case 'high':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getComplexityLabel = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'Niska'
      case 'medium':
        return 'Średnia'
      case 'high':
        return 'Wysoka'
      default:
        return 'Nieznana'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ustawa':
        return 'Ustawy'
      case 'konsultacja':
        return 'Konsultacji'
      case 'prekonsultacja':
        return 'Prekonsultacji'
      default:
        return 'Dokumentu'
    }
  }

  if (isAnalyzing) {
    return (
      <Card shadow="sm" p="md" withBorder>
        <Stack align="center" gap="md">
          <ThemeIcon color="blue" size="xl">
            <IconBrain size={24} />
          </ThemeIcon>
          <Loader size="md" />
          <Text>AI analizuje {getTypeLabel(type).toLowerCase()}...</Text>
          <Text size="sm" c="dimmed">
            Przetwarzanie treści i generowanie streszczenia
          </Text>
        </Stack>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Alert icon={<IconInfoCircle size={16} />} title="Streszczenie AI" color="blue">
        Brak danych do analizy. Spróbuj ponownie później.
      </Alert>
    )
  }

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between">
        <Group>
          <ThemeIcon color="blue" variant="light">
            <IconBrain size={20} />
          </ThemeIcon>
          <div>
            <Text fw={600}>Streszczenie AI</Text>
            <Text size="sm" c="dimmed">
              Automatyczna analiza {getTypeLabel(type).toLowerCase()}
            </Text>
          </div>
        </Group>
        <Group>
          <Badge color="blue" variant="light">
            Pewność: {summary.confidence}%
          </Badge>
          <Tooltip label="Wygeneruj ponownie">
            <ActionIcon variant="light" onClick={generateAISummary} loading={isAnalyzing}>
              <IconRefresh size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {/* Główne punkty */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="sm">
            <IconFileText size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Kluczowe punkty
          </Text>
        </Group>
        <List spacing="xs" size="sm">
          {summary.mainPoints.map((point, index) => (
            <List.Item key={index}>{point}</List.Item>
          ))}
        </List>
      </Card>

      {/* Wpływ i złożoność */}
      <Group grow>
        <Card p="md" withBorder>
          <Group mb="xs">
            <ThemeIcon color="orange" variant="light" size="sm">
              <IconUsers size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Wpływ
            </Text>
          </Group>
          <Text size="sm">{summary.impact}</Text>
        </Card>

        <Card p="md" withBorder>
          <Group mb="xs">
            <ThemeIcon color={getComplexityColor(summary.complexity)} variant="light" size="sm">
              <IconScale size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Złożoność
            </Text>
          </Group>
          <Badge color={getComplexityColor(summary.complexity)} variant="light">
            {getComplexityLabel(summary.complexity)}
          </Badge>
        </Card>
      </Group>

      {/* Interesariusze */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="grape" variant="light" size="sm">
            <IconUsers size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Kluczowi interesariusze
          </Text>
        </Group>
        <Group gap="xs">
          {summary.stakeholders.map((stakeholder, index) => (
            <Badge key={index} variant="outline" size="sm">
              {stakeholder}
            </Badge>
          ))}
        </Group>
      </Card>

      {/* Timeline */}
      <Card p="md" withBorder>
        <Group mb="xs">
          <ThemeIcon color="teal" variant="light" size="sm">
            <IconClock size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Harmonogram
          </Text>
        </Group>
        <Text size="sm">{summary.timeline}</Text>
      </Card>

      {/* Ryzyka i możliwości */}
      <Group grow align="flex-start">
        <Card p="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="red" variant="light" size="sm">
              <IconAlertTriangle size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Ryzyka
            </Text>
          </Group>
          <List spacing="xs" size="sm">
            {summary.risks.map((risk, index) => (
              <List.Item key={index}>{risk}</List.Item>
            ))}
          </List>
        </Card>

        <Card p="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="green" variant="light" size="sm">
              <IconBulb size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Możliwości
            </Text>
          </Group>
          <List spacing="xs" size="sm">
            {summary.opportunities.map((opportunity, index) => (
              <List.Item key={index}>{opportunity}</List.Item>
            ))}
          </List>
        </Card>
      </Group>

      {/* Rekomendacja */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="sm">
            <IconCheck size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Rekomendacja AI
          </Text>
        </Group>
        <Text size="sm">{summary.recommendation}</Text>
        <Progress value={summary.confidence} color="blue" size="xs" mt="xs" />
        <Text size="xs" c="dimmed" mt="xs">
          Poziom pewności: {summary.confidence}%
        </Text>
      </Card>
    </Stack>
  )
}
```

# src\components\ai\AISummaryGroq.tsx:

```tsx
'use client'
import { useState, useEffect } from 'react'
import {
  Card,
  Text,
  Stack,
  Group,
  Button,
  Alert,
  Loader,
  Badge,
  Progress,
  List,
  ThemeIcon,
} from '@mantine/core'
import {
  IconBrain,
  IconRefresh,
  IconFileText,
  IconUsers,
  IconScale,
  IconClock,
  IconAlertTriangle,
  IconBulb,
  IconCheck,
} from '@tabler/icons-react'
import { generateText } from 'ai' // z @ai-sdk/core
import { groq } from '@ai-sdk/groq'

interface AISummaryGroqProps {
  type: 'ustawa' | 'konsultacja' | 'prekonsultacja'
  title: string
  description?: string
  content?: string // Treść ustawy/PDF (pobierz z API Sejmu)
  comments?: string[] // Dla analizy komentarzy (opcjonalnie)
}

interface SummaryData {
  mainPoints: string[]
  impact: string
  complexity: 'low' | 'medium' | 'high'
  stakeholders: string[]
  timeline: string
  risks: string[]
  opportunities: string[]
  recommendation: string
  confidence: number
}

export function AISummaryGroq({
  type,
  title,
  description,
  content = '',
  comments = [],
}: AISummaryGroqProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [summary, setSummary] = useState<SummaryData | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Prompt – dokładnie jak w Twoim przykładzie, ale dynamiczny
  const buildPrompt = () => {
    const basePrompt = `Jesteś polskim ekspertem legislacyjnym. Przeanalizuj poniższy dokument/projekt i stwórz streszczenie w ścisłym formacie JSON (bez dodatkowego tekstu!).

TYTUŁ: ${title}
${description ? `OPIS: ${description}` : ''}
${
  content ? `TREŚĆ: ${content.slice(0, 8000)}...` : ''
}  // Ogranicz do 8k tokenów, by nie przekraczać limitów
${
  comments.length > 0
    ? `KOMENTARZE (${comments.length}): ${comments.slice(0, 5).join('; ')}...`
    : ''
}

Zwróć WYŁĄCZNIE JSON:
{
  "mainPoints": ["Kluczowy punkt 1", "Punkt 2", "..."],  // 3-5 punktów
  "impact": "Średni - wpłynie na X i Y",  // Krótki opis
  "complexity": "low|medium|high",
  "stakeholders": ["Instytucja 1", "Grupa 2", "..."],  // 4-6
  "timeline": "Wejście w życie: X miesięcy od publikacji",
  "risks": ["Ryzyko 1", "Ryzyko 2", "..."],  // 2-4
  "opportunities": ["Możliwość 1", "Możliwość 2", "..."],  // 2-4
  "recommendation": "Ustawa jest potrzebna, ale wymaga Z. Poziom pewności: XX%",
  "confidence": 87  // Liczba 70-95
}`

    if (type === 'konsultacja') {
      return basePrompt.replace('dokument/projekt', 'konsultacje projektu')
    } else if (type === 'prekonsultacja') {
      return basePrompt.replace('dokument/projekt', 'prekonsultacje')
    }
    return basePrompt
  }

  const generateSummary = async () => {
    if (!content && comments.length === 0) {
      setError('Brak treści do analizy!')
      return
    }
    setIsAnalyzing(true)
    setError(null)
    try {
      const { text } = await generateText({
        model: groq('llama-3.3-70b-versatile'), // TYLKO 1 ARGUMENT: model ID
        prompt: buildPrompt(),
        temperature: 0.1,
      })
      // Wyciągnij JSON z odpowiedzi (Groq zwraca markdown, ale prompt jest ścisły)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('Nieprawidłowa odpowiedź AI')
      const parsed = JSON.parse(jsonMatch[0])
      setSummary(parsed)
    } catch (err) {
      console.error(err)
      setError('Błąd Groq API: Sprawdź key lub limity (429 = przekroczony limit).')
    } finally {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    if (content || comments.length > 0) {
      generateSummary()
    }
  }, [content, comments])

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low':
        return 'green'
      case 'medium':
        return 'yellow'
      case 'high':
        return 'red'
      default:
        return 'gray'
    }
  }
  const getComplexityLabel = (complexity: string) =>
    ({ low: 'Niska', medium: 'Średnia', high: 'Wysoka' }[complexity] || 'Nieznana')

  if (isAnalyzing) {
    return (
      <Card shadow="sm" p="xl" ta="center" withBorder>
        <Loader size="lg" />
        <Text mt="md">Groq analizuje {type}... (to zajmie chwilke!)</Text>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert icon={<IconBrain size={16} />} title="Błąd AI" color="red">
        {error}{' '}
        <Button variant="subtle" onClick={generateSummary} leftSection={<IconRefresh />}>
          Spróbuj ponownie
        </Button>
      </Alert>
    )
  }

  if (!summary) {
    return (
      <Alert icon={<IconBrain size={16} />} title="Brak danych" color="blue">
        Dodaj treść lub komentarze, by uruchomić analizę.
      </Alert>
    )
  }

  // UI – identyczne jak Twój AISummary, tylko z realnymi danymi
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Group>
          <ThemeIcon color="blue" variant="light">
            <IconBrain size={20} />
          </ThemeIcon>
          <div>
            <Text fw={600}>Streszczenie Groq AI</Text>
            <Text size="sm" c="dimmed">
              Analiza {title}
            </Text>
          </div>
        </Group>
        <Group>
          <Badge color="blue" variant="light">
            Pewność: {summary.confidence}%
          </Badge>
          <Button variant="light" leftSection={<IconRefresh />} onClick={generateSummary} size="xs">
            Regeneruj
          </Button>
        </Group>
      </Group>

      {/* Kluczowe punkty */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="sm">
            <IconFileText size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Kluczowe punkty
          </Text>
        </Group>
        <List spacing="xs" size="sm">
          {summary.mainPoints.map((point, i) => (
            <List.Item key={i}>{point}</List.Item>
          ))}
        </List>
      </Card>

      {/* Wpływ i Złożoność */}
      <Group grow>
        <Card p="md" withBorder>
          <Group mb="xs">
            <ThemeIcon color="orange" variant="light" size="sm">
              <IconUsers size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Wpływ
            </Text>
          </Group>
          <Text size="sm">{summary.impact}</Text>
        </Card>
        <Card p="md" withBorder>
          <Group mb="xs">
            <ThemeIcon color={getComplexityColor(summary.complexity)} variant="light" size="sm">
              <IconScale size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Złożoność
            </Text>
          </Group>
          <Badge color={getComplexityColor(summary.complexity)} variant="light">
            {getComplexityLabel(summary.complexity)}
          </Badge>
        </Card>
      </Group>

      {/* Interesariusze */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="grape" variant="light" size="sm">
            <IconUsers size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Kluczowi interesariusze
          </Text>
        </Group>
        <Group gap="xs">
          {summary.stakeholders.map((s, i) => (
            <Badge key={i} variant="outline" size="sm">
              {s}
            </Badge>
          ))}
        </Group>
      </Card>

      {/* Harmonogram */}
      <Card p="md" withBorder>
        <Group mb="xs">
          <ThemeIcon color="teal" variant="light" size="sm">
            <IconClock size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Harmonogram
          </Text>
        </Group>
        <Text size="sm">{summary.timeline}</Text>
      </Card>

      {/* Ryzyka i Możliwości */}
      <Group grow align="flex-start">
        <Card p="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="red" variant="light" size="sm">
              <IconAlertTriangle size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Ryzyka
            </Text>
          </Group>
          <List spacing="xs" size="sm">
            {summary.risks.map((r, i) => (
              <List.Item key={i}>{r}</List.Item>
            ))}
          </List>
        </Card>
        <Card p="md" withBorder>
          <Group mb="md">
            <ThemeIcon color="green" variant="light" size="sm">
              <IconBulb size={14} />
            </ThemeIcon>
            <Text fw={600} size="sm">
              Możliwości
            </Text>
          </Group>
          <List spacing="xs" size="sm">
            {summary.opportunities.map((o, i) => (
              <List.Item key={i}>{o}</List.Item>
            ))}
          </List>
        </Card>
      </Group>

      {/* Rekomendacja */}
      <Card p="md" withBorder>
        <Group mb="md">
          <ThemeIcon color="blue" variant="light" size="sm">
            <IconCheck size={14} />
          </ThemeIcon>
          <Text fw={600} size="sm">
            Rekomendacja AI
          </Text>
        </Group>
        <Text size="sm">{summary.recommendation}</Text>
        <Progress value={summary.confidence} color="blue" size="xs" mt="xs" />
        <Text size="xs" c="dimmed" mt="xs">
          Poziom pewności: {summary.confidence}%
        </Text>
      </Card>
    </Stack>
  )
}
```

# src\components\comments\CommentForm\CommentForm.tsx:

```tsx
'use client'

import { useState } from 'react'
import { Card, Text, Button, Textarea, Group, Rating, Stack } from '@mantine/core'

interface CommentFormProps {
  onSubmit: (content: string, rating: number) => void
  isSubmitting?: boolean
}

export function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)

  const handleSubmit = async () => {
    if (!content.trim()) return

    await onSubmit(content, rating)
    setContent('')
    setRating(0)
  }

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Text fw={600} mb="md">
        Dodaj komentarz
      </Text>

      <Stack>
        <Group>
          <Text size="sm">Twoja ocena:</Text>
          <Rating value={rating} onChange={setRating} />
        </Group>

        <Textarea
          placeholder="Napisz swój komentarz do tego projektu..."
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          minRows={4}
          maxRows={8}
        />

        <Group justify="flex-end">
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            loading={isSubmitting}
          >
            Dodaj komentarz
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}
```

# src\components\comments\CommentForm\index.ts:

```ts
export { CommentForm } from './CommentForm'
```

# src\components\comments\CommentItem\CommentActions\CommentActions.tsx:

```tsx
'use client'

import { Group, Text, ActionIcon, Tooltip, Button } from '@mantine/core'
import { IconThumbUp, IconThumbDown, IconArrowBackUp } from '@tabler/icons-react'

interface CommentActionsProps {
  likes: number
  dislikes: number
  onLike: () => void
  onDislike: () => void
  onReply: () => void
}

export function CommentActions({
  likes,
  dislikes,
  onLike,
  onDislike,
  onReply,
}: CommentActionsProps) {
  return (
    <Group justify="space-between">
      <Group>
        <Tooltip label="Przydatny komentarz">
          <ActionIcon variant="subtle" color="green" onClick={onLike} size="sm">
            <IconThumbUp size={16} />
          </ActionIcon>
        </Tooltip>
        <Text size="xs" c="dimmed">
          {likes}
        </Text>

        <Tooltip label="Nieprzydatny komentarz">
          <ActionIcon variant="subtle" color="red" onClick={onDislike} size="sm">
            <IconThumbDown size={16} />
          </ActionIcon>
        </Tooltip>
        <Text size="xs" c="dimmed">
          {dislikes}
        </Text>
      </Group>

      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconArrowBackUp size={14} />}
        onClick={onReply}
      >
        Odpowiedz
      </Button>
    </Group>
  )
}
```

# src\components\comments\CommentItem\CommentActions\index.ts:

```ts
export { CommentActions } from './CommentActions'
```

# src\components\comments\CommentItem\CommentItem.tsx:

```tsx
'use client'

import { useState } from 'react'
import { Card, Text, Group, Avatar, Rating, Badge, Stack } from '@mantine/core'
import { Comment } from '@/types'
import { CommentActions } from './CommentActions'

interface CommentItemProps {
  comment: Comment
}

export function CommentItem({ comment }: CommentItemProps) {
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [showReply, setShowReply] = useState(false)

  const initials = comment.author
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <Card shadow="sm" p="md" radius="md">
      <Group justify="space-between" mb="xs">
        <Group>
          <Avatar size={40} radius="xl" color="blue">
            {initials}
          </Avatar>
          <div>
            <Text fw={500} size="sm">
              {comment.author}
            </Text>
            <Text size="xs" c="dimmed">
              {new Date(comment.date).toLocaleDateString('pl-PL')}
            </Text>
          </div>
        </Group>
        {comment.rating && (
          <Badge variant="light" color="yellow">
            <Rating value={comment.rating} readOnly size="xs" />
          </Badge>
        )}
      </Group>

      <Text size="sm" mb="md">
        {comment.content}
      </Text>

      <CommentActions
        likes={likes}
        dislikes={dislikes}
        onLike={() => setLikes(likes + 1)}
        onDislike={() => setDislikes(dislikes + 1)}
        onReply={() => setShowReply(!showReply)}
      />

      {showReply && (
        <Card mt="md" p="sm" withBorder>
          <Text size="sm" c="dimmed">
            Funkcja odpowiedzi będzie dostępna wkrótce
          </Text>
        </Card>
      )}
    </Card>
  )
}
```

# src\components\comments\CommentItem\index.ts:

```ts
export { CommentItem } from './CommentItem'
export { CommentActions } from './CommentActions'
```

# src\components\comments\CommentList\CommentList.tsx:

```tsx
'use client'

import { Stack, Text, Divider } from '@mantine/core'
import { Comment } from '@/types'
import { CommentItem } from '../CommentItem'

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Text ta="center" c="dimmed" py="xl">
        Brak komentarzy. Bądź pierwszy!
      </Text>
    )
  }

  return (
    <>
      <Divider label={`Komentarze (${comments.length})`} labelPosition="left" />
      <Stack>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Stack>
    </>
  )
}
```

# src\components\comments\CommentList\index.ts:

```ts
export { CommentList } from './CommentList'
```

# src\components\comments\Comments.tsx:

```tsx
'use client'

import { useState } from 'react'
import { Stack } from '@mantine/core'
import { Comment } from '@/types'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

interface CommentsProps {
  comments: Comment[]
  onAddComment: (content: string, rating: number) => void
}

export function Comments({ comments, onAddComment }: CommentsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (content: string, rating: number) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    onAddComment(content, rating)
    setIsSubmitting(false)
  }

  return (
    <Stack>
      <CommentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <CommentList comments={comments} />
    </Stack>
  )
}
```

# src\components\comments\index.ts:

```ts
export { Comments } from './Comments'
export { CommentForm } from './CommentForm'
export { CommentItem } from './CommentItem'
export { CommentList } from './CommentList'
```

# src\components\HomeCards\HomeCards.module.css:

```css
.card {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  background-color: var(--mantine-primary-color-light);
  transform: translateY(-4px);
}

.card:hover .iconArrow {
  transform: translateX(4px);
}

.iconArrow {
  transition: transform 0.2s ease;
}
```

# src\components\HomeCards\HomeCards.tsx:

```tsx
'use client'

import { useState } from 'react'
import { Container, Stack, Modal, Tabs } from '@mantine/core'
import {
  IconFileText,
  IconMessage,
  IconStar,
  IconBrain,
  IconFileDescription,
} from '@tabler/icons-react'
import { PreConsultationProject } from '@/types'
import { useHomeData } from '@/features/home/hooks/useHomeData'
import { useHomeSearch } from '@/features/home/hooks/useHomeSearch'
import { HomeSearch, HomeTabs } from '@/features/home/components'
import { useProjectComments } from '@/features/consultations/hooks/useProjectComments'
import { Comments } from '@/components/comments'
import { ProjectRating } from '@/components/ProjectRating/ProjectRating'
import { AICommentsAnalysis } from '@/components/ai/AIAnalysis/AICommentsAnalysis'
import { AISummary } from '@/components/ai/AISummary/AISummary'
import ProjectDetailsTab from './ProjectDetailsTab'

export default function HomeCards() {
  const [activeTab, setActiveTab] = useState<string | null>('ustawy')
  const [selectedProject, setSelectedProject] = useState<PreConsultationProject | null>(null)

  // Load data based on active tab
  const { actsData, prekonsultacjeData, konsultacjeData, loading } = useHomeData(activeTab)

  // Initialize project comments hook
  const {
    projects: prekonsultacjeWithComments,
    addComment,
    rateProject,
  } = useProjectComments(prekonsultacjeData)

  // Search functionality
  const { searchQuery, setSearchQuery, filteredActs, filteredPrekonsultacje, filteredKonsultacje } =
    useHomeSearch(actsData, prekonsultacjeWithComments, konsultacjeData)

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <HomeSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <HomeTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          actsData={filteredActs}
          prekonsultacjeData={filteredPrekonsultacje}
          konsultacjeData={filteredKonsultacje}
          loading={loading}
          searchQuery={searchQuery}
          onProjectClick={setSelectedProject}
        />
      </Stack>

      {/* Project Details Modal */}
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
              <Tabs.Tab value="comments" leftSection={<IconMessage size={16} />}>
                Komentarze ({selectedProject.comments.length})
              </Tabs.Tab>
              <Tabs.Tab value="rating" leftSection={<IconStar size={16} />}>
                Oceny
              </Tabs.Tab>
              <Tabs.Tab value="ai-analysis" leftSection={<IconBrain size={16} />}>
                Analiza AI
              </Tabs.Tab>
              <Tabs.Tab value="document-summary" leftSection={<IconFileDescription size={16} />}>
                Streszczenie dokumentu AI
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="details" pt="md">
              <ProjectDetailsTab project={selectedProject} />
            </Tabs.Panel>

            <Tabs.Panel value="comments" pt="md">
              <Comments
                comments={selectedProject.comments}
                onAddComment={(content, rating) => addComment(selectedProject.id, content, rating)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="rating" pt="md">
              <ProjectRating
                averageRating={selectedProject.averageRating}
                ratingsCount={selectedProject.ratingsCount}
                onRate={(rating, review) => rateProject(selectedProject.id, rating, review)}
              />
            </Tabs.Panel>

            <Tabs.Panel value="ai-analysis" pt="md">
              <AICommentsAnalysis
                comments={selectedProject.comments}
                projectId={selectedProject.id}
                projectTitle={selectedProject.title}
              />
            </Tabs.Panel>

            <Tabs.Panel value="document-summary" pt="md">
              <AISummary
                type="prekonsultacja"
                title={selectedProject.title}
                description={selectedProject.description}
                content=""
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </Modal>
    </Container>
  )
}
```

# src\components\HomeCards\ProjectDetailsTab.tsx:

```tsx
'use client'

import { Stack, Group, Text, Badge, Grid } from '@mantine/core'
import { IconBuilding, IconCalendar } from '@tabler/icons-react'
import { PreConsultationProject } from '@/types'
import { StatusBadge } from '@/components/shared'

interface ProjectDetailsTabProps {
  project: PreConsultationProject
}

export default function ProjectDetailsTab({ project }: ProjectDetailsTabProps) {
  return (
    <Stack gap="md">
      <Group>
        <StatusBadge status={project.status} variant="light" />
        <Badge variant="outline">{project.category}</Badge>
      </Group>

      <Text>{project.description}</Text>

      <Grid>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Instytucja:
          </Text>
          <Text size="sm">{project.institution}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Termin:
          </Text>
          <Text size="sm">{new Date(project.deadline).toLocaleDateString('pl-PL')}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Data utworzenia:
          </Text>
          <Text size="sm">{new Date(project.createdAt).toLocaleDateString('pl-PL')}</Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="sm" fw={600}>
            Dokumenty:
          </Text>
          <Text size="sm">{project.documentsCount} plików</Text>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
```

# src\components\Layout\AppShell.tsx:

```tsx
'use client'

import { AppShell, Burger, Group, Text, Anchor } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode } from 'react'
import Link from 'next/link'
import AccessibilityPanel from '../AccessibilityPanel/AccessibilityPanel'

interface AppShellLayoutProps {
  children: ReactNode
}

export default function AppShellLayout({ children }: AppShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Nawigacja"
            />
            <Anchor
              component={Link}
              href="/"
              fw={700}
              c="inherit"
              td="none"
              style={{
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--mantine-color-blue-6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit'
              }}
            >
              INTERAKTYWNY PORTAL ANALIZ LEGISLACYJNYCH (IPAL)
            </Anchor>
          </Group>

          <div>
            <AccessibilityPanel />
          </div>
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
```

# src\components\ProjectRating\ProjectRating.tsx:

```tsx
import { useState } from 'react'
import {
  Card,
  Text,
  Button,
  Group,
  Rating,
  Stack,
  Progress,
  Badge,
  ActionIcon,
  Tooltip,
  Modal,
  Textarea,
} from '@mantine/core'
import { IconStar, IconUsers, IconCalendar, IconBuilding } from '@tabler/icons-react'

interface ProjectRatingProps {
  averageRating: number
  ratingsCount: number
  userRating?: number
  onRate: (rating: number, review?: string) => void
}

interface RatingDistributionProps {
  ratingsCount: number
}

function RatingDistribution({ ratingsCount }: RatingDistributionProps) {
  // Symulowane dane rozkładu ocen
  const distribution = [
    { stars: 5, count: Math.floor(ratingsCount * 0.4), percentage: 40 },
    { stars: 4, count: Math.floor(ratingsCount * 0.3), percentage: 30 },
    { stars: 3, count: Math.floor(ratingsCount * 0.15), percentage: 15 },
    { stars: 2, count: Math.floor(ratingsCount * 0.1), percentage: 10 },
    { stars: 1, count: Math.floor(ratingsCount * 0.05), percentage: 5 },
  ]

  return (
    <Stack gap="xs">
      <Text fw={600} size="sm">
        Rozkład ocen
      </Text>
      {distribution.map((item) => (
        <Group key={item.stars} justify="space-between">
          <Group gap="xs">
            <Text size="xs" w={20}>
              {item.stars}
            </Text>
            <IconStar size={14} />
          </Group>
          <Progress value={item.percentage} style={{ flex: 1 }} size="sm" color="yellow" mx="md" />
          <Text size="xs" c="dimmed" w={30}>
            {item.count}
          </Text>
        </Group>
      ))}
    </Stack>
  )
}

export function ProjectRating({
  averageRating,
  ratingsCount,
  userRating,
  onRate,
}: ProjectRatingProps) {
  const [selectedRating, setSelectedRating] = useState(userRating || 0)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [review, setReview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRateProject = () => {
    setShowRatingModal(true)
  }

  const handleSubmitRating = async () => {
    if (selectedRating === 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Symulacja API call

    onRate(selectedRating, review)
    setShowRatingModal(false)
    setReview('')
    setIsSubmitting(false)
  }

  return (
    <>
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text fw={600} mb="xs">
                Ocena projektu
              </Text>
              <Group gap="xs">
                <Rating value={averageRating} readOnly fractions={2} />
                <Text fw={600} size="lg">
                  {averageRating.toFixed(1)}
                </Text>
              </Group>
              <Group gap="xs" mt="xs">
                <IconUsers size={16} />
                <Text size="sm" c="dimmed">
                  {ratingsCount} ocen
                </Text>
              </Group>
            </div>

            <Button
              variant={userRating ? 'light' : 'filled'}
              leftSection={<IconStar size={16} />}
              onClick={handleRateProject}
            >
              {userRating ? 'Zmień ocenę' : 'Oceń projekt'}
            </Button>
          </Group>

          <RatingDistribution ratingsCount={ratingsCount} />

          {userRating && (
            <Badge variant="light" color="green" size="lg">
              Twoja ocena: {userRating}/5 ⭐
            </Badge>
          )}
        </Stack>
      </Card>

      <Modal
        opened={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Oceń projekt"
        size="md"
      >
        <Stack>
          <div>
            <Text mb="xs">Twoja ocena:</Text>
            <Group>
              <Rating size="lg" value={selectedRating} onChange={setSelectedRating} />
              <Text fw={600}>{selectedRating}/5</Text>
            </Group>
          </div>

          <div>
            <Text mb="xs">Uzasadnienie (opcjonalne):</Text>
            <Textarea
              placeholder="Podziel się swoją opinią o tym projekcie..."
              value={review}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setReview(event.currentTarget.value)
              }
              minRows={3}
              maxRows={6}
            />
          </div>

          <Group justify="flex-end" mt="md">
            <Button variant="subtle" onClick={() => setShowRatingModal(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={selectedRating === 0}
              loading={isSubmitting}
            >
              Oceń projekt
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
```

# src\components\projects\index.ts:

```ts
export { ProjectCard } from './ProjectCard'
export { ProjectFilters } from './ProjectFilters'
export { ProjectGrid } from './ProjectGrid'
```

# src\components\projects\ProjectCard\index.ts:

```ts
export { ProjectCard } from './ProjectCard'
export { ProjectCardHeader } from './ProjectCardHeader'
export { ProjectCardInfo } from './ProjectCardInfo'
```

# src\components\projects\ProjectCard\ProjectCard.module.css:

```css
.card {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, background-color 0.2s ease;
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  background-color: var(--mantine-primary-color-light);
  transform: translateY(-4px);
}
```

# src\components\projects\ProjectCard\ProjectCard.tsx:

```tsx
'use client'

import { Card, Text, Stack, Button } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'
import { PreConsultationProject } from '@/types'
import { ProjectCardHeader } from './ProjectCardHeader'
import { ProjectCardInfo } from './ProjectCardInfo'
import classes from './ProjectCard.module.css'

interface ProjectCardProps {
  project: PreConsultationProject
  onViewDetails: (project: PreConsultationProject) => void
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card padding="lg" withBorder className={classes.card}>
      <Stack justify="space-between" h="100%">
        <div>
          <ProjectCardHeader status={project.status} category={project.category} />

          <Text fw={600} size="md" mb="xs" lineClamp={2}>
            {project.title}
          </Text>

          <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
            {project.description}
          </Text>

          <ProjectCardInfo
            institution={project.institution}
            deadline={project.deadline}
            averageRating={project.averageRating}
            ratingsCount={project.ratingsCount}
            commentsCount={project.comments.length}
            documentsCount={project.documentsCount}
            showAIBadge={project.comments.length > 0}
          />
        </div>

        <Button
          variant="default"
          fullWidth
          leftSection={<IconEye size={16} />}
          onClick={() => onViewDetails(project)}
        >
          Zobacz szczegóły
        </Button>
      </Stack>
    </Card>
  )
}
```

# src\components\projects\ProjectCard\ProjectCardHeader.tsx:

```tsx
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
```

# src\components\projects\ProjectCard\ProjectCardInfo.tsx:

```tsx
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
```

# src\components\projects\ProjectFilters\index.ts:

```ts
export { ProjectFilters } from './ProjectFilters'
```

# src\components\projects\ProjectFilters\ProjectFilters.tsx:

```tsx
'use client'

import { Paper, Grid, TextInput, Select } from '@mantine/core'
import { IconSearch, IconFilter } from '@tabler/icons-react'

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  categories: string[]
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  categories,
}: ProjectFiltersProps) {
  return (
    <Paper p="md" shadow="sm" radius="md">
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            placeholder="Szukaj projektów..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            placeholder="Status"
            leftSection={<IconFilter size={16} />}
            data={[
              { value: 'all', label: 'Wszystkie' },
              { value: 'active', label: 'Aktywne' },
              { value: 'draft', label: 'Projekty' },
              { value: 'closed', label: 'Zakończone' },
            ]}
            value={statusFilter}
            onChange={(value) => onStatusChange(value || 'all')}
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
            value={categoryFilter}
            onChange={(value) => onCategoryChange(value || 'all')}
          />
        </Grid.Col>
      </Grid>
    </Paper>
  )
}
```

# src\components\projects\ProjectGrid\index.ts:

```ts
export { ProjectGrid } from './ProjectGrid'
```

# src\components\projects\ProjectGrid\ProjectGrid.tsx:

```tsx
'use client'

import { Grid, Skeleton } from '@mantine/core'
import { PreConsultationProject } from '@/types'
import { ProjectCard } from '../ProjectCard'
import { EmptyState } from '@/components/shared'

interface ProjectGridProps {
  projects: PreConsultationProject[]
  isLoading?: boolean
  onProjectClick: (project: PreConsultationProject) => void
  emptyMessage?: string
}

export function ProjectGrid({
  projects,
  isLoading,
  onProjectClick,
  emptyMessage = 'Nie znaleziono projektów',
}: ProjectGridProps) {
  if (isLoading) {
    return (
      <Grid>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
              <Skeleton height={280} />
            </Grid.Col>
          ))}
      </Grid>
    )
  }

  if (projects.length === 0) {
    return <EmptyState title={emptyMessage} />
  }

  return (
    <Grid>
      {projects.map((project) => (
        <Grid.Col key={project.id} span={{ base: 12, md: 6, lg: 4 }}>
          <ProjectCard project={project} onViewDetails={onProjectClick} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
```

# src\components\SetContrastButton\demo.module.css:

```css
.icon {
  width: 22px;
  height: 22px;
}

.dark {
  @mixin dark {
    display: none;
  }

  @mixin light {
    display: block;
  }
}

.light {
  @mixin light {
    display: none;
  }

  @mixin dark {
    display: block;
  }
}
```

# src\components\SetContrastButton\SetContrastButton.tsx:

```tsx
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import cx from 'clsx'
import classes from './demo.module.css'

export default function SetContrastButton() {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  )
}
```

# src\components\shared\EmptyState\EmptyState.tsx:

```tsx
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
```

# src\components\shared\EmptyState\index.ts:

```ts
export { EmptyState } from './EmptyState'
```

# src\components\shared\index.ts:

```ts
export { SearchInput } from './SearchInput'
export { StatusBadge } from './StatusBadge'
export { StatsCard } from './StatsCard'
export { EmptyState } from './EmptyState'
```

# src\components\shared\SearchInput\index.ts:

```ts
export { SearchInput } from './SearchInput'
```

# src\components\shared\SearchInput\SearchInput.tsx:

```tsx
'use client'

import { TextInput, rem } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Szukaj...',
  size = 'xl',
}: SearchInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      size={size}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      leftSection={<IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />}
      styles={{
        input: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid var(--mantine-color-gray-3)',
        },
      }}
    />
  )
}
```

# src\components\shared\StatsCard\index.ts:

```ts
export { StatsCard } from './StatsCard'
```

# src\components\shared\StatsCard\StatsCard.tsx:

```tsx
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
```

# src\components\shared\StatusBadge\index.ts:

```ts
export { StatusBadge } from './StatusBadge'
```

# src\components\shared\StatusBadge\StatusBadge.tsx:

```tsx
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
```

# src\context\AccessibilityContext.tsx:

```tsx
'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  fontSizePercent: number
  increaseFont: () => void
  decreaseFont: () => void
  resetAccessibility: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSizePercent, setFontSizePercent] = useState(100)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const storedContrast = localStorage.getItem('high-contrast')
      const storedFontSize = localStorage.getItem('font-size-percent')

      if (storedContrast === 'true') setHighContrast(true)
      if (storedFontSize) setFontSizePercent(parseInt(storedFontSize, 10))
    }
  }, [])

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const html = document.documentElement

      if (highContrast) {
        html.setAttribute('data-high-contrast', 'true')
        localStorage.setItem('high-contrast', 'true')
        // Force a re-render by adding/removing a class
        document.body.classList.add('high-contrast-active')
      } else {
        html.removeAttribute('data-high-contrast')
        localStorage.setItem('high-contrast', 'false')
        document.body.classList.remove('high-contrast-active')
      }

      html.style.fontSize = `${fontSizePercent}%`
      localStorage.setItem('font-size-percent', fontSizePercent.toString())
    }
  }, [highContrast, fontSizePercent])

  const toggleHighContrast = () => setHighContrast((prev) => !prev)

  const increaseFont = () => {
    setFontSizePercent((prev) => Math.min(prev + 10, 150))
  }

  const decreaseFont = () => {
    setFontSizePercent((prev) => Math.max(prev - 10, 80))
  }

  const resetAccessibility = () => {
    setHighContrast(false)
    setFontSizePercent(100)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSizePercent,
        increaseFont,
        decreaseFont,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
```

# src\db\drizzle.ts:

```ts
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import { schema } from './schema'
import ws from 'ws'

config({ path: '.env' })

neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const db = drizzle(pool, { schema })
```

# src\db\schema.ts:

```ts
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)],
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)],
)

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const schema = {
  user,
  session,
  account,
  verification,
}
```

# src\features\consultations\hooks\useProjectComments.ts:

```ts
'use client'

import { useState } from 'react'
import { PreConsultationProject, Comment } from '@/types'

export function useProjectComments(initialProjects: PreConsultationProject[]) {
  const [projects, setProjects] = useState(initialProjects)

  const addComment = (projectId: string, content: string, rating: number) => {
    const newComment: Comment = {
      id: `${projectId}-${Date.now()}`,
      author: 'Bieżący użytkownik',
      content,
      date: new Date().toISOString(),
      rating: rating || undefined,
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              comments: [...project.comments, newComment],
              ratingsCount: rating ? project.ratingsCount + 1 : project.ratingsCount,
              averageRating: rating
                ? (project.averageRating * project.ratingsCount + rating) /
                  (project.ratingsCount + 1)
                : project.averageRating,
            }
          : project,
      ),
    )

    return newComment
  }

  const rateProject = (projectId: string, rating: number, review?: string) => {
    if (review) {
      addComment(projectId, review, rating)
    } else {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                ratingsCount: project.ratingsCount + 1,
                averageRating:
                  (project.averageRating * project.ratingsCount + rating) /
                  (project.ratingsCount + 1),
              }
            : project,
        ),
      )
    }
  }

  return {
    projects,
    addComment,
    rateProject,
  }
}
```

# src\features\home\components\ActsTab.tsx:

```tsx
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
```

# src\features\home\components\ConsultationsTab.tsx:

```tsx
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
```

# src\features\home\components\HomeCard.module.css:

```css
.card {
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, background-color 0.2s ease;
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  background-color: var(--mantine-primary-color-light);
  transform: translateY(-4px);
}
```

# src\features\home\components\HomeSearch.tsx:

```tsx
'use client'

import { Box, Title, Text, rem } from '@mantine/core'
import { SearchInput } from '@/components/shared'

interface HomeSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function HomeSearch({ searchQuery, onSearchChange }: HomeSearchProps) {
  return (
    <Box ta="center" mb="xl">
      <Title order={1} mb="md" style={{ fontSize: rem(36) }}>
        Śledź prawo, zanim Cię zaskoczy
      </Title>
      <Text c="dimmed" mb="xl" size="lg" maw={600} mx="auto">
        Przeszukuj bazy ustaw, konsultacji i projektów w jednym miejscu.
      </Text>

      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Czego szukasz? Np. prawo budowlane..."
        size="xl"
      />
    </Box>
  )
}
```

# src\features\home\components\HomeTabs.tsx:

```tsx
'use client'

import { Tabs, Group, Button } from '@mantine/core'
import { IconMessageCircle, IconGavel, IconFileText, IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { ActsTab } from './ActsTab'
import { PreConsultationsTab } from './PreConsultationsTab'
import { ConsultationsTab } from './ConsultationsTab'
import { Act, PreConsultationProject } from '@/types'

interface HomeTabsProps {
  activeTab: string | null
  onTabChange: (value: string | null) => void
  actsData: Act[]
  prekonsultacjeData: PreConsultationProject[]
  konsultacjeData: any[]
  loading: boolean
  searchQuery: string
  onProjectClick: (project: PreConsultationProject) => void
}

export function HomeTabs({
  activeTab,
  onTabChange,
  actsData,
  prekonsultacjeData,
  konsultacjeData,
  loading,
  searchQuery,
  onProjectClick,
}: HomeTabsProps) {
  return (
    <>
      <Tabs value={activeTab} onChange={onTabChange} variant="default" keepMounted={false}>
        <Tabs.List grow mb="lg">
          <Tabs.Tab value="konsultacje" leftSection={<IconMessageCircle size={18} />}>
            Konsultacje (Aktywne)
          </Tabs.Tab>
          <Tabs.Tab value="ustawy" leftSection={<IconGavel size={18} />}>
            Nowe Ustawy
          </Tabs.Tab>
          <Tabs.Tab value="prekonsultacje" leftSection={<IconFileText size={18} />}>
            Prekonsultacje
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="ustawy">
          <ActsTab data={actsData} loading={loading} searchQuery={searchQuery} />
        </Tabs.Panel>

        <Tabs.Panel value="konsultacje">
          <ConsultationsTab data={konsultacjeData} loading={false} searchQuery={searchQuery} />
        </Tabs.Panel>

        <Tabs.Panel value="prekonsultacje">
          <PreConsultationsTab
            data={prekonsultacjeData}
            loading={false}
            onProjectClick={onProjectClick}
            searchQuery={searchQuery}
          />
        </Tabs.Panel>
      </Tabs>

      <Group justify="center" mt="xl">
        <Button
          variant="subtle"
          rightSection={<IconArrowRight size={16} />}
          component={Link}
          href={`/${activeTab}`}
        >
          Zobacz wszystkie {activeTab}
        </Button>
      </Group>
    </>
  )
}
```

# src\features\home\components\index.ts:

```ts
export { HomeSearch } from './HomeSearch'
export { HomeTabs } from './HomeTabs'
export { ActsTab } from './ActsTab'
export { PreConsultationsTab } from './PreConsultationsTab'
export { ConsultationsTab } from './ConsultationsTab'
```

# src\features\home\components\PreConsultationsTab.tsx:

```tsx
'use client'

import { PreConsultationProject } from '@/types'
import { ProjectGrid } from '@/components/projects'

interface PreConsultationsTabProps {
  data: PreConsultationProject[]
  loading: boolean
  onProjectClick: (project: PreConsultationProject) => void
  searchQuery?: string
}

export function PreConsultationsTab({
  data,
  loading,
  onProjectClick,
  searchQuery,
}: PreConsultationsTabProps) {
  return (
    <ProjectGrid
      projects={data.slice(0, 6)}
      isLoading={loading}
      onProjectClick={onProjectClick}
      emptyMessage={searchQuery ? `Nie znaleziono wyników dla "${searchQuery}"` : 'Brak projektów'}
    />
  )
}
```

# src\features\home\hooks\useHomeData.ts:

```ts
'use client'

import { useState, useEffect } from 'react'
import { fakeFetchUstawy, Act } from '@/mocks/sejmMock'
import { preConsultationProjects, consultationProjects } from '@/mocks/prekonsultacjeMock'

export function useHomeData(activeTab: string | null) {
  const [actsData, setActsData] = useState<Act[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      if (activeTab === 'ustawy') {
        setLoading(true)
        try {
          const response = await fakeFetchUstawy('DU', '2025', 1, 6)
          setActsData(response.items)
        } catch (error) {
          console.error('Błąd pobierania danych', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    loadData()
  }, [activeTab])

  return {
    actsData,
    prekonsultacjeData: preConsultationProjects,
    konsultacjeData: consultationProjects,
    loading,
  }
}
```

# src\features\home\hooks\useHomeSearch.ts:

```ts
'use client'

import { useState, useEffect } from 'react'
import { Act } from '@/types'
import { PreConsultationProject } from '@/types'

export function useHomeSearch(
  actsData: Act[],
  prekonsultacjeData: PreConsultationProject[],
  konsultacjeData: any[],
) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredActs, setFilteredActs] = useState(actsData)
  const [filteredPrekonsultacje, setFilteredPrekonsultacje] = useState(prekonsultacjeData)
  const [filteredKonsultacje, setFilteredKonsultacje] = useState(konsultacjeData)

  useEffect(() => {
    const query = searchQuery.toLowerCase()

    if (!query) {
      setFilteredActs(actsData)
      setFilteredPrekonsultacje(prekonsultacjeData)
      setFilteredKonsultacje(konsultacjeData)
      return
    }

    // Filter acts
    setFilteredActs(
      actsData.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.ELI.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query),
      ),
    )

    // Filter prekonsultacje
    setFilteredPrekonsultacje(
      prekonsultacjeData.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.institution.toLowerCase().includes(query),
      ),
    )

    // Filter konsultacje
    setFilteredKonsultacje(
      konsultacjeData.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.institution.toLowerCase().includes(query),
      ),
    )
  }, [searchQuery, actsData, prekonsultacjeData, konsultacjeData])

  return {
    searchQuery,
    setSearchQuery,
    filteredActs,
    filteredPrekonsultacje,
    filteredKonsultacje,
  }
}
```

# src\hooks\index.ts:

```ts
export { useSearch } from './useSearch'
export { useFilters } from './useFilters'
export { usePagination } from './usePagination'
export { useModal } from './useModal'
```

# src\hooks\useFilters.ts:

```ts
'use client'

import { useState, useMemo } from 'react'

interface UseFiltersOptions<T> {
  data: T[]
  filterFn: (item: T, filters: Record<string, string>) => boolean
}

export function useFilters<T>({ data, filterFn }: UseFiltersOptions<T>) {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const filteredData = useMemo(() => {
    const hasActiveFilters = Object.values(filters).some((value) => value && value !== 'all')

    if (!hasActiveFilters) return data
    return data.filter((item) => filterFn(item, filters))
  }, [data, filters, filterFn])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({})
  }

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredData,
  }
}
```

# src\hooks\useModal.ts:

```ts
'use client'

import { useState } from 'react'

export function useModal<T = unknown>() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const open = (modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData)
    }
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setData(null)
  }

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  }
}
```

# src\hooks\usePagination.ts:

```ts
'use client'

import { useState, useMemo } from 'react'

interface UsePaginationOptions<T> {
  data: T[]
  itemsPerPage?: number
}

export function usePagination<T>({ data, itemsPerPage = 10 }: UsePaginationOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return data.slice(start, end)
  }, [data, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const nextPage = () => goToPage(currentPage + 1)
  const prevPage = () => goToPage(currentPage - 1)
  const resetPage = () => setCurrentPage(1)

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}
```

# src\hooks\useSearch.ts:

```ts
'use client'

import { useState, useEffect, useMemo } from 'react'

interface UseSearchOptions<T> {
  data: T[]
  searchFields: (keyof T)[]
  delay?: number
}

export function useSearch<T>({ data, searchFields, delay = 300 }: UseSearchOptions<T>) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay])

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return data

    const lowerQuery = debouncedQuery.toLowerCase()
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field]
        return typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
      }),
    )
  }, [data, searchFields, debouncedQuery])

  return {
    query,
    setQuery,
    filteredData,
    isSearching: query !== debouncedQuery,
  }
}
```

# src\lib\auth-client.ts:

```ts
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  plugins: [],
})

export const { signIn, signOut, signUp, useSession } = authClient
```

# src\lib\auth.ts:

```ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db/drizzle'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [nextCookies()],
})
```

# src\lib\utils\index.ts:

```ts
export * from './validation'
export * from './filters'
export * from './sort'
```

# src\mocks\prekonsultacjeMock.ts:

```ts
export interface Comment {
  id: string
  author: string
  content: string
  date: string
  rating?: number
}

export interface PreConsultationProject {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'closed' | 'draft'
  deadline: string
  createdAt: string
  institution: string
  comments: Comment[]
  averageRating: number
  ratingsCount: number
  documentsCount: number
}

export const preConsultationProjects: PreConsultationProject[] = [
  {
    id: '1',
    title: 'Projekt ustawy o ochronie danych osobowych w sektorze publicznym',
    description:
      'Projekt ustawy mającej na celu wzmocnienie ochrony danych osobowych obywateli w instytucjach publicznych oraz wprowadzenie nowych standardów bezpieczeństwa informacji.',
    category: 'Ochrona danych',
    status: 'active',
    deadline: '2025-01-15',
    createdAt: '2024-11-01',
    institution: 'Ministerstwo Cyfryzacji',
    averageRating: 4.2,
    ratingsCount: 87,
    documentsCount: 3,
    comments: [
      {
        id: '1-1',
        author: 'Jan Kowalski',
        content:
          'Uważam, że projekt jest bardzo potrzebny, ale należałoby doprecyzować definicję "danych wrażliwych" w artykule 3.',
        date: '2024-12-01',
        rating: 4,
      },
      {
        id: '1-2',
        author: 'Anna Nowak',
        content:
          'Proponuję dodanie przepisów przejściowych dla małych gmin, które mogą mieć problemy z implementacją nowych wymogów technicznych.',
        date: '2024-12-03',
        rating: 5,
      },
      {
        id: '1-3',
        author: 'Piotr Wiśniewski',
        content:
          'Artykuł 15 dotyczący kar finansowych wydaje się zbyt surowy dla jednostek samorządu terytorialnego.',
        date: '2024-12-05',
        rating: 3,
      },
    ],
  },
  {
    id: '2',
    title: 'Nowelizacja ustawy o transporcie publicznym',
    description:
      'Projekt nowelizacji mający na celu usprawnienie systemu transportu publicznego w miastach oraz zwiększenie dostępności dla osób niepełnosprawnych.',
    category: 'Transport',
    status: 'active',
    deadline: '2025-02-28',
    createdAt: '2024-11-15',
    institution: 'Ministerstwo Infrastruktury',
    averageRating: 3.8,
    ratingsCount: 124,
    documentsCount: 5,
    comments: [
      {
        id: '2-1',
        author: 'Maria Zielińska',
        content:
          'Świetna inicjatywa! Szczególnie podoba mi się nacisk na dostępność dla osób niepełnosprawnych.',
        date: '2024-11-20',
        rating: 5,
      },
      {
        id: '2-2',
        author: 'Tomasz Lewandowski',
        content:
          'Czy przewidziano dodatkowe finansowanie dla mniejszych miast na implementację tych rozwiązań?',
        date: '2024-11-25',
        rating: 4,
      },
      {
        id: '2-3',
        author: 'Katarzyna Dąbrowska',
        content:
          'Warto rozważyć również ekologiczne aspekty transportu - może warto dodać zachęty dla pojazdów elektrycznych?',
        date: '2024-12-02',
        rating: 4,
      },
    ],
  },
  {
    id: '3',
    title: 'Ustawa o cyfryzacji usług administracyjnych',
    description:
      'Projekt kompleksowej ustawy wprowadzającej cyfrowe usługi administracyjne oraz upraszczającej procedury biurokratyczne dla obywateli i przedsiębiorców.',
    category: 'Cyfryzacja',
    status: 'draft',
    deadline: '2025-03-31',
    createdAt: '2024-12-01',
    institution: 'Ministerstwo Cyfryzacji',
    averageRating: 4.5,
    ratingsCount: 45,
    documentsCount: 2,
    comments: [
      {
        id: '3-1',
        author: 'Adam Kowalczyk',
        content:
          'Projekt bardzo potrzebny! Mam nadzieję, że rzeczywiście uprości życie przedsiębiorców.',
        date: '2024-12-04',
        rating: 5,
      },
      {
        id: '3-2',
        author: 'Beata Sikora',
        content: 'Czy przewidziano szkolenia dla urzędników z obsługi nowych systemów cyfrowych?',
        date: '2024-12-05',
        rating: 4,
      },
    ],
  },
  {
    id: '4',
    title: 'Projekt rozporządzenia w sprawie ochrony środowiska',
    description:
      'Nowe rozporządzenie mające na celu ograniczenie emisji zanieczyszczeń oraz wprowadzenie surowszych norm ekologicznych dla przemysłu.',
    category: 'Środowisko',
    status: 'closed',
    deadline: '2024-12-01',
    createdAt: '2024-09-15',
    institution: 'Ministerstwo Klimatu i Środowiska',
    averageRating: 3.9,
    ratingsCount: 203,
    documentsCount: 7,
    comments: [
      {
        id: '4-1',
        author: 'Michał Górski',
        content:
          'Normy są bardzo restrykcyjne, może warto wprowadzić okres przejściowy dla małych firm?',
        date: '2024-10-10',
        rating: 3,
      },
      {
        id: '4-2',
        author: 'Agnieszka Król',
        content: 'Doskonały projekt! Wreszcie konkretne działania na rzecz środowiska.',
        date: '2024-10-15',
        rating: 5,
      },
      {
        id: '4-3',
        author: 'Robert Pawlak',
        content: 'Czy przeprowadzono analizę wpływu na konkurencyjność polskich firm?',
        date: '2024-10-20',
        rating: 3,
      },
    ],
  },
]

export const consultationProjects = [
  {
    id: 'c1',
    title: 'Konsultacje ws. reformy systemu opieki zdrowotnej',
    description:
      'Szerokie konsultacje społeczne dotyczące planowanej reformy systemu opieki zdrowotnej w Polsce.',
    category: 'Zdrowie',
    status: 'active',
    deadline: '2025-04-30',
    createdAt: '2024-12-01',
    institution: 'Ministerstwo Zdrowia',
    participantsCount: 1250,
    documentsCount: 12,
    meetingsCount: 8,
  },
  {
    id: 'c2',
    title: 'Konsultacje reformy edukacji',
    description:
      'Konsultacje społeczne dotyczące zmian w systemie edukacji podstawowej i średniej.',
    category: 'Edukacja',
    status: 'active',
    deadline: '2025-05-15',
    createdAt: '2024-11-20',
    institution: 'Ministerstwo Edukacji i Nauki',
    participantsCount: 890,
    documentsCount: 8,
    meetingsCount: 12,
  },
  {
    id: 'c3',
    title: 'Konsultacje ws. polityki mieszkaniowej',
    description:
      'Konsultacje dotyczące nowych rozwiązań w polityce mieszkaniowej i wsparcia dla młodych rodzin.',
    category: 'Mieszkalnictwo',
    status: 'closed',
    deadline: '2024-11-30',
    createdAt: '2024-09-01',
    institution: 'Ministerstwo Rozwoju i Technologii',
    participantsCount: 2100,
    documentsCount: 15,
    meetingsCount: 20,
  },
]
```

# src\mocks\sejmMock.ts:

```ts
// src/mocks/sejmMock.ts

export interface Act {
  ELI: string
  title: string
  year: number
  pos: number
  status: string
  type: string
  publisher: string
  displayAddress: string
  announcementDate: string
  textPDF?: boolean
  textHTML?: boolean
}

export interface Stage {
  stepNumber: number
  name: string
  date: string | null
  isCompleted: boolean
}

export interface ActDetails extends Act {
  promulgation?: string
  entryIntoForce?: string
  stages: Stage[]
  keywords: string[]
  fullText?: string // DODANE – teraz TS wie, że istnieje
}

export interface ApiResponse {
  totalCount: number
  count: number
  offset: number
  items: Act[]
}

const isServer = typeof window === 'undefined'

function getBaseUrl() {
  if (!isServer) return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL
  return 'http://localhost:3000'
}

const API_BASE = `${getBaseUrl()}/api/proxy/eli`

export async function fakeFetchUstawy(
  publisher: string = 'DU',
  year: string = '2025',
  page: number = 1,
  limit: number = 20,
): Promise<ApiResponse> {
  const offset = (page - 1) * limit
  const params = new URLSearchParams({
    publisher,
    year,
    offset: offset.toString(),
    limit: limit.toString(),
    sortBy: 'pos',
    sortDir: 'desc',
  })

  const url = `${API_BASE}/acts/search?${params}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/json',
        Referer: 'https://eli.gov.pl/',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    return {
      totalCount: data.totalCount || 0,
      count: data.count || 0,
      offset: data.offset || 0,
      items: (data.items || []).map((item: any) => ({
        ELI: item.ELI,
        title: item.title,
        year: item.year,
        pos: item.pos,
        status: item.status || 'nieznany',
        type: item.type || 'Inny',
        publisher: item.publisher,
        displayAddress: item.displayAddress,
        announcementDate: item.announcementDate,
        textPDF: item.textPDF,
        textHTML: item.textHTML,
      })),
    }
  } catch (error) {
    console.error('Błąd listy ustaw:', error)
    return { totalCount: 0, count: 0, offset: 0, items: [] }
  }
}

export async function fakeFetchActDetails(eliId: string): Promise<ActDetails | null> {
  const decoded = decodeURIComponent(eliId)
  const parts = decoded.split('/')
  if (parts.length < 3) return null
  const [publisher, year, pos] = parts

  const url = `${API_BASE}/acts/${publisher}/${year}/${pos}`
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json',
        Referer: 'https://eli.gov.pl',
      },
      next: { revalidate: 3600 },
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    return {
      ...data,
      fullText: `Pełny tekst aktu prawnego ${data.displayAddress}\n\nTytuł: ${data.title}\n\nTreść dostępna w formacie PDF i HTML na stronie Sejmu RP.\n\nAI wkrótce przeanalizuje pełną treść!`,
      stages: [
        { stepNumber: 1, name: 'Data wydania', date: data.announcementDate, isCompleted: true },
        {
          stepNumber: 2,
          name: 'Data ogłoszenia',
          date: data.promulgation,
          isCompleted: !!data.promulgation,
        },
        { stepNumber: 3, name: 'Wejście w życie', date: data.entryIntoForce, isCompleted: true },
      ],
      keywords: data.keywords || [],
    }
  } catch (error) {
    console.error('Błąd szczegółów aktu:', eliId, error)
    return null
  }
}
```

# src\types\acts.ts:

```ts
export interface Act {
  ELI: string
  title: string
  year: number
  pos: number
  status: string
  type: string
  publisher: string
  displayAddress: string
  announcementDate: string
  promulgation?: string
  entryIntoForce?: string
  textPDF?: boolean
  textHTML?: boolean
}

export interface LegislativeStage {
  stepNumber: number
  name: string
  date?: string
  isCompleted: boolean
}

export interface ActDetails extends Act {
  stages: LegislativeStage[]
  keywords?: string[]
  summary?: string
}

export interface ActsApiResponse {
  totalCount: number
  count: number
  offset: number
  items: Act[]
}
```

# src\types\comments.ts:

```ts
export interface Comment {
  id: string
  author: string
  content: string
  date: string
  rating?: number
}

export interface CommentFormData {
  content: string
  rating: number
}
```

# src\types\common.ts:

```ts
export type Status = 'active' | 'closed' | 'draft' | 'planned'

export interface BaseProject {
  id: string
  title: string
  description: string
  category: string
  status: Status
  deadline: string
  createdAt: string
  institution: string
}
```

# src\types\consultations.ts:

```ts
import { BaseProject, Comment } from './index'

export interface PreConsultationProject extends BaseProject {
  comments: Comment[]
  averageRating: number
  ratingsCount: number
  documentsCount: number
}

export interface ConsultationProject extends BaseProject {
  participantsCount: number
  documentsCount: number
  meetingsCount: number
}

export interface Meeting {
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
```

# src\types\filters.ts:

```ts
export interface FilterOptions {
  status: string
  category: string
  searchQuery: string
}

export interface PaginationOptions {
  page: number
  limit: number
}
```

# src\types\index.ts:

```ts
export * from './common'
export * from './acts'
export * from './comments'
export * from './consultations'
export * from './filters'
```

# src\utils\constants.ts:

```ts
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  DRAFT: 'draft',
  PLANNED: 'planned',
} as const

export const STATUS_LABELS = {
  [PROJECT_STATUS.ACTIVE]: 'Aktywne',
  [PROJECT_STATUS.CLOSED]: 'Zakończone',
  [PROJECT_STATUS.DRAFT]: 'Projekt',
  [PROJECT_STATUS.PLANNED]: 'Planowane',
} as const

export const STATUS_COLORS = {
  [PROJECT_STATUS.ACTIVE]: 'green',
  [PROJECT_STATUS.CLOSED]: 'gray',
  [PROJECT_STATUS.DRAFT]: 'yellow',
  [PROJECT_STATUS.PLANNED]: 'blue',
} as const

export const MEETING_TYPES = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  HYBRID: 'hybrid',
} as const

export const MEETING_TYPE_LABELS = {
  [MEETING_TYPES.ONLINE]: 'Online',
  [MEETING_TYPES.OFFLINE]: 'Stacjonarnie',
  [MEETING_TYPES.HYBRID]: 'Hybrydowo',
} as const

export const MEETING_TYPE_COLORS = {
  [MEETING_TYPES.ONLINE]: 'blue',
  [MEETING_TYPES.OFFLINE]: 'green',
  [MEETING_TYPES.HYBRID]: 'violet',
} as const

export const ITEMS_PER_PAGE = {
  DEFAULT: 10,
  HOME: 6,
  TABLE: 20,
} as const
```

# src\utils\filters.ts:

```ts
import { PreConsultationProject, ConsultationProject, Status } from '@/types'

/**
 * Filtruje projekty według statusu
 */
export function filterByStatus<T extends { status: Status }>(items: T[], status: string): T[] {
  if (status === 'all') return items
  return items.filter((item) => item.status === status)
}

/**
 * Filtruje projekty według kategorii
 */
export function filterByCategory<T extends { category: string }>(
  items: T[],
  category: string,
): T[] {
  if (category === 'all') return items
  return items.filter((item) => item.category === category)
}

/**
 * Filtruje projekty według query
 */
export function filterBySearchQuery<T>(items: T[], query: string, fields: (keyof T)[]): T[] {
  if (!query) return items

  const lowerQuery = query.toLowerCase()
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field]
      return typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
    }),
  )
}
/**
 * Kombinuje wszystkie filtry dla projektów
 */
export function filterProjects<T extends PreConsultationProject | ConsultationProject>(
  projects: T[],
  filters: {
    status: string
    category: string
    searchQuery: string
  },
): T[] {
  let filtered = projects

  // Filter by status
  if (filters.status !== 'all') {
    filtered = filterByStatus(filtered, filters.status)
  }

  // Filter by category
  if (filters.category !== 'all') {
    filtered = filterByCategory(filtered, filters.category)
  }

  // Filter by search query
  if (filters.searchQuery) {
    filtered = filterBySearchQuery(filtered, filters.searchQuery, [
      'title',
      'description',
      'institution',
    ])
  }

  return filtered
}
```

# src\utils\format.ts:

```ts
/**
 * Formatuje datę do polskiego formatu
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('pl-PL', options)
}

/**
 * Formatuje datę do formatu ISO
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Sprawdza czy data jest przeszła
 */
export function isPastDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj < new Date()
}

/**
 * Sprawdza czy data jest przyszła
 */
export function isFutureDate(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj > new Date()
}

/**
 * Zwraca liczbę dni do daty
 */
export function daysUntil(date: string | Date): number {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = dateObj.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Formatuje liczbę z separatorem tysięcy
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('pl-PL')
}

/**
 * Zwraca inicjały z imienia i nazwiska
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

/**
 * Obcina tekst do określonej długości
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
```

# src\utils\index.ts:

```ts
export * from './constants'
export * from './format'
```

# src\utils\sort.ts:

```ts
/**
 * Sortuje projekty według daty
 */
export function sortByDate<T extends { createdAt: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc',
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

/**
 * Sortuje projekty według deadlinu
 */
export function sortByDeadline<T extends { deadline: string }>(
  items: T[],
  order: 'asc' | 'desc' = 'asc',
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.deadline).getTime()
    const dateB = new Date(b.deadline).getTime()
    return order === 'asc' ? dateA - dateB : dateB - dateA
  })
}

/**
 * Sortuje projekty według ratingu
 */
export function sortByRating<T extends { averageRating: number }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc',
): T[] {
  return [...items].sort((a, b) => {
    return order === 'asc' ? a.averageRating - b.averageRating : b.averageRating - a.averageRating
  })
}
```

# src\utils\validation.ts:

```ts
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
```

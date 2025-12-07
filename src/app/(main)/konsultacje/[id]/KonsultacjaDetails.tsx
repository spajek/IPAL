'use client'
import { useMemo } from 'react'
import { Container, Title, Button, Stack } from '@mantine/core'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'
import { ConsultationProject } from '@/types'
import { AISummaryGroq } from '@/components/ai/AISummaryGroq'
import { Tabs } from '@mantine/core'

interface Props {
  project: ConsultationProject
}

export default function KonsultacjaDetails({ project }: Props) {
  const consultationContent = useMemo(
    () =>
      `Konsultacje społeczne: ${project.title}. Instytucja: ${
        project.institution
      }. Termin: ${new Date(project.deadline).toLocaleDateString('pl-PL')}`,
    [project.title, project.institution, project.deadline],
  )

  return (
    <Container size="lg" py="xl">
      <Button
        component={Link}
        href="/konsultacje"
        variant="subtle"
        leftSection={<IconArrowLeft size={16} />}
        mb="lg"
      >
        ← Wróć do listy konsultacji
      </Button>

      <Title order={1} mb="md">
        {project.title}
      </Title>

      <Tabs defaultValue="summary" mt="xl">
        <Tabs.List>
          <Tabs.Tab value="summary">Streszczenie AI</Tabs.Tab>
          <Tabs.Tab value="details">Szczegóły</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="summary" pt="xl">
          <AISummaryGroq
            type="konsultacja"
            entityId={project.id}
            title={project.title}
            description={project.description}
            content={consultationContent}
          />
        </Tabs.Panel>

        <Tabs.Panel value="details" pt="xl">
          <Stack gap="md">
            <div>Instytucja: {project.institution}</div>
            <div>Termin zakończenia: {new Date(project.deadline).toLocaleDateString('pl-PL')}</div>
            <div>Uczestnicy: {project.participantsCount}</div>
            <div>Dokumenty: {project.documentsCount}</div>
            <div>Spotkania: {project.meetingsCount}</div>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Container>
  )
}

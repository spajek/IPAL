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

'use client'

import { useState, useMemo } from 'react'
import { Container, Title, Text, Stack } from '@mantine/core'
import { ProjectFilters, ProjectGrid } from '@/components/projects'
import { preConsultationProjects } from '@/mocks/prekonsultacjeMock'

export default function PrekonsultacjePage() {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  // Get unique categories
  const categories = useMemo(
    () => Array.from(new Set(preConsultationProjects.map((p) => p.category))),
    [],
  )

  // Filter projects
  const filteredProjects = useMemo(() => {
    return preConsultationProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || project.status === filterStatus
      const matchesCategory = filterCategory === 'all' || project.category === filterCategory

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [searchQuery, filterStatus, filterCategory])

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
          basePath="/prekonsultacje"
          emptyMessage="Nie znaleziono projektów spełniających kryteria wyszukiwania."
        />
      </Stack>
    </Container>
  )
}

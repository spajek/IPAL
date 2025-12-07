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

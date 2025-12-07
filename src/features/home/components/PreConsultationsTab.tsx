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

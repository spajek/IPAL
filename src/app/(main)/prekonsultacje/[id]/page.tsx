import React from 'react'
import { preConsultationProjects } from '@/mocks/prekonsultacjeMock'
import PrekonsultacjaDetails from './PrekonsultacjaDetails'
import PrekonsultacjaNotFound from './PrekonsultacjaNotFound'

interface PageProps {
  params: {
    id: string
  }
}

export default async function PrekonsultacjaDetailsPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params)

  const project = preConsultationProjects.find((p) => p.id === id)

  if (!project) {
    return <PrekonsultacjaNotFound id={id} />
  }

  return <PrekonsultacjaDetails project={project} />
}

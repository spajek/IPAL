import { consultationProjects } from '@/mocks/prekonsultacjeMock'
import KonsultacjaDetails from './KonsultacjaDetails'
import KonsultacjaNotFound from './KonsultacjaNotFound'

interface PageProps {
  params: {
    id: string
  }
}

export default async function KonsultacjaDetailsPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params)

  const project = consultationProjects.find((p) => p.id === id)

  if (!project) {
    return <KonsultacjaNotFound id={id} />
  }

  return <KonsultacjaDetails project={project} />
}

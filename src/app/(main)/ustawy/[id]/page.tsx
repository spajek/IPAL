import React from 'react'
import { fakeFetchActDetails } from '@/mocks/sejmMock'
import ActDetailsView from './ActDetailsView'
import ActNotFound from './ActNotFound'

interface PageProps {
  params: {
    id: string
  }
}

export default async function UstawaDetailsPage({ params }: PageProps) {
  const { id } = await Promise.resolve(params)

  const act = await fakeFetchActDetails(id)

  if (!act) {
    return <ActNotFound id={id} />
  }

  return <ActDetailsView act={act} />
}

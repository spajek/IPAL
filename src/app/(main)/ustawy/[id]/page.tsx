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

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

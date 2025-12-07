'use client'

import { Paper, Grid, TextInput, Select } from '@mantine/core'
import { IconSearch, IconFilter } from '@tabler/icons-react'

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  categories: string[]
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  categories,
}: ProjectFiltersProps) {
  return (
    <Paper p="md" shadow="sm" radius="md">
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            placeholder="Szukaj projektów..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            placeholder="Status"
            leftSection={<IconFilter size={16} />}
            data={[
              { value: 'all', label: 'Wszystkie' },
              { value: 'active', label: 'Aktywne' },
              { value: 'draft', label: 'Projekty' },
              { value: 'closed', label: 'Zakończone' },
            ]}
            value={statusFilter}
            onChange={(value) => onStatusChange(value || 'all')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            placeholder="Kategoria"
            leftSection={<IconFilter size={16} />}
            data={[
              { value: 'all', label: 'Wszystkie kategorie' },
              ...categories.map((cat) => ({ value: cat, label: cat })),
            ]}
            value={categoryFilter}
            onChange={(value) => onCategoryChange(value || 'all')}
          />
        </Grid.Col>
      </Grid>
    </Paper>
  )
}

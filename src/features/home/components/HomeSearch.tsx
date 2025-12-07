'use client'

import { Box, Title, Text, rem } from '@mantine/core'
import { SearchInput } from '@/components/shared'

interface HomeSearchProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function HomeSearch({ searchQuery, onSearchChange }: HomeSearchProps) {
  return (
    <Box ta="center" mb="xl">
      <Title order={1} mb="md" style={{ fontSize: rem(36) }}>
        Śledź prawo, zanim Cię zaskoczy
      </Title>
      <Text c="dimmed" mb="xl" size="lg" maw={600} mx="auto">
        Przeszukuj bazy ustaw, konsultacji i projektów w jednym miejscu.
      </Text>

      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Czego szukasz? Np. prawo budowlane..."
        size="xl"
      />
    </Box>
  )
}

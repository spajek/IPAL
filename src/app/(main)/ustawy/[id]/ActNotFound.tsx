'use client'

import Link from 'next/link'
import { Container, Title, Text, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

interface ActNotFoundProps {
  id: string
}

export default function ActNotFound({ id }: ActNotFoundProps) {
  const decodedId = decodeURIComponent(id)

  return (
    <Container py="xl" ta="center">
      <Title order={3} c="red" mb="md">
        Nie znaleziono aktu prawnego
      </Title>
      <Text c="dimmed" mb="lg">
        Identyfikator: {decodedId}
      </Text>
      <Button
        component={Link}
        href="/ustawy"
        variant="default"
        leftSection={<IconArrowLeft size={16} />}
      >
        Wróć do listy ustaw
      </Button>
    </Container>
  )
}

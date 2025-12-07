'use client'

import Link from 'next/link'
import { Container, Title, Text, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

interface ActNotFoundProps {
  id: string
}

export default function ActNotFound({ id }: ActNotFoundProps) {
  // Dekodowanie ID dla czytelności (np. DU%2F2025%2F1 -> DU/2025/1)
  const decodedId = decodeURIComponent(id)

  return (
    <Container py="xl" ta="center">
      <Title order={3} c="red" mb="md">
        Nie znaleziono aktu prawnego
      </Title>
      <Text c="dimmed" mb="lg">
        Identyfikator: {decodedId}
      </Text>
      {/* Tutaj 'component={Link}' zadziała poprawnie, 
        ponieważ jesteśmy w komponencie "use client" 
      */}
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

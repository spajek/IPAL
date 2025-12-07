'use client'

import Link from 'next/link'
import { Container, Title, Text, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

interface KonsultacjaNotFoundProps {
  id: string
}

export default function KonsultacjaNotFound({ id }: KonsultacjaNotFoundProps) {
  return (
    <Container py="xl" ta="center">
      <Title order={3} c="red" mb="md">
        Nie znaleziono konsultacji
      </Title>
      <Text c="dimmed" mb="lg">
        Identyfikator: {id}
      </Text>
      <Button
        component={Link}
        href="/konsultacje"
        variant="default"
        leftSection={<IconArrowLeft size={16} />}
      >
        Wróć do listy konsultacji
      </Button>
    </Container>
  )
}

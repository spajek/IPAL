'use client'

import Link from 'next/link'
import { Container, Title, Text, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

interface PrekonsultacjaNotFoundProps {
  id: string
}

export default function PrekonsultacjaNotFound({ id }: PrekonsultacjaNotFoundProps) {
  return (
    <Container py="xl" ta="center">
      <Title order={3} c="red" mb="md">
        Nie znaleziono prekonsultacji
      </Title>
      <Text c="dimmed" mb="lg">
        Identyfikator: {id}
      </Text>
      <Button
        component={Link}
        href="/prekonsultacje"
        variant="default"
        leftSection={<IconArrowLeft size={16} />}
      >
        Wróć do listy prekonsultacji
      </Button>
    </Container>
  )
}

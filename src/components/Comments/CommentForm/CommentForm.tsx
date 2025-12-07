'use client'

import { useState } from 'react'
import { Card, Text, Button, Textarea, Group, Rating, Stack } from '@mantine/core'

interface CommentFormProps {
  onSubmit: (content: string, rating: number) => void
  isSubmitting?: boolean
}

export function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)

  const handleSubmit = async () => {
    if (!content.trim()) return

    await onSubmit(content, rating)
    setContent('')
    setRating(0)
  }

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Text fw={600} mb="md">
        Dodaj komentarz
      </Text>

      <Stack>
        <Group>
          <Text size="sm">Twoja ocena:</Text>
          <Rating value={rating} onChange={setRating} />
        </Group>

        <Textarea
          placeholder="Napisz swój komentarz do tego projektu..."
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
          minRows={4}
          maxRows={8}
        />

        <Group justify="flex-end">
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            loading={isSubmitting}
          >
            Dodaj komentarz
          </Button>
        </Group>
      </Stack>
    </Card>
  )
}

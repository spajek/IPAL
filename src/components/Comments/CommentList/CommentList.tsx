'use client'

import { Stack, Text, Divider } from '@mantine/core'
import { Comment } from '@/types'
import { CommentItem } from '../CommentItem'

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <Text ta="center" c="dimmed" py="xl">
        Brak komentarzy. Bądź pierwszy!
      </Text>
    )
  }

  return (
    <>
      <Divider label={`Komentarze (${comments.length})`} labelPosition="left" />
      <Stack>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Stack>
    </>
  )
}

'use client'

import { useState } from 'react'
import { Stack } from '@mantine/core'
import { Comment } from '@/types'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

interface CommentsProps {
  comments: Comment[]
  onAddComment: (content: string, rating: number) => void
}

export function Comments({ comments, onAddComment }: CommentsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (content: string, rating: number) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API call
    onAddComment(content, rating)
    setIsSubmitting(false)
  }

  return (
    <Stack>
      <CommentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      <CommentList comments={comments} />
    </Stack>
  )
}

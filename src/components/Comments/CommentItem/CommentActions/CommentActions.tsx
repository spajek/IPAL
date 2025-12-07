'use client'

import { Group, Text, ActionIcon, Tooltip, Button } from '@mantine/core'
import { IconThumbUp, IconThumbDown, IconArrowBackUp } from '@tabler/icons-react'

interface CommentActionsProps {
  likes: number
  dislikes: number
  onLike: () => void
  onDislike: () => void
  onReply: () => void
}

export function CommentActions({
  likes,
  dislikes,
  onLike,
  onDislike,
  onReply,
}: CommentActionsProps) {
  return (
    <Group justify="space-between">
      <Group>
        <Tooltip label="Przydatny komentarz">
          <ActionIcon variant="subtle" color="green" onClick={onLike} size="sm">
            <IconThumbUp size={16} />
          </ActionIcon>
        </Tooltip>
        <Text size="xs" c="dimmed">
          {likes}
        </Text>

        <Tooltip label="Nieprzydatny komentarz">
          <ActionIcon variant="subtle" color="red" onClick={onDislike} size="sm">
            <IconThumbDown size={16} />
          </ActionIcon>
        </Tooltip>
        <Text size="xs" c="dimmed">
          {dislikes}
        </Text>
      </Group>

      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconArrowBackUp size={14} />}
        onClick={onReply}
      >
        Odpowiedz
      </Button>
    </Group>
  )
}

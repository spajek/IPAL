import { useState } from 'react';
import {
  Card,
  Text,
  Button,
  Textarea,
  Group,
  Avatar,
  Rating,
  Stack,
  Divider,
  Badge,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { IconThumbUp, IconThumbDown, IconArrowBackUp } from '@tabler/icons-react';
import { Comment } from '../../mocks/prekonsultacjeMock';

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string, rating: number) => void;
}

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [showReply, setShowReply] = useState(false);

  return (
    <Card shadow="sm" p="md" radius="md">
      <Group justify="space-between" mb="xs">
        <Group>
          <Avatar size={40} radius="xl" color="blue">
            {comment.author.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <Text fw={500} size="sm">{comment.author}</Text>
            <Text size="xs" c="dimmed">{new Date(comment.date).toLocaleDateString('pl-PL')}</Text>
          </div>
        </Group>
        {comment.rating && (
          <Badge variant="light" color="yellow">
            <Rating value={comment.rating} readOnly size="xs" />
          </Badge>
        )}
      </Group>
      
      <Text size="sm" mb="md">
        {comment.content}
      </Text>
      
      <Group justify="space-between">
        <Group>
          <Tooltip label="Przydatny komentarz">
            <ActionIcon
              variant="subtle"
              color="green"
              onClick={() => setLikes(likes + 1)}
              size="sm"
            >
              <IconThumbUp size={16} />
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">{likes}</Text>
          
          <Tooltip label="Nieprzydatny komentarz">
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => setDislikes(dislikes + 1)}
              size="sm"
            >
              <IconThumbDown size={16} />
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">{dislikes}</Text>
        </Group>
        
        <Button
          variant="subtle"
          size="xs"
          leftSection={<IconArrowBackUp size={14} />}
          onClick={() => setShowReply(!showReply)}
        >
          Odpowiedz
        </Button>
      </Group>
      
      {showReply && (
        <Card mt="md" p="sm" withBorder>
          <Text size="sm" c="dimmed">Funkcja odpowiedzi będzie dostępna wkrótce</Text>
        </Card>
      )}
    </Card>
  );
}

export function Comments({ comments, onAddComment }: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Symulacja API call
    
    onAddComment(newComment, rating);
    setNewComment('');
    setRating(0);
    setIsSubmitting(false);
  };

  return (
    <Stack>
      <Card shadow="sm" p="md" radius="md" withBorder>
        <Text fw={600} mb="md">Dodaj komentarz</Text>
        
        <Stack>
          <Group>
            <Text size="sm">Twoja ocena:</Text>
            <Rating value={rating} onChange={setRating} />
          </Group>
          
          <Textarea
            placeholder="Napisz swój komentarz do tego projektu..."
            value={newComment}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(event.currentTarget.value)}
            minRows={4}
            maxRows={8}
          />
          
          <Group justify="flex-end">
            <Button
              onClick={handleSubmit}
              disabled={!newComment.trim() || isSubmitting}
              loading={isSubmitting}
            >
              Dodaj komentarz
            </Button>
          </Group>
        </Stack>
      </Card>

      <Divider label={`Komentarze (${comments.length})`} labelPosition="left" />
      
      <Stack>
        {comments.length === 0 ? (
          <Text ta="center" c="dimmed" py="xl">
            Brak komentarzy. Bądź pierwszy!
          </Text>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </Stack>
    </Stack>
  );
}
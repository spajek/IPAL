'use client'

import Link from 'next/link'
import { Card, Text, Stack, Button } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'
import { PreConsultationProject } from '@/types'
import { ProjectCardHeader } from './ProjectCardHeader'
import { ProjectCardInfo } from './ProjectCardInfo'
import classes from './ProjectCard.module.css'

interface ProjectCardProps {
  project: PreConsultationProject
  basePath?: string
}

export function ProjectCard({ project, basePath = '/prekonsultacje' }: ProjectCardProps) {
  return (
    <Card padding="lg" withBorder className={classes.card}>
      <Stack justify="space-between" h="100%">
        <div>
          <ProjectCardHeader status={project.status} category={project.category} />

          <Text fw={600} size="md" mb="xs" lineClamp={2}>
            {project.title}
          </Text>

          <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
            {project.description}
          </Text>

          <ProjectCardInfo
            institution={project.institution}
            deadline={project.deadline}
            averageRating={project.averageRating}
            ratingsCount={project.ratingsCount}
            commentsCount={project.comments.length}
            documentsCount={project.documentsCount}
            showAIBadge={project.comments.length > 0}
          />
        </div>

        <Button
          component={Link}
          href={`${basePath}/${project.id}`}
          variant="default"
          fullWidth
          leftSection={<IconEye size={16} />}
        >
          Zobacz szczegóły
        </Button>
      </Stack>
    </Card>
  )
}

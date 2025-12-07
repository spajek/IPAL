'use client'

import { useState } from 'react'
import { PreConsultationProject, Comment } from '@/types'

export function useProjectComments(initialProjects: PreConsultationProject[]) {
  const [projects, setProjects] = useState(initialProjects)

  const addComment = (projectId: string, content: string, rating: number) => {
    const newComment: Comment = {
      id: `${projectId}-${Date.now()}`,
      author: 'Bieżący użytkownik',
      content,
      date: new Date().toISOString(),
      rating: rating || undefined,
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              comments: [...project.comments, newComment],
              ratingsCount: rating ? project.ratingsCount + 1 : project.ratingsCount,
              averageRating: rating
                ? (project.averageRating * project.ratingsCount + rating) /
                  (project.ratingsCount + 1)
                : project.averageRating,
            }
          : project,
      ),
    )

    return newComment
  }

  const rateProject = (projectId: string, rating: number, review?: string) => {
    if (review) {
      addComment(projectId, review, rating)
    } else {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                ratingsCount: project.ratingsCount + 1,
                averageRating:
                  (project.averageRating * project.ratingsCount + rating) /
                  (project.ratingsCount + 1),
              }
            : project,
        ),
      )
    }
  }

  return {
    projects,
    addComment,
    rateProject,
  }
}

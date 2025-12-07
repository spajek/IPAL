import { BaseProject, Comment } from './index'

export interface PreConsultationProject extends BaseProject {
  comments: Comment[]
  averageRating: number
  ratingsCount: number
  documentsCount: number
}

export interface ConsultationProject extends BaseProject {
  participantsCount: number
  documentsCount: number
  meetingsCount: number
}

export interface Meeting {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: 'online' | 'offline' | 'hybrid'
  maxParticipants?: number
  registeredParticipants: number
  description: string
}

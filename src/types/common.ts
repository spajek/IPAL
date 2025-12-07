export type Status = 'active' | 'closed' | 'draft' | 'planned'

export interface BaseProject {
  id: string
  title: string
  description: string
  category: string
  status: Status
  deadline: string
  createdAt: string
  institution: string
}

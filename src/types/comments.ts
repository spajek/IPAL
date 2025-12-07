export interface Comment {
  id: string
  author: string
  content: string
  date: string
  rating?: number
}

export interface CommentFormData {
  content: string
  rating: number
}

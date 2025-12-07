export interface Act {
  ELI: string
  title: string
  year: number
  pos: number
  status: string
  type: string
  publisher: string
  displayAddress: string
  announcementDate: string
  promulgation?: string
  entryIntoForce?: string
  textPDF?: boolean
  textHTML?: boolean
}

export interface LegislativeStage {
  stepNumber: number
  name: string
  date?: string
  isCompleted: boolean
}

export interface ActDetails extends Act {
  stages: LegislativeStage[]
  keywords?: string[]
  summary?: string
}

export interface ActsApiResponse {
  totalCount: number
  count: number
  offset: number
  items: Act[]
}

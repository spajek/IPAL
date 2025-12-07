export const PROJECT_STATUS = {
  ACTIVE: 'active',
  CLOSED: 'closed',
  DRAFT: 'draft',
  PLANNED: 'planned',
} as const

export const STATUS_LABELS = {
  [PROJECT_STATUS.ACTIVE]: 'Aktywne',
  [PROJECT_STATUS.CLOSED]: 'Zakończone',
  [PROJECT_STATUS.DRAFT]: 'Projekt',
  [PROJECT_STATUS.PLANNED]: 'Planowane',
} as const

export const STATUS_COLORS = {
  [PROJECT_STATUS.ACTIVE]: 'green',
  [PROJECT_STATUS.CLOSED]: 'gray',
  [PROJECT_STATUS.DRAFT]: 'yellow',
  [PROJECT_STATUS.PLANNED]: 'blue',
} as const

export const MEETING_TYPES = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  HYBRID: 'hybrid',
} as const

export const MEETING_TYPE_LABELS = {
  [MEETING_TYPES.ONLINE]: 'Online',
  [MEETING_TYPES.OFFLINE]: 'Stacjonarnie',
  [MEETING_TYPES.HYBRID]: 'Hybrydowo',
} as const

export const MEETING_TYPE_COLORS = {
  [MEETING_TYPES.ONLINE]: 'blue',
  [MEETING_TYPES.OFFLINE]: 'green',
  [MEETING_TYPES.HYBRID]: 'violet',
} as const

export const ITEMS_PER_PAGE = {
  DEFAULT: 10,
  HOME: 6,
  TABLE: 20,
} as const

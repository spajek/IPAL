// src/mocks/sejmMock.ts

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
  textPDF?: boolean
  textHTML?: boolean
}

export interface ApiResponse {
  totalCount: number
  count: number
  offset: number
  items: Act[]
}

// KLUCZOWA ZMIANA: sprawdzamy, czy jesteśmy na serwerze czy kliencie
const isServer = typeof window === 'undefined'

/**
 * Zwraca pełny URL do proxy – działa i na kliencie i na serwerze
 */
function getBaseUrl() {
  if (!isServer) return '' // na kliencie – zwracamy pusty, bo fetch sam dorzuci origin
  // na serwerze – musimy podać pełny adres
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXT_PUBLIC_URL) return process.env.NEXT_PUBLIC_URL
  return 'http://localhost:3000' // domyślnie w dev
}

const API_BASE = `${getBaseUrl()}/api/proxy/eli`

// Lista ustaw – używamy /acts/search (działa!)
export async function fakeFetchUstawy(
  publisher: string = 'DU',
  year: string = '2025',
  page: number = 1,
  limit: number = 20,
): Promise<ApiResponse> {
  const offset = (page - 1) * limit

  const params = new URLSearchParams({
    publisher,
    year,
    offset: offset.toString(),
    limit: limit.toString(),
    sortBy: 'pos',
    sortDir: 'desc',
  })

  const url = `${API_BASE}/acts/search?${params}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/json',
        Referer: 'https://eli.gov.pl/',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    return {
      totalCount: data.totalCount || 0,
      count: data.count || 0,
      offset: data.offset || 0,
      items: (data.items || []).map((item: any) => ({
        ELI: item.ELI,
        title: item.title,
        year: item.year,
        pos: item.pos,
        status: item.status || 'nieznany',
        type: item.type || 'Inny',
        publisher: item.publisher,
        displayAddress: item.displayAddress,
        announcementDate: item.announcementDate,
        textPDF: item.textPDF,
        textHTML: item.textHTML,
      })),
    }
  } catch (error) {
    console.error('Błąd listy ustaw:', error)
    return { totalCount: 0, count: 0, offset: 0, items: [] }
  }
}

// Szczegóły aktu – działa i na serwerze i kliencie
export async function fakeFetchActDetails(eliId: string): Promise<any | null> {
  const decoded = decodeURIComponent(eliId)
  const parts = decoded.split('/')
  if (parts.length < 3) return null

  const [publisher, year, pos] = parts

  // Pełny URL – działa wszędzie
  const url = `${API_BASE}/acts/${publisher}/${year}/${pos}`

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/json',
        Referer: 'https://eli.gov.pl/',
      },
      next: { revalidate: 3600 },
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    // Dodajemy pola, których oczekuje ActDetailsView
    return {
      ...data,
      stages: [
        { stepNumber: 1, name: 'Data wydania', date: data.announcementDate, isCompleted: true },
        {
          stepNumber: 2,
          name: 'Data ogłoszenia',
          date: data.promulgation,
          isCompleted: !!data.promulgation,
        },
        { stepNumber: 3, name: 'Wejście w życie', date: data.entryIntoForce, isCompleted: true },
      ],
      keywords: data.keywords || [],
    }
  } catch (error) {
    console.error('Błąd szczegółów aktu:', eliId, error)
    return null
  }
}

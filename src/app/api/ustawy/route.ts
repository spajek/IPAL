import { NextResponse } from 'next/server'

const API_BASE = 'https://api.sejm.gov.pl/eli'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const url = `${API_BASE}/acts/search?${searchParams.toString()}`

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'Next.js Server',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Sejm API error' }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}

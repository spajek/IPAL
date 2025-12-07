// src/app/api/proxy/eli/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server'

const API_BASE = 'https://api.sejm.gov.pl/eli'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const resolvedParams = await params
  const path = resolvedParams.path.join('/')
  const searchParams = request.nextUrl.searchParams.toString()

  const targetUrl = `${API_BASE}/${path}${searchParams ? `?${searchParams}` : ''}`

  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        // KLUCZOWE NAGŁÓWKI – bez nich Sejm zwraca 403
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        Referer: 'https://eli.gov.pl/',
        Origin: 'https://eli.gov.pl',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      },
      // ważne – Next.js domyślnie dodaje swoje nagłówki, które mogą być wykrywane
      // wyłączenie cache na poziomie fetch, bo i tak mamy revalidate
      next: { revalidate: 3600 },
    })

    // Kopiujemy wszystkie nagłówki odpowiedzi (w tym Content-Encoding dla gzip)
    const headers = new Headers(res.headers)
    // Usuwamy potencjalnie problematyczne nagłówki Next.js
    headers.delete('transfer-encoding')

    if (!res.ok) {
      console.error(`Sejm API Error: ${res.status} ${res.statusText} | URL: ${targetUrl}`)
      return NextResponse.json(
        { error: `Sejm API Error: ${res.status} ${res.statusText}` },
        { status: res.status },
      )
    }

    const data = await res.json()
    return NextResponse.json(data, { headers })
  } catch (error) {
    console.error('Proxy fetch error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || 'http://localhost:3000'

export async function GET() {
  const response = await fetch(`${BACKEND_BASE_URL}/api/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: Request) {
  const { title, description, isbn } = await request.json();

  const response = await fetch(`${BACKEND_BASE_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, isbn }),
  })
  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function PUT(request: Request) {
  const { id, title, description, isbn } = await request.json();

  const response = await fetch(`${BACKEND_BASE_URL}/api/books`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, title, description, isbn }),
  })
  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const response = await fetch(`${BACKEND_BASE_URL}/api/books/${encodeURI(id)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
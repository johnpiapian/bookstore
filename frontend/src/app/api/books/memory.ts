const books = [
  {
    id: Date.now().toString(),
    title: 'The Great Gatsby',
    description: 'A novel written by American author F. Scott Fitzgerald.',
    isbn: '9780743273565',
  },
  {
    id: (Date.now() + 1).toString(),
    title: 'To Kill a Mockingbird',
    description: 'A novel by Harper Lee published in 1960.',
    isbn: '9780061120084',
  },
  {
    id: (Date.now() + 2).toString(),
    title: '1984',
    description: 'A dystopian social science fiction novel by George Orwell.',
    isbn: '9780451524935',
  },
];

export async function GET() {
  return new Response(JSON.stringify(books), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  const { title, description, isbn } = await request.json();

  const newBook = {
    id: (Date.now()).toString(),
    title,
    description,
    isbn,
  }

  books.push(newBook);

  return new Response(JSON.stringify(newBook), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request: Request) {
  const { id, title, description, isbn } = await request.json();

  const book = books.find((book) => book.id === id);
  if (book) {
    book.title = title;
    book.description = description;
    book.isbn = isbn;

    return new Response(JSON.stringify(book), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Book not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    return new Response(JSON.stringify({ message: 'Book deleted successfully' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: 'Book not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
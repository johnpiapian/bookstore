'use client'
import { useEffect, useMemo, useState } from 'react'

import { Book } from '@/lib/types'
import BookItem from '@/components/BookItem'
import BookItemAction from '@/components/BookItemAction'
import BookForm, { BookFormType } from '@/components/BookForm'
import Modal from '@/components/Modal'

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successfulMessage, setSuccessfulMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [type, setType] = useState<BookFormType>(BookFormType.ADD)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const fetchBooks = useMemo(() => {
    return async () => {
      setIsLoading(true)
      const response = await fetch('/api/books')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data: Book[] = await response.json()
      setBooks(data)
      setIsLoading(false)
    }
  }, [])

  const addBook = useMemo(() => {
    return async (newBook: Book) => {
      setIsLoading(true)
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const createdBook: Book = await response.json()
      setBooks((prevBooks) => [...prevBooks, createdBook])
      setIsLoading(false)
    }
  }, [])

  const updateBook = useMemo(() => {
    return async (updatedBook: Book) => {
      setIsLoading(true)
      const response = await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      )
      setIsLoading(false)
    }
  }, [])

  const deleteBook = useMemo(() => {
    return async (id: string) => {
      setIsLoading(true)
      const response = await fetch('/api/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBooks().catch((error) => console.error('Error fetching books:', error))
  }, [])

  const handleOnAdd = () => {
    setType(BookFormType.ADD)
    setIsModalOpen(true)
  }

  const handleOnEdit = (id: string) => {
    setType(BookFormType.EDIT)
    const bookToEdit = books.find((book) => book.id === id) || null
    setSelectedBook(bookToEdit)
    setIsModalOpen(true)
  }

  const handleOnDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return
    await deleteBook(id).catch((error) => console.error('Error deleting book:', error))
  }

  const onModalClose = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <section className="w-full">
          <div className="mb-8 text-center">
            <>
              <h1 className="text-2xl font-semibold">
                {type === BookFormType.ADD ? 'Add Book' : 'Edit Book'}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {type === BookFormType.ADD
                  ? 'Fill out the form below to add a book to the catalog.'
                  : selectedBook
                    ? 'Make changes to the book details and submit to save.'
                    : 'Loading book details…'}
              </p>

              {type === BookFormType.EDIT && selectedBook && (
                <p className="mt-1 text-xs text-gray-400">Book ID: {selectedBook.id}</p>
              )}

              {successfulMessage && (
                <p className="mt-4 text-green-600">
                  {successfulMessage}
                </p>
              )}

              {errorMessage && (
                <p className="mt-4 text-red-600">
                  {errorMessage}
                </p>
              )}
            </>
          </div>
          <BookForm
            type={type}
            prefilledData={selectedBook ?? undefined}
            appState={{ isLoading }}
            onSubmit={async (book) => {
              setSuccessfulMessage(null)
              setErrorMessage(null)
              try {
                if (type === BookFormType.ADD) {
                  await addBook(book)
                  setSuccessfulMessage('Book added successfully!')
                } else if (type === BookFormType.EDIT) {
                  await updateBook(book)
                  setSuccessfulMessage('Book updated successfully!')
                }
              } catch (error) {
                console.error('Error submitting form:', error)
                setErrorMessage('Error submitting form.')
              }

              setTimeout(() => {
                setIsModalOpen(false)
                setSelectedBook(null)
              }, 1000)
            }}
          />
        </section>
      </Modal>
      <section className="mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleOnAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add book
            </button>
          </div>
          {books.map((book) => (
            <div key={book.id} className="border p-2 my-2 rounded dark:border-gray-600">
              <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                description={book.description}
                isbn={book.isbn}
              />
              <BookItemAction
                id={book.id}
                onEdit={handleOnEdit}
                onDelete={handleOnDelete}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
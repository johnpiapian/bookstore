'use client'
import { useEffect, useState } from 'react'
import { Book } from '@/lib/types'
import Form from 'next/form'

export type BookFormProps = {
  type: BookFormType
  prefilledData?: Book
  appState: {
    isLoading: boolean
  }
  onSubmit: (book: Book) => void
}

export enum BookFormType {
  ADD = 'add',
  EDIT = 'edit',
}

type DisplayInfo = {
  title: string
  buttonText: string
  loadingButtonText: string
}

const bookFormTypeToDisplayInfoMap: Record<BookFormType, DisplayInfo> = {
  [BookFormType.ADD]: { title: 'Add a New Book', buttonText: 'Add Book', loadingButtonText: 'Adding Book...' },
  [BookFormType.EDIT]: { title: 'Edit Book', buttonText: 'Save Changes', loadingButtonText: 'Saving Changes...' },
}

function getDisplayInfo(type: BookFormType) {
  return bookFormTypeToDisplayInfoMap[type] || { title: '', buttonText: '', loadingButtonText: '' }
}

export default function BookForm(props: BookFormProps) {
  const { type, prefilledData, appState, onSubmit } = props

  const [prevPrefilledData, setPrevPrefilledData] = useState<Book | undefined>(prefilledData)
  const [id, setId] = useState(prefilledData?.id || '')
  const [title, setTitle] = useState(prefilledData?.title || '')
  const [description, setDescription] = useState(prefilledData?.description || '')
  const [isbn, setIsbn] = useState(prefilledData?.isbn || '')

  if (prefilledData && prefilledData !== prevPrefilledData) {
    setPrevPrefilledData(prefilledData)
    setId(prefilledData.id)
    setTitle(prefilledData.title)
    setDescription(prefilledData.description)
    setIsbn(prefilledData.isbn)
  }

  const clearForm = () => {
    setId('')
    setTitle('')
    setDescription('')
    setIsbn('')
  }

  return (
    <Form 
      action=""
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ id, title, description, isbn })
        if (type === BookFormType.ADD) clearForm()
      }}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4"
    >
      {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        {getDisplayInfo(type).title}
      </h2> */}

      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Title</label>
        <input
          id='title'
          type="text"
          name="title"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          pattern=".*\S.*"
          disabled={appState.isLoading}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Description</label>
        <input
          id='description'
          type="text"
          name="description"
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          pattern=".*\S.*"
          disabled={appState.isLoading}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="isbn" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">ISBN Number</label>
        <input
          id='isbn'
          type="text"
          name="isbn"
          placeholder="ISBN Number"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          pattern=".*\S.*"
          disabled={appState.isLoading}
          required
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
      >
        {appState.isLoading ? getDisplayInfo(type).loadingButtonText : getDisplayInfo(type).buttonText}
      </button>
    </Form>
  )
}
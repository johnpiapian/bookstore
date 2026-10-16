import { Document, Types } from 'mongoose'

export type Book = {
  id?: string
  title: string
  description: string
  isbn: string
} & Document<Types.ObjectId>

export type BookData = Pick<Book, 'title' | 'description' | 'isbn'>

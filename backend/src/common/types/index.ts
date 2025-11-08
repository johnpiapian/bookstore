import { Document, Types } from 'mongoose'

export interface Book extends Document<Types.ObjectId> {
  id?: string
  title: string
  description: string
  isbn: string
}
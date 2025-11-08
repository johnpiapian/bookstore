import { CustomException, NotFoundException } from 'src/common/CustomException'
import bookRepository from './book.repository'
import { Book } from 'src/common/types'

class bookService {
  constructor(readonly repo: typeof bookRepository) {}

  async getAllBooks(): Promise<Book[]> {
    const books = await this.repo.findAllBooks()
    return books
  }

  async getBookById(id: string): Promise<Book> {
    const book = await this.repo.findBookById(id)

    if (!book) {
      throw new NotFoundException('Book not found')
    }

    return book
  }

  async createBook(data: {
    title: string
    description: string
    isbn: string
  }): Promise<Book> {
    const existingBook = await this.repo.findBookByIsbn(data.isbn)

    if (existingBook) {
      throw new CustomException('Book with this ISBN already exists')
    }

    const newBook = await this.repo.createBook(data as Book)
    return newBook
  }

  async updateBook(data: { id: string } & Partial<Book>): Promise<Book> {
    const updatedBook = await this.repo.updateBook(data.id, data)

    if (!updatedBook) {
      throw new CustomException('Failed to update book')
    }

    const book = await this.repo.findBookById(data.id)
    if (!book) {
      throw new NotFoundException('Book not found after update')
    }

    return book
  }

  async deleteBook(id: string): Promise<Book> {
    const deleted = await this.repo.deleteBook(id)
    if (!deleted) {
      throw new NotFoundException('Book not found')
    }

    return deleted
  }
}

const service = new bookService(bookRepository)
export default service

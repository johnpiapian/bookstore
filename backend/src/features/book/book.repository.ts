import mongoose from 'mongoose'
import { Book } from '../../common/types'

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isbn: { type: String, required: true, unique: true }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

bookSchema.virtual('id').get(function(this: Book) {
  return this._id.toHexString()
})

const BookEntity = mongoose.model<Book>('book', bookSchema)

class BookRepository {
  constructor(
    readonly BookEntity: mongoose.Model<Book>
  ) { }

  async findAllBooks(): Promise<Book[]> {
    const books = await this.BookEntity.find().exec()
    return books
  }

  async findBookById(id: string): Promise<Book | null> {
    const book = await this.BookEntity.findById(id).exec()
    return book
  }

  async findBookByIsbn(isbn: string): Promise<Book | null> {
    const book = await this.BookEntity.findOne({ isbn }).exec()
    return book
  }

  async createBook(bookData: Book): Promise<Book> {
    const newBook = new this.BookEntity(bookData)
    return await newBook.save()
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<boolean> {
    const result = await this.BookEntity.updateOne(
      { _id: id },
      {
        $set: {
          title: bookData.title,
          description: bookData.description,
          isbn: bookData.isbn
        }
      }).exec()

    return result.modifiedCount > 0
  }

  async deleteBook(id: string): Promise<Book | null> {
    const deletedBook = await this.BookEntity.findByIdAndDelete(id).exec()
    return deletedBook
  }
}

const bookRepository = new BookRepository(BookEntity)
export default bookRepository
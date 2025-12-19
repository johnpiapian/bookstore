import { Request, Response, Router } from 'express'
import bookService from './book.service'
import { CustomException } from 'src/common/CustomException'

const router = Router()

router.get('/', async (_: Request, res: Response) => {
  const books = await bookService.getAllBooks()
  res.status(200).json(books)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    new CustomException('Book ID is required')
    return
  }

  const book = await bookService.getBookById(id)
  return res.status(200).json(book)
})

router.post('/', async (req: Request, res: Response) => {
  if (!req.body?.title || !req.body?.description || !req.body?.isbn) {
    new CustomException('Invalid book data')
    return
  }

  const { title, description, isbn } = req.body
  const createdBook = await bookService.createBook({ title, description, isbn })
  return res.status(201).json(createdBook)
})

router.put('/', async (req: Request, res: Response) => {
  const { id, title, description, isbn } = req.body

  if (!id || !title || !description || !isbn) {
    new CustomException('Invalid book data')
    return
  }

  const updatedBook = await bookService.updateBook({
    id,
    title,
    description,
    isbn,
  })
  return res.status(200).json(updatedBook)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    new CustomException('Book ID is required')
    return
  }

  await bookService.deleteBook(id)
  return res.status(200).json({ message: 'Book deleted successfully' })
})

export default router

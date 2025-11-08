import { NextFunction, Request, Response } from 'express'
import { CustomException, HttpException } from './CustomException'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error('Error occurred:', error)

  if (error instanceof HttpException) {
    response.status(error.status).send({
      status: error.status,
      message: error.message,
      ...(Object.keys(error.error).length > 0 && { error: error.error }),
    })
    return
  }

  if (error instanceof CustomException) {
    response.status(error.status).send({
      status: error.status,
      message: error.message,
      ...(Object.keys(error.error).length > 0 && { error: error.error }),
    })
    return
  }

  // Fallback for unhandled errors
  response.status(500).send({
    status: 500,
    message: 'Internal Server Error',
  })
}

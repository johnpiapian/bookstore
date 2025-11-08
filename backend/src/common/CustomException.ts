export enum ErrorStatus {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorName {
  CUSTOM_EXCEPTION = 'CustomException',
  ALREADY_EXISTS = 'AlreadyExistsException',
}

export class HttpException extends Error {
  status: number
  error: object
  constructor(status: number, message: string, error?: {}) {
    super(message)
    this.status = status
    this.error = error || {}
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Not Found', error?: {}) {
    super(404, message, error)
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', error?: {}) {
    super(400, message, error)
  }
}

export class InternalServerException extends HttpException {
  constructor(message: string = 'Internal Server Error', error?: {}) {
    super(500, message, error)
  }
}

export class CustomException extends Error {
  error: object
  status: number
  constructor(message: string, status?: number, error?: {}) {
    super(message)
    this.name = ErrorName.CUSTOM_EXCEPTION
    this.error = error || {}
    this.status = status || ErrorStatus.BAD_REQUEST
  }
}

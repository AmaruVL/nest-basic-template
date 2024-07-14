import { Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'

/**
 * @see https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine
 */
const errorMappings: Record<string, { status: number; message: string }> = {
  P2000: { status: HttpStatus.BAD_REQUEST, message: 'Input Data is too long' },
  P2001: { status: HttpStatus.NO_CONTENT, message: 'Record does not exist' },
  P2002: { status: HttpStatus.CONFLICT, message: 'Reference Data already exists' },
  P2003: {
    status: HttpStatus.CONFLICT,
    message:
      "The ID you're attempting to associate with or delete either doesn't exist or is currently in use",
  },
  P2025: { status: HttpStatus.NOT_FOUND, message: 'Not found' },
}

@Catch(Prisma.PrismaClientKnownRequestError)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    // const response = ctx.getResponse<Response>()
    const response = ctx.getResponse()
    const errorCode = exception.code
    const errorMapping = errorMappings[errorCode]

    if (errorMapping) {
      const { status, message } = errorMapping

      // Custom message for Not found exception
      if (errorCode === 'P2025') {
        response.status(status).json({
          statusCode: status,
          message: this.getExceptionMessage(exception),
          error: message,
        })
        return
      }

      // Common error messages
      response.status(status).json({
        statusCode: status,
        message,
        error: this.getExceptionMessage(exception),
      })
    } else {
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
      super.catch(exception, host) // Handle unknown codes
    }
  }

  private getExceptionMessage = (error: Prisma.PrismaClientKnownRequestError) => {
    const message = error.message.split('\n').at(-1)
    return message
  }
}

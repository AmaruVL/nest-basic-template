/**
 * @fileoverview HTTP method decorators with extra properties
 */
import {
  Delete as HttpDelete,
  Get as HttpGet,
  Patch as HttpPatch,
  Post as HttpPost,
  Put as HttpPut,
  applyDecorators,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

type HttpMethodFunction = (path?: string | string[]) => MethodDecorator
type CustomHttpMethodFunction = (
  path?: string,
  options?: HttpMethodOptions,
) => MethodDecorator

export function createHttpDecorator(
  httpMethod: HttpMethodFunction,
): CustomHttpMethodFunction {
  return function (path?: string, options?: HttpMethodOptions): MethodDecorator {
    const decorators = [httpMethod(path)]
    const { summary, deprecated } = options || {}

    // Add summary for API documentation
    if (summary || deprecated) decorators.push(ApiOperation({ summary, deprecated }))

    // Add auth related decorators
    // if (skipAuth === true) {
    //   decorators.push(SkipAuth())
    // } else decorators.push(ApiBearerAuth())

    // TODO: Implement levelAccess
    // if (levelAccess) arrayDecorators.push(Guard(levelAccess))
    return applyDecorators(...decorators)
  }
}

export const Get = createHttpDecorator(HttpGet)
export const Post = createHttpDecorator(HttpPost)
export const Patch = createHttpDecorator(HttpPatch)
export const Put = createHttpDecorator(HttpPut)
export const Delete = createHttpDecorator(HttpDelete)

interface HttpMethodOptions {
  summary?: string
  deprecated?: boolean
  levelAccess?: number
  skipAuth?: boolean
}

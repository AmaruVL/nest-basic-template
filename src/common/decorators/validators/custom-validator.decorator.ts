import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { ClassConstructor, Type } from 'class-transformer'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
  ValidationOptions,
} from 'class-validator'

/**
 * Decorator that validates if the value is an array of DTO objects.
 * @param ClassDto The class constructor of the DTO object.
 */
export function IsArrayDto(ClassDto: ClassConstructor<unknown>): PropertyDecorator {
  return applyDecorators(
    Type(() => ClassDto),
    ValidateNested({ each: true }),
    IsArray(),
  )
}

/**
 * Decorator that applies validation rules to a DTO class.
 * @param ClassDto - The class constructor of the DTO.
 */
export function IsDto(ClassDto: ClassConstructor<unknown>): PropertyDecorator {
  return applyDecorators(
    Type(() => ClassDto),
    ValidateNested(),
  )
}

/**
 * Decorator to validate that a property is an integer ID.
 */
export function IsIntId(options?: ValidationOptions): PropertyDecorator {
  return applyDecorators(IsInt(options), Min(1, options))
}

export function IsRequiredEnum(
  enumInstance: object,
  options?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ enum: enumInstance, required: true, isArray: options?.each }),
    IsEnum(enumInstance, options),
  )
}

export function IsOptionalEnum(
  enumInstance: object,
  options?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    ApiProperty({ enum: enumInstance, required: false, isArray: options?.each }),
    IsEnum(enumInstance, options),
    IsOptional(),
  )
}

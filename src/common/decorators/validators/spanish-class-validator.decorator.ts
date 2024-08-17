/**
 * @fileoverview Translations to spanish for the decorators of the class-validator library
 */

import {
  IsString as IsStringCV,
  IsInt as IsIntCV,
  IsPositive as IsPositiveCV,
  IsDecimal as IsDecimalCV,
  IsEmail as IsEmailCV,
  IsEnum as IsEnumCV,
  IsOptional as IsOptionalCV,
  Matches as MatchesCV,
  MinLength as MinLengthCV,
  MaxLength as MaxLengthCV,
  Length as LengthCV,
  IsObject as IsObjectCV,
  ValidateNested as ValidateNestedCV,
  IsArray as IsArrayCV,
  IsNotEmpty as IsNotEmptyCV,
  IsDate as IsDateCV,
  IsNumber as IsNumberCV,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'
import { Type as TypeCT, type TypeHelpOptions } from 'class-transformer'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type TypeFunction = ((type?: TypeHelpOptions | undefined) => Function) | undefined
type Options = ValidationOptions
type Args = ValidationArguments

export const Type = (typeFunction: TypeFunction) => TypeCT(typeFunction)

export const IsOptional = () => IsOptionalCV()

export const IsString = (options?: Options) => {
  const customMessage = (args: Args) => `${args.property} debe ser un texto`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsStringCV(newOptions)
}

export const IsNotEmpty = (options?: Options) => {
  const customMessage = (args: Args) =>
    `${args.property} no debe ser una cadena vacía`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsNotEmptyCV(newOptions)
}

export const IsInt = (options?: Options) => {
  const customMessage = (args: Args) => `${args.property} debe ser un número entero`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsIntCV(newOptions)
}

export const IsPositive = (options?: Options) => {
  const customMessage = (args: Args) =>
    `${args.property} debe ser un número positivo`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsPositiveCV(newOptions)
}

export const IsDecimal = (options?: Options) => {
  const customMessage = (args: Args) => `${args.property} debe ser un número decimal`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsDecimalCV({}, newOptions)
}

export const IsEmail = (options?: Options, emailOptions?: never) => {
  const customMessage = (args: Args) => `${args.property} debe ser un correo válido`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsEmailCV(emailOptions, newOptions)
}

export const Length = (minValue: number, maxValue: number, options?: Options) => {
  const customMessage = ({ value, property }: Args) => {
    const formatValue: number = typeof value === 'string' ? value.length : 0

    if (formatValue < minValue)
      return `${property} debe tener ${minValue} caracteres como mínimo`

    if (formatValue > maxValue)
      return `${property} debe tener ${maxValue} caracteres como máximo`
    return 'correct'
  }
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return LengthCV(minValue, maxValue, newOptions)
}

export const MinLength = (minValue: number, options?: Options) => {
  const customMessage = (args: Args) =>
    `${args.property} debe tener ${minValue} caracteres como mínimo`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return MinLengthCV(minValue, newOptions)
}

export const MaxLength = (maxValue: number, options?: Options) => {
  const customMessage = (args: Args) =>
    `${args.property} debe tener ${maxValue} caracteres como máximo`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return MaxLengthCV(maxValue, newOptions)
}

export const IsNumber = (options?: Options) => {
  const customMessage = (args: Args) => `${args.property} debe ser un número`
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsNumberCV(undefined, newOptions)
}

export const Matches = (pattern: RegExp, options?: Options) => {
  return MatchesCV(pattern, options)
}

export const IsEnum = (entity: object, options?: Options) => {
  const customMessage = ({ property, constraints }: Args) => {
    const [, values] = constraints
    return `${property} debe tener uno de los siguientes valores: ${values.join(
      ', ',
    )}`
  }
  const newOptions: Options = {
    ...options,
    message: options?.message ?? customMessage,
  }
  return IsEnumCV(entity, newOptions)
}

export const IsObject = (options?: Options) => {
  return IsObjectCV(options)
}
export const ValidateNested = (options?: Options) => {
  return ValidateNestedCV(options)
}
export const IsArray = (options?: Options) => {
  return IsArrayCV(options)
}
export const IsDate = (options?: Options) => {
  return IsDateCV(options)
}

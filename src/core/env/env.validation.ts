import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsPort, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsPort()
  PORT: string

  @IsString()
  @IsNotEmpty()
  CORS_ALLOWED_ORIGINS: string

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string

  @IsString()
  @IsNotEmpty()
  DB_USER: string

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string

  @IsString()
  @IsNotEmpty()
  DB_HOST: string

  @IsPort()
  DB_PORT: string

  @IsString()
  @IsNotEmpty()
  DB_NAME: string

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string
}

export function envValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    const constraints = errors.flatMap(obj => Object.values(obj.constraints!))
    const errorName =
      'Required environment variables in the .env file are not defined correctly'
    const formatErrors = constraints.map(errorMsg => `- ${errorMsg}`).join('\n')
    throw new Error(`${errorName}\n${formatErrors}\n`)
  }
  return validatedConfig
}

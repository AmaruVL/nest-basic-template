import { IsEnum, IsNotEmpty, IsPort, IsString } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsPort()
  PORT: string

  @IsString()
  @IsNotEmpty()
  CORS_ALLOWED_ORIGINS: string

  @IsString()
  @IsNotEmpty()
  JWT_KEY: string

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

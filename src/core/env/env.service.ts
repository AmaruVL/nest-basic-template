import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.getOrThrow<number>('PORT')
  }

  get corsAllowedOrigins(): string[] {
    const corsOrigins = this.configService.getOrThrow<string>('CORS_ALLOWED_ORIGINS')
    try {
      return JSON.parse(corsOrigins)
    } catch (error) {
      throw new Error('CORS_ALLOWED_ORIGINS in .env file should be a JSON array')
    }
  }

  get jwtKey(): string {
    return this.configService.getOrThrow<string>('JWT_SECRET')
  }

  get nodeEnv(): string {
    return this.configService.getOrThrow<string>('NODE_ENV')
  }
}

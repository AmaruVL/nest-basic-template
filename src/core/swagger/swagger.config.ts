import { DocumentBuilder } from '@nestjs/swagger'

// Swagger config
export const swaggerConfig = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('The NestJS API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('Auth', 'Access to platform')
  .build()

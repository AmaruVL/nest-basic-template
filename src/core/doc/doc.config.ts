import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger'

// Swagger custom options
export const docUrl = 'docs'
export const docOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Nest API Docs',
  swaggerOptions: {
    docExpansion: 'none',
  },
}

// Swagger config for API documentation
export const docConfigs = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('The NestJS API description')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('Auth', 'Access to platform')
  .build()

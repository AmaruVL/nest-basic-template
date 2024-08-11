import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { EnvService, docConfigs, docPath, docOptions } from './core'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove non-whitelisted properties
      forbidNonWhitelisted: true, // Avoid unknown properties
    }),
  )

  // Generate API documentation
  const document = SwaggerModule.createDocument(app, docConfigs)
  SwaggerModule.setup(docPath, app, document, docOptions)

  // Load env variables
  const envService = app.get(EnvService)
  const port = envService.port
  const corsOrigins = envService.corsAllowedOrigins

  // Settings server configs
  app.enableCors({ origin: corsOrigins })
  await app.listen(port, '0.0.0.0')

  // Showing logs
  const logger = new Logger('Bootstrap')
  logger.log(`App running on port ${port}`)
  logger.log(`Documentation available at http://localhost:${port}/${docPath}`)
}
bootstrap()

import { APP_FILTER } from '@nestjs/core'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from './env/env.service'
import { envValidator } from './env/env.validation'
import { DatabaseService } from './database/database.service'
import { DatabaseExceptionFilter } from './database/database.exception-filter'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: envValidator, expandVariables: true })],
  providers: [
    EnvService,
    DatabaseService,
    { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
  ],
  exports: [EnvService, DatabaseService],
})
export class CoreModule {}

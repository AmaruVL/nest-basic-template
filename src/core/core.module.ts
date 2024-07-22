import { APP_FILTER } from '@nestjs/core'
import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  DatabaseService,
  DatabaseExceptionFilter,
  EnvService,
  envValidator,
} from 'src/core'

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

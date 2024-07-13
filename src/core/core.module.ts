import { Global, Module } from '@nestjs/common'
import { EnvService } from './env/env.service'
import { ConfigModule } from '@nestjs/config'
import { DatabaseService } from './database/database.service'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [EnvService, DatabaseService],
  exports: [EnvService, DatabaseService],
})
export class CoreModule {}

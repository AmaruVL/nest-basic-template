import { Module } from '@nestjs/common'
import { EnvService } from './env/env.service'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [EnvService],
  exports: [EnvService],
})
export class CoreModule {}

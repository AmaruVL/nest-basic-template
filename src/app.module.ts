import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module'
import { CoreModule } from './core/core.module'
import { envValidation } from './core'

@Module({
  imports: [
    ConfigModule.forRoot({ validate: envValidation, expandVariables: true }),
    CommonModule,
    CoreModule,
  ],
})
export class AppModule {}

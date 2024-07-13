import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module'
import { CoreModule } from './core/core.module'
import { envValidation } from './core/env/env.validation'

@Module({
  imports: [
    ConfigModule.forRoot({ validate: envValidation, expandVariables: true }),
    CoreModule,
    CommonModule,
  ],
})
export class AppModule {}

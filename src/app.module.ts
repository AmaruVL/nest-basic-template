import { Module } from '@nestjs/common'
import { CoreModule } from './core/core.module'
import { CommonModule } from './common/common.module';

@Module({
  imports: [CoreModule, CommonModule],
})
export class AppModule {}

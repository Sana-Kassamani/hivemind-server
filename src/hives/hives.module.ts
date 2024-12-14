import { Module } from '@nestjs/common';
import { HivesService } from './hives.service';

@Module({
  controllers: [],
  providers: [HivesService],
  exports: [HivesService],
})
export class HivesModule {}

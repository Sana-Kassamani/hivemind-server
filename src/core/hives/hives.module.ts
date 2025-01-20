import { Module } from '@nestjs/common';
import { HivesService } from './hives.service';
import { HivesController } from './hives.controller';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

@Module({
  imports: [registerApiaryModel()],
  controllers: [HivesController],
  providers: [HivesService],
  exports: [HivesService],
})
export class HivesModule {}

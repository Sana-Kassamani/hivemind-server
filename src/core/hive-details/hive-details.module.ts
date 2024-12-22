import { Module } from '@nestjs/common';
import { HiveDetailsService } from './hive-details.service';
import { HiveDetailsController } from './hive-details.controller';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

@Module({
  imports: [registerApiaryModel()],
  providers: [HiveDetailsService],
  controllers: [HiveDetailsController],
})
export class HiveDetailsModule {}

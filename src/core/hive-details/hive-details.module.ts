import { Module } from '@nestjs/common';
import { HiveDetailsService } from './hive-details.service';
import { HiveDetailsController } from './hive-details.controller';
import { HivesModule } from 'src/core/hives/hives.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Hive, HiveSchema } from 'src/core/hives/schema/hive.schema';
import { ApiariesModule } from 'src/core/apiaries/apiaries.module';
import { Apiary, ApiarySchema } from 'src/core/apiaries/schema/apiary.schema';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

@Module({
  imports: [registerApiaryModel()],
  providers: [HiveDetailsService],
  controllers: [HiveDetailsController],
})
export class HiveDetailsModule {}

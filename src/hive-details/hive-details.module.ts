import { Module } from '@nestjs/common';
import { HiveDetailsService } from './hive-details.service';
import { HiveDetailsController } from './hive-details.controller';
import { HivesModule } from 'src/hives/hives.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Hive, HiveSchema } from 'src/hives/schema/hive.schema';
import { ApiariesModule } from 'src/apiaries/apiaries.module';
import { Apiary, ApiarySchema } from 'src/apiaries/schema/apiary.schema';

@Module({
  imports: [
    ApiariesModule,
    HivesModule,
    MongooseModule.forFeature([
      {
        name: Apiary.name,
        schema: ApiarySchema,
      },
    ]),
  ],
  providers: [HiveDetailsService],
  controllers: [HiveDetailsController],
})
export class HiveDetailsModule {}

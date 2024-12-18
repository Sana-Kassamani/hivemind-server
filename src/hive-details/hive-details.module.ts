import { Module } from '@nestjs/common';
import { HiveDetailsService } from './hive-details.service';
import { HiveDetailsController } from './hive-details.controller';
import { HivesModule } from 'src/hives/hives.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Hive, HiveSchema } from 'src/hives/schema/hive.schema';

@Module({
  imports: [
    HivesModule,
    MongooseModule.forFeature([
      {
        name: Hive.name,
        schema: HiveSchema,
      },
    ]),
  ],
  providers: [HiveDetailsService],
  controllers: [HiveDetailsController],
})
export class HiveDetailsModule {}

import { Module } from '@nestjs/common';
import { HivesService } from './hives.service';
import { ApiariesModule } from 'src/apiaries/apiaries.module';
import { ApiariesService } from 'src/apiaries/apiaries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Apiary, ApiarySchema } from 'src/apiaries/schema/apiary.schema';
import { HivesController } from './hives.controller';

@Module({
  imports: [
    ApiariesModule,
    MongooseModule.forFeature([
      {
        name: Apiary.name,
        schema: ApiarySchema,
      },
    ]),
  ],
  controllers: [HivesController],
  providers: [HivesService],
  exports: [HivesService],
})
export class HivesModule {}

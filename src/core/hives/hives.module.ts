import { Module } from '@nestjs/common';
import { HivesService } from './hives.service';
import { ApiariesModule } from 'src/core/apiaries/apiaries.module';
import { ApiariesService } from 'src/core/apiaries/apiaries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Apiary, ApiarySchema } from 'src/core/apiaries/schema/apiary.schema';
import { HivesController } from './hives.controller';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

@Module({
  imports: [registerApiaryModel()],
  controllers: [HivesController],
  providers: [HivesService],
  exports: [HivesService],
})
export class HivesModule {}

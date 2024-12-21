import { Module } from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { ApiariesController } from './apiaries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apiary, ApiarySchema } from './schema/apiary.schema';
import { HivesService } from 'src/core/hives/hives.service';
import { HivesController } from './apiaries.hives.controller';
import { TaskController } from './apiaries.tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Apiary.name,
        schema: ApiarySchema,
      },
    ]),
  ],
  controllers: [ApiariesController, HivesController, TaskController],
  providers: [ApiariesService],
  exports: [ApiariesService],
})
export class ApiariesModule {}

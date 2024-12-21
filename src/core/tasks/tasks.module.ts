import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ApiariesModule } from '../apiaries/apiaries.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Apiary, ApiarySchema } from '../apiaries/schema/apiary.schema';

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
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

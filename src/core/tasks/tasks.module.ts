import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ApiariesModule } from '../apiaries/apiaries.module';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

@Module({
  imports: [registerApiaryModel()],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

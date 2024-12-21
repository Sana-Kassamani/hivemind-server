import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getTasks(@Param('id') apiaryId: string) {
    return this.tasksService.getTasks(apiaryId);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  getTasks(@Param('id') apiaryId: string) {
    return this.tasksService.getTasks(apiaryId);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addTask(@Param('id') apiaryId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.addTask(apiaryId, createTaskDto);
  }

  @Patch(':id/:taskId')
  @HttpCode(HttpStatus.OK)
  completeTask(
    @Param('id') apiaryId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.completeTask(apiaryId, taskId, updateTaskDto);
  }
}

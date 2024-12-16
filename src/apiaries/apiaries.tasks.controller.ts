import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Controller('apiaries/tasks')
export class TaskController {
  constructor(private apiariesService: ApiariesService) {}

  @Get(':id')
  getTasks(@Param('id') apiaryId: string) {
    return this.apiariesService.getTasks(apiaryId);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addTask(@Param('id') apiaryId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.apiariesService.addTask(apiaryId, createTaskDto);
  }

  @Delete(':id/:taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTask(@Param('id') apiaryId: string, @Param('taskId') taskId: string) {
    return this.apiariesService.deleteTask(apiaryId, taskId);
  }
}

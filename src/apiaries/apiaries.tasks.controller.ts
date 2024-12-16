import {
  Body,
  Controller,
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

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addTask(@Param('id') apiaryId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.apiariesService.addTask(apiaryId, createTaskDto);
  }
}

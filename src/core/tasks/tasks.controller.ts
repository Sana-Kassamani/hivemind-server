import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
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

  @Get('completed/:id')
  getCompletedTasks(@Param('id') apiaryId: string) {
    return this.tasksService.getCompletedTasks(apiaryId);
  }
  @Get('pending/:id')
  getPendingTasks(@Param('id') apiaryId: string) {
    return this.tasksService.getPendingTasks(apiaryId);
  }

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addTask(@Param('id') apiaryId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.addTask(apiaryId, createTaskDto);
  }

  @Patch(':id/:taskId')
  @HttpCode(HttpStatus.OK)
  completeTask(@Param('id') apiaryId: string, @Param('taskId') taskId: string) {
    return this.tasksService.completeTask(apiaryId, taskId);
  }

  @Put(':id/:taskId')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addComment(
    @Param('id') apiaryId: string,
    @Param('taskId') taskId: string,
    @Body() body: any,
    @Request() req,
  ) {
    const updateTaskDto = new UpdateTaskDto();
    updateTaskDto.content = body.comment;
    updateTaskDto.userId = req.user.userId;
    return this.tasksService.addComment(apiaryId, taskId, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteTask(@Param('id') apiaryId: string) {
    return this.tasksService.deleteTask(apiaryId);
  }
}

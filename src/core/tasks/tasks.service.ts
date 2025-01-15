import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apiary } from '../apiaries/schema/apiary.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schema/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'src/utils/enums/taskStatus.enum';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

  async getTasks(apiaryId: string) {
    const apiary = await this.apiaryModel.find(
      {
        _id: apiaryId,
      },
      { tasks: 1 },
    );
    return apiary;
  }
  async getCompletedTasks(apiaryId: string) {
    const apiary = await this.apiaryModel.findOne(
      {
        _id: apiaryId,
      },
      {
        tasks: {
          $filter: {
            input: '$tasks',
            as: 'task',
            cond: { $eq: ['$$task.status', TaskStatus.Done] },
          },
        },
      },
    );
    return apiary;
  }

  async getPendingTasks(apiaryId: string) {
    const apiary = await this.apiaryModel.findOne(
      {
        _id: apiaryId,
      },
      {
        tasks: {
          $filter: {
            input: '$tasks',
            as: 'task',
            cond: { $eq: ['$$task.status', TaskStatus.Pending] },
          },
        },
      },
    );
    return apiary;
  }
  async addTask(apiaryId: string, createTaskDto: CreateTaskDto) {
    const newTask = new Task(createTaskDto);
    // push new task to tasks array in apiary
    const updatedApiary = await this.apiaryModel.findOneAndUpdate(
      { _id: apiaryId },
      {
        $push: {
          tasks: newTask,
        },
      },
      {
        new: true,
        projection: { tasks: 1 },
      },
    );
    // task or apiary not found
    if (!updatedApiary) throw new NotFoundException('Apiary not found');
    return updatedApiary;
  }

  async completeTask(
    apiaryId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    // access a task in an apiary
    const updatedApiary = await this.apiaryModel.findOneAndUpdate(
      { _id: apiaryId, 'tasks._id': taskId },
      {
        $set: {
          'tasks.$.status': TaskStatus.Done, // Update the status of the matched task
          'tasks.$.comment':
            updateTaskDto.comment || updateTaskDto.comment == ''
              ? 'No comment'
              : updateTaskDto.comment,
        },
      },
      {
        new: true,
        projection: { tasks: 1 }, //return task array only with apiary _id
      },
    );
    // task or apiary not found
    if (!updatedApiary) throw new NotFoundException('Task in apiary not found');
    return updatedApiary;
  }

  async deleteTask(apiaryId: string) {
    // find apiary with id and delete task with id
    const updatedApiary = await this.apiaryModel.updateMany(
      { _id: apiaryId }, // Match the apiary by ID
      {
        $set: {
          'tasks.$[task].deleted': true, // Set the 'deleted' field to true for matched tasks
        },
      },
      {
        arrayFilters: [
          { 'task.status': TaskStatus.Done }, // Filter tasks where status is 'Done'
        ],
        new: true,
        projection: { hives: 1 }, // Return only the hives field in the response
      },
    );
    // if apiary doc or task not found
    if (!updatedApiary)
      throw new BadRequestException('Task in apiary not found');
    return updatedApiary;
  }
}

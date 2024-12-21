import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apiary } from '../apiaries/schema/apiary.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './schema/task.schema';

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

  async addTask(apiaryId: string, createTaskDto: CreateTaskDto) {
    const newTask = new Task(createTaskDto);
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
    if (!updatedApiary) throw new NotFoundException('Apiary not found');
    return updatedApiary;
  }
}

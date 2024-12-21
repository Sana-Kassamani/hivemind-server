import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHiveDto } from 'src/core/hives/dto/create-hive.dto';
import { HivesService } from 'src/core/hives/hives.service';
import { UpdateHiveDto } from 'src/core/hives/dto/update-hive.dto';
import { Hive } from 'src/core/hives/schema/hive.schema';
import { CreateTaskDto } from 'src/core/tasks/dto/create-task.dto';
import { Task } from 'src/core/tasks/schema/task.schema';
import { UpdateTaskDto } from 'src/core/tasks/dto/update-task.dto';
import { TaskStatus } from 'src/utils/enums/taskStatus.enum';

@Injectable()
export class ApiariesService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

  // ---------------------------------
  // Apiaries specific apis
  // ---------------------------------

  getApiaries() {
    return this.apiaryModel.find();
  }

  createApiary(createApiaryDto: CreateApiaryDto) {
    const newApiary = new this.apiaryModel(createApiaryDto);
    return newApiary.save();
  }

  async getApiaryById(id: string) {
    const apiary = await this.apiaryModel.findById(id);
    if (!apiary) throw new HttpException('Apiary not found', 404);
    return apiary;
  }

  updateApiary(id: string, updateApiaryDto: UpdateApiaryDto) {
    //if found return updated doc (new: true), else return null
    return this.apiaryModel.findByIdAndUpdate(id, updateApiaryDto, {
      new: true,
    });
  }

  deleteApiary(id: string) {
    //if found return deleted doc, else return null
    return this.apiaryModel.findByIdAndDelete(id);
  }

  // ---------------------------------
  // apiaries tasks specific api
  // ---------------------------------

  async getTasks(apiaryId: string) {
    const apiary = await this.getApiaryById(apiaryId);
    return apiary.tasks;
  }

  async addTask(apiaryId: string, createTaskDto: CreateTaskDto) {
    const apiary = await this.getApiaryById(apiaryId);
    const newTask = new Task(createTaskDto);
    apiary.tasks.push(newTask);
    await apiary.save();
    return apiary;
  }

  async deleteTask(apiaryId: string, taskId: string) {
    const apiary = await this.getApiaryById(apiaryId);
    const tasks = apiary.tasks.filter((t) => t._id.toString() != taskId);
    apiary.tasks = tasks;
    await apiary.save();
    return apiary;
  }

  async completeTask(
    apiaryId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ) {
    const apiary = await this.getApiaryById(apiaryId);
    const task = apiary.tasks.find((t) => t._id.toString() === taskId);
    task.status = TaskStatus.Done;
    task.comment = updateTaskDto.comment ?? 'No comment';
    await apiary.save();
    return apiary;
  }
}

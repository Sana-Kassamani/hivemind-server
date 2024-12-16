import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHiveDto } from 'src/hives/dto/create-hive.dto';
import { HivesService } from 'src/hives/hives.service';
import { UpdateHiveDto } from 'src/hives/dto/update-hive.dto';
import { Hive } from 'src/hives/schema/hive.schema';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { Task } from 'src/tasks/schema/task.schema';

@Injectable()
export class ApiariesService {
  constructor(
    @InjectModel(Apiary.name) private apiaryModel: Model<Apiary>,
    private hivesService: HivesService,
  ) {}

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
  // apiaries hive specific api
  // ---------------------------------

  private isUniqueHiveLabel(label: string, hives: Hive[]) {
    const labelExists = hives.some((hive) => hive.label === label);
    if (labelExists) {
      throw new ConflictException(
        'Hive label must be unique within this Apiary',
      );
    }
    console.log(label, ' is unique');
    return true;
  }
  async addHive(apiaryId: string, createHiveDto: CreateHiveDto) {
    const apiary = await this.getApiaryById(apiaryId);
    const newHive = this.hivesService.createHive(createHiveDto);
    if (this.isUniqueHiveLabel(newHive.label, apiary.hives)) {
      apiary.hives.push(newHive);
      await apiary.save();
      return apiary;
    }
  }

  //ToDo apply pipe for  valid label
  async updateHive(
    apiaryId: string,
    hiveId: string,
    { label, nbOfFrames }: UpdateHiveDto,
  ) {
    const apiary = await this.getApiaryById(apiaryId);
    const hive = apiary.hives.find((h) => h._id.toString() === hiveId);
    if (!hive) throw new HttpException('Hive in apiary not found', 404);
    if (label && label != hive.label) {
      this.isUniqueHiveLabel(label, apiary.hives) && (hive.label = label);
    }
    nbOfFrames && (hive.nbOfFrames = nbOfFrames);
    await apiary.save();
    return apiary;
  }

  async deleteHive(apiaryId: string, hiveId: string) {
    const apiary = await this.getApiaryById(apiaryId);
    const hives = apiary.hives.filter((h) => h._id.toString() != hiveId);
    apiary.hives = hives;
    await apiary.save();
    return apiary;
  }

  // ---------------------------------
  // apiaries tasks specific api
  // ---------------------------------

  async addTask(apiaryId: string, createTaskDto: CreateTaskDto) {
    const apiary = await this.getApiaryById(apiaryId);
    const newTask = new Task(createTaskDto);
    apiary.tasks.push(newTask);
    await apiary.save();
    return apiary;
  }
}

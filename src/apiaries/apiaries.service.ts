import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHiveDto } from 'src/hives/dto/create-hive.dto';
import { HivesService } from 'src/hives/hives.service';

@Injectable()
export class ApiariesService {
  constructor(
    @InjectModel(Apiary.name) private apiaryModel: Model<Apiary>,
    private hivesService: HivesService,
  ) {}

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

  async addHive(apiaryId: string, createHiveDto: CreateHiveDto) {
    const apiary = await this.getApiaryById(apiaryId);
    const newHive = this.hivesService.createHive(createHiveDto);
    const labelExists = apiary.hives.some(
      (hive) => hive.label === newHive.label,
    );
    if (labelExists) {
      throw new ConflictException(
        'Hive label must be unique within this Apiary',
      );
    }
    apiary.hives.push(newHive);
    await apiary.save();
    return apiary;
  }
}

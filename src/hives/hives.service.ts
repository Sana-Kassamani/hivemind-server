import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/apiaries/schema/apiary.schema';
import { CreateHiveDto } from './dto/create-hive.dto';
import { ApiariesService } from 'src/apiaries/apiaries.service';
import { Hive } from 'src/hives/schema/hive.schema';
import { UpdateHiveDto } from './dto/update-hive.dto';

@Injectable()
export class HivesService {
  constructor(private apiariesService: ApiariesService) {}
  createHive(createHiveDto: CreateHiveDto) {
    const newHive = new Hive();
    newHive.label = createHiveDto.label;
    newHive.nbOfFrames = createHiveDto.nbOfFrames;
    return newHive;
  }

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
    const apiary = await this.apiariesService.getApiaryById(apiaryId);
    const newHive = this.createHive(createHiveDto);
    if (this.isUniqueHiveLabel(newHive.label, apiary.hives)) {
      apiary.hives.push(newHive);
      await apiary.save();
      return apiary;
    }
  }

  async getHiveById(apiaryId: string, hiveId: string) {
    const apiary = await this.apiariesService.getApiaryById(apiaryId);
    const hive = apiary.hives.find((h) => h._id.toString() === hiveId);
    if (!hive) throw new HttpException('Hive in apiary not found', 404);
    return hive;
  }
}

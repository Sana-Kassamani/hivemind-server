import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/apiaries/schema/apiary.schema';
import { CreateHiveDto } from './dto/create-hive.dto';
import { ApiariesService } from 'src/apiaries/apiaries.service';
import { Hive } from 'src/hives/schema/hive.schema';
import { UpdateHiveDto } from './dto/update-hive.dto';

@Injectable()
export class HivesService {
  createHive(createHiveDto: CreateHiveDto) {
    const newHive = new Hive();
    newHive.label = createHiveDto.label;
    newHive.nbOfFrames = createHiveDto.nbOfFrames;
    return newHive;
  }
}

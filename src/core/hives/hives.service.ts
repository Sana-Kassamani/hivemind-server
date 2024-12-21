import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/core/apiaries/schema/apiary.schema';
import { CreateHiveDto } from './dto/create-hive.dto';
import { ApiariesService } from 'src/core/apiaries/apiaries.service';
import { Hive } from 'src/core/hives/schema/hive.schema';
import { UpdateHiveDto } from './dto/update-hive.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class HivesService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

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
    // checks if apiary is found and hive with this label is not present, then updates
    // else returns null
    const updatedApiary = await this.apiaryModel.findOneAndUpdate(
      { _id: apiaryId, 'hives.label': { $ne: createHiveDto.label } },
      {
        $push: {
          hives: {
            label: createHiveDto.label,
            nbOfFrames: createHiveDto.nbOfFrames,
          },
        },
      },
      {
        new: true,
        projection: { hives: 1 },
      },
    );

    // good for debugging
    if (!updatedApiary) {
      // if it was not updated
      const apiary = await this.apiaryModel.findById(apiaryId); // check if apiary found
      if (apiary) {
        // if apiary found, then a duplicate hive prevented update
        throw new BadRequestException('Hive with same label exists');
      } else {
        // apiary not found
        throw new NotFoundException('Apiary not found');
      }
    }
    return updatedApiary;
  }

  async getHiveById(apiaryId: string, hiveId: string) {
    // const apiary = await this.apiariesService.getApiaryById(apiaryId);
    // const hive = apiary.hives.find((h) => h._id.toString() === hiveId);
    // if (!hive) throw new HttpException('Hive in apiary not found', 404);
    // return hive;
  }
}

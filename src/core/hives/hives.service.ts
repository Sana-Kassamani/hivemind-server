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
    return true;
  }

  async addHive(apiaryId: string, createHiveDto: CreateHiveDto) {
    // checks if apiary is found and hive with this label is not present, then updates
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

    // else returns null
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

  // get hives of apiary with iot details
  async getAllHives(apiaryId: string) {
    const apiary = this.apiaryModel
      .findOne({
        _id: apiaryId,
      })
      .select('+hives.iotDetails');
    if (!apiary) throw new HttpException('Apiary not found', 404);
    return apiary;
  }

  async deleteHive(apiaryId: string, hiveId: string) {
    // find apiary with id and delete hive with id
    const updatedApiary = await this.apiaryModel.findOneAndUpdate(
      { _id: apiaryId, 'hives._id': hiveId },
      {
        $pull: {
          hives: {
            _id: hiveId,
          },
        },
      },
      {
        new: true,
        projection: { hives: 1 },
      },
    );
    // if apiary doc or hive not found
    if (!updatedApiary) throw new BadRequestException('Hive in not found');
    return updatedApiary;
  }

  async updateHarvestStatusToNow(
    apiaryId: string,
    hiveId: string,
    harvestStatus: boolean,
  ) {
    var apiary;
    // if harvest status is changed to true, so hive ready to be harvested
    if (harvestStatus) {
      apiary = await this.apiaryModel.findOneAndUpdate(
        { _id: apiaryId, 'hives._id': hiveId },
        {
          $set: {
            'hives.$.harvestStatus': harvestStatus,
          },
        },
        {
          new: true,
          projection: { hives: 1 },
        },
      );
    } else {
      // if harvest status is changed to false, so hive was harvested now so change harvest Date
      apiary = await this.apiaryModel.findOneAndUpdate(
        { _id: apiaryId, 'hives._id': hiveId },
        {
          $set: {
            'hives.$.harvestStatus': harvestStatus,
            'hives.$.lastHarvestDate': Date.now(),
          },
        },
        {
          new: true,
          projection: { hives: 1 },
        },
      );
    }

    if (!apiary)
      throw new NotFoundException('Apiary to update harvest is not found');
    return apiary;
  }
  // not used as endpoint
  async updateHive(
    apiaryId: string,
    hiveId: string,
    { label, nbOfFrames }: UpdateHiveDto,
  ) {
    const apiary = await this.apiaryModel.findById(apiaryId);
    if (!apiary) throw new NotFoundException('Apiary not found');
    const hive = apiary.hives.find((h) => h._id.toString() === hiveId);
    if (!hive) throw new HttpException('Hive in apiary not found', 404);
    if (label && label != hive.label) {
      this.isUniqueHiveLabel(label, apiary.hives) && (hive.label = label);
    }
    nbOfFrames && (hive.nbOfFrames = nbOfFrames);
    await apiary.save();
    return apiary;
  }
}

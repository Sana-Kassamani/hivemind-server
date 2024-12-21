import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/core/apiaries/schema/apiary.schema';
import { HivesService } from 'src/core/hives/hives.service';
import { HiveDetails } from './schema/hive-details.schema';
import { HiveDetailsController } from './hive-details.controller';

@Injectable()
export class HiveDetailsService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

  async getHiveDetails(apiaryId: string, hiveId: string) {
    const hive = await this.apiaryModel.findOne(
      { _id: apiaryId, 'hives._id': hiveId },
      {
        'hives.$': 1,
      },
    );
    return hive;
  }

  async addHiveDetails(apiaryId: string, hiveId: string) {
    const detail = new HiveDetails();
    detail._id = new mongoose.Types.ObjectId();
    detail.temperature = detail.humidity = detail.mass = 1;
    const hive = await this.apiaryModel.updateOne(
      { _id: apiaryId, 'hives._id': hiveId },
      {
        $push: { 'hives.$.iotDetails': detail },
      },
    );
    console.log(hive);
  }
}

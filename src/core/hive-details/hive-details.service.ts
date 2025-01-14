import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/core/apiaries/schema/apiary.schema';
import { HiveDetails } from './schema/hive-iotDetails.schema';
import { CreateIOTDetailsDto } from './dto/create-iotDetails.dto';

@Injectable()
export class HiveDetailsService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

  async getHiveDetails(apiaryId: string, hiveId: string) {
    const apiary = await this.apiaryModel.findOne(
      { _id: apiaryId, 'hives._id': hiveId },
      {
        'hives.$': 1,
      },
    );
    return apiary;
  }

  async addHiveDetails(
    apiaryId: string,
    hiveId: string,
    iotDetails: CreateIOTDetailsDto,
  ) {
    const apiary = await this.apiaryModel
      .findOneAndUpdate(
        { _id: apiaryId, 'hives._id': hiveId },
        {
          $push: { 'hives.$.iotDetails': iotDetails },
        },
        {
          hives: 1,
        },
      )
      .select('+hives.iotDetails');
    return apiary;
  }

  async getIotDetails(body: any) {
    console.log('T: ', body.temperature);
    console.log('h: ', body.humidity);
    return 'hey';
  }

  async alertIot(body: any) {
    console.log(body);
    return 'alert';
  }
}

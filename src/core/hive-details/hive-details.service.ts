import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/core/apiaries/schema/apiary.schema';
import { HiveDetails } from './schema/hive-iotDetails.schema';
import { CreateIOTDetailsDto } from './dto/create-iotDetails.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto';
import { create } from 'node:domain';

@Injectable()
export class HiveDetailsService {
  constructor(
    @InjectModel(Apiary.name) private apiaryModel: Model<Apiary>,
    private notificationService: NotificationsService,
  ) {}

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

  async addIotDetails(createIotDetailsDto: CreateIOTDetailsDto) {
    if (createIotDetailsDto.mass < 0) {
      createIotDetailsDto.mass = 0;
    } else {
      createIotDetailsDto.mass = (createIotDetailsDto.mass % 1000) + 20;
    }

    const updatedApiaries = await this.apiaryModel.updateMany(
      { hives: { $exists: true, $not: { $size: 0 } } }, // Ensures the apiary has a non-empty hives array
      {
        $push: {
          'hives.$[].iotDetails': createIotDetailsDto,
        },
      },
    );
    return updatedApiaries;
  }

  async getIotDetails(createIotDetailsDto: CreateIOTDetailsDto) {
    console.log('T: ', createIotDetailsDto.temperature);
    console.log('h: ', createIotDetailsDto.humidity);
    console.log('m: ', createIotDetailsDto.mass);
    const updatedApiaries = await this.addIotDetails(createIotDetailsDto);
    return updatedApiaries;
  }

  async alertIot(createIotDetailsDto: CreateIOTDetailsDto) {
    if (createIotDetailsDto.temperature && createIotDetailsDto.humidity) {
      const dto = new CreateNotificationDto({
        title: 'Hive Status Alert',
        message: createIotDetailsDto.message,
      });
      this.notificationService.sendPush(dto);
      const updatedApiaries = await this.addIotDetails(createIotDetailsDto);
      return updatedApiaries;
    }
    console.log(createIotDetailsDto);
  }
}

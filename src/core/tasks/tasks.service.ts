import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apiary } from '../apiaries/schema/apiary.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

  async getTasks(apiaryId: string) {
    const apiary = await this.apiaryModel.find(
      {
        _id: apiaryId,
      },
      { tasks: 1 },
    );
    return apiary;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ApiariesService {
  constructor(@InjectModel(Apiary.name) private apiaryModel: Model<Apiary>) {}

  getApiaries() {
    return this.apiaryModel.find();
  }

  createApiary(createApiaryDto: CreateApiaryDto) {
    const newApiary = new this.apiaryModel(createApiaryDto);
    return newApiary.save();
  }

  getApiaryById(id: string) {
    return this.apiaryModel.findById(id);
  }

  // update(id: number, updateApiaryDto: UpdateApiaryDto) {
  //   return `This action updates a #${id} apiary`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} apiary`;
  // }
}

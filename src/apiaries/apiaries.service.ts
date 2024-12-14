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
}

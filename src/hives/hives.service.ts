import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Apiary } from 'src/apiaries/schema/apiary.schema';
import { CreateHiveDto } from './dto/create-hive.dto';
import { ApiariesService } from 'src/apiaries/apiaries.service';
import { Hive } from 'src/hives/schema/hive.schema';

@Injectable()
export class HivesService {
  createHive(createHiveDto: CreateHiveDto) {
    const newHive = new Hive();
    newHive.label = createHiveDto.label;
    newHive.nbOfFrames = createHiveDto.nbOfFrames;
    return newHive;
  }

  getHiveById(id: string) {
    // return this.apiaryModel.findById(id);
  }

  //   updateHive(id: string, updateHiveDto: UpdateHiveDto) {
  //     //if found return updated doc (new: true), else return null
  //     return this.apiaryModel.findByIdAndUpdate(id, updateHiveDto, {
  //       new: true,
  //     });
  //   }

  deleteHive(id: string) {
    //if found return deleted doc, else return null
    // return this.apiaryModel.findByIdAndDelete(id);
  }
}

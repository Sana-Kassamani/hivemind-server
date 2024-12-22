import {
  ConflictException,
  HttpException,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserType } from 'src/utils/enums/userType.enum';
import { RoleGuard } from 'src/auth/guards/authorization.guard';
import { ReqUser } from 'src/auth/guards/authentication.guard';
import { User } from '../users/schema/user.schema';

@Injectable()
export class ApiariesService {
  constructor(
    @InjectModel(Apiary.name) private apiaryModel: Model<Apiary>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  //get all apiaries
  getApiaries() {
    return this.apiaryModel.find();
  }

  async getOwnerApiaries(user: ReqUser) {
    const result = await this.userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(user.userId), // Match the specific owner
        },
      },
      {
        $lookup: {
          from: 'apiaries', // name of collection of Apiary model
          localField: 'apiaries', // name of field in user
          foreignField: '_id', // name of field in Apiary model
          as: 'apiaries', // Alias for the joined data
        },
      },
      {
        $project: {
          apiaries: 1, // Include only the apiary details
        },
      },
    ]);

    return result;
  }

  // add an apiary by owner
  createApiary(createApiaryDto: CreateApiaryDto) {
    const newApiary = new this.apiaryModel(createApiaryDto);
    return newApiary.save();
  }

  async getApiaryById(id: string) {
    const apiary = await this.apiaryModel.findById(id);
    if (!apiary) throw new HttpException('Apiary not found', 404);
    return apiary;
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

  // ---------------------------------
  // apiaries tasks specific api
  // ---------------------------------

  // async addTask(apiaryId: string, createTaskDto: CreateTaskDto) {
  //   const apiary = await this.getApiaryById(apiaryId);
  //   const newTask = new Task(createTaskDto);
  //   apiary.tasks.push(newTask);
  //   await apiary.save();
  //   return apiary;
  // }
}

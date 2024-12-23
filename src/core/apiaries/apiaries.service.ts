import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './schema/apiary.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

  //get apiaries of an owner
  async getOwnerApiaries(user: ReqUser) {
    const result = await this.userModel.discriminators.Owner.findById(
      {
        _id: user.userId,
      },
      {
        apiaries: 1,
      },
    ).populate('apiaries');

    return result;
  }

  // add an apiary by owner
  async createApiary(user: ReqUser, createApiaryDto: CreateApiaryDto) {
    try {
      const newApiary = new this.apiaryModel(createApiaryDto);
      console.log(newApiary);
      await newApiary.save();
      // add apiary to apiaries of owner
      const owner = await this.userModel.discriminators.Owner.findByIdAndUpdate(
        {
          _id: user.userId,
        },
        {
          $push: { apiaries: newApiary._id },
        },
        {
          new: true,
        },
      );
      if (!owner) throw new NotFoundException('Owner not found');
      //add apiary as assigned to beekeeper
      const beekeeper =
        await this.userModel.discriminators.Beekeeper.findByIdAndUpdate(
          {
            _id: createApiaryDto.beekeeperId,
          },
          {
            assignedApiary: newApiary._id,
          },
          {
            new: true,
          },
        );

      if (!beekeeper) throw new NotFoundException('Beekeeper not found');
      return newApiary;
    } catch (err) {
      if (err.code === 11000) {
        //MongoDB error code 11000 for duplicate key
        throw new HttpException(
          `Apiary label: ${createApiaryDto.label} already exists.`,
          400,
        );
      }

      throw new HttpException(err.message, 400);
    }
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

  async deleteApiary(user: ReqUser, id: string) {
    //if found return deleted doc, else return null
    const deleted = await this.apiaryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Apiary not found to delete');
    const owner = await this.userModel.discriminators.Owner.findByIdAndUpdate(
      {
        _id: user.userId,
      },
      {
        $pull: { apiaries: deleted._id },
      },
      {
        new: true,
      },
    );

    const beekeeper =
      await this.userModel.discriminators.Beekeeper.findOneAndUpdate(
        {
          assignedApiary: deleted._id,
        },
        {
          $set: {
            assignedApiary: null,
          },
        },
        {
          new: true,
        },
      );
    return deleted;
  }
}

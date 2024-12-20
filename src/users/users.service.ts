import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from 'src/user-types/schema/user-types.schema';
import { create } from 'domain';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserType.name) private userTypeModel: Model<UserType>,
  ) {}

  getUsers() {
    return this.userModel.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const userType = await this.userTypeModel.findOne({
      name: createUserDto.userType ?? 'Beekeeper',
    });
    createUserDto.userType = userType.name;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel
      .findOne({ username: username })
      .select('+password');
    return user;
  }
}

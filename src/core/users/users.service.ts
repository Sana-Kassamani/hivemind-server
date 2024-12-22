import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';
import { UserType } from 'src/utils/enums/userType.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getUsers() {
    return this.userModel.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const user = await this.getUserByUsernameOEmail(username, email);
    if (user) {
      throw new BadRequestException(
        `${user.username === username ? 'Username' : 'Email'} already exists`,
      );
    }
    !createUserDto.userType && (createUserDto.userType = UserType.BeeKeeper);
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  async getUserByUsernameOEmail(username: string, email?: string) {
    const user = await this.userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select('+password');
    return user;
  }
}

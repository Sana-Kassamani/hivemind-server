import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';
import { UserType } from 'src/utils/enums/userType.enum';
import { OwnerSchema } from './schema/owner.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    const users = await this.userModel
      .find({
        userType: { $ne: UserType.Admin },
      })
      .select('-notifications ');
    const grouped = users.reduce(
      (groups: any, user) => {
        switch (user.userType) {
          case UserType.Owner:
            groups.owners.push(user);
            break;
          case UserType.BeeKeeper:
            groups.beekeepers.push(user);
            break;
          default:
        }
        return groups;
      },
      {
        beekeepers: [],
        owners: [],
      },
    );
    return grouped;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const user = await this.getUserByUsernameOrEmail(username, email);
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

  async getUserByUsernameOrEmail(
    deviceId: string,
    username: string,
    email?: string,
  ) {
    const user = await this.userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .populate({
        path: 'apiaries',
        select: '+hives.iotDetails',
        populate: {
          path: 'tasks.comments.userId',
          select: 'username',
          model: 'User',
        },
      })
      .populate({
        path: 'assignedApiary',
        select: '+hives.iotDetails',
        populate: {
          path: 'tasks.comments.userId',
          select: 'username',
          model: 'User',
        },
      })
      .select('+password');

    if (user) {
      const updatedUserWithDeviceID = await this.userModel.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            deviceId: deviceId,
          },
        },
        {
          new: true,
        },
      );
      // if (user && user.apiaries === UserType.Owner) {

      //   user.apiaries.forEach((apiary) => {
      //     apiary.hives = apiary.hives.filter((hive) => !hive.deleted);
      //   });
      // }
      // else if (user && user.userType === UserType.BeeKeeper)
      // {
      //   user.assignedApiary?.hives &&
      //     (user.assignedApiary.hives = user.assignedApiary.hives.filter(
      //       (hive) => !hive.deleted,
      //     ));

      // }

      // Filter notifications where deleted is true
      user.notifications = user.notifications.filter(
        (notification) => !notification.deleted,
      );
    }

    return user;
  }

  async getBeekeepers() {
    const beekeepers = await this.userModel.discriminators.Beekeeper.find();
    return beekeepers;
  }
}

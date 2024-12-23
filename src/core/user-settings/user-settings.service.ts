import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { ReqUser } from 'src/auth/guards/authentication.guard';
import { SettingsType } from 'src/utils/enums/settingsType.enum';

@Injectable()
export class UserSettingsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async toggleSettings(user: ReqUser, setting: SettingsType, state: boolean) {
    const updated = await this.userModel.findByIdAndUpdate(
      {
        _id: user.userId,
      },
      {
        $set: {
          [`settings.${setting}`]: state,
        },
      },
      {
        new: true,
      },
    );

    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
  async setBan(userId: string, state: boolean) {
    const updated = await this.userModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          'settings.banned': state,
        },
      },
      {
        new: true,
      },
    );

    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(User.name) private apiaryModel: Model<User>) {}
}

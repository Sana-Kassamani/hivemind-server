import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as firebase from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addNotification(ids: string[], notification: CreateNotificationDto) {
    const updatedUsers = this.userModel.updateMany(
      { _id: { $in: ids } },
      {
        $push: {
          notifications: {
            title: notification.title,
            message: notification.message,
          },
        },
      },
      {
        new: true,
        projection: { notifications: 1 },
      },
    );

    if (!updatedUsers) {
      throw new BadRequestException('Some users are not found');
    }

    return updatedUsers;
  }
  async sendPush(pushNotification: CreateNotificationDto) {
    try {
      await firebase
        .messaging()
        .send({
          notification: {
            title: pushNotification.title,
            body: pushNotification.message,
          },
          token:
            'fdBZ4yV6QHSsNIJE6kGldR:APA91bFOIKR50EJIsOF5UWVVO0ibvNkN-AswQNuE6rYPKNWLfRB-U1huJ_37Gt9oKDyF3AXk_T3sgrSYbfeA_w_y_4cN6I5xE_N5N-D_11jfIAKADmtGr84',
          data: {
            time: Date.now().toString(),
          },
          android: {
            priority: 'high',
            notification: {
              sound: 'default',
              channelId: 'default',
            },
          },
          apns: {
            headers: {
              'apns-priority': '10',
            },
            payload: {
              aps: {
                contentAvailable: true,
                sound: 'default',
              },
            },
          },
        })
        .catch((error: any) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as firebase from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(User.name) private apiaryModel: Model<User>) {}

  async sendPush(pushNotification: CreateNotificationDto) {
    try {
      await firebase
        .messaging()
        .send({
          notification: {
            title: pushNotification.title,
            body: pushNotification.body,
          },
          token: pushNotification.deviceId,
          data: {},
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

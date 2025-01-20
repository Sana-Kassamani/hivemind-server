import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as firebase from 'firebase-admin';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addNotification(notification: CreateNotificationDto) {
    const usersId = await this.userModel.aggregate([
      // Lookup apiaries for owners
      {
        $lookup: {
          from: 'apiaries', // Name of the apiaries collection
          localField: 'apiaries', // Owners' apiary IDs
          foreignField: '_id', // Matching apiary IDs
          as: 'ownerApiaries',
        },
      },
      {
        $lookup: {
          from: 'apiaries',
          localField: 'assignedApiary',
          foreignField: '_id',
          as: 'beekeeperApiary',
        },
      },

      {
        $addFields: {
          relatedApiaries: {
            $setUnion: ['$ownerApiaries', '$beekeeperApiary'],
          },
        },
      },

      {
        $match: {
          'relatedApiaries.hives': { $exists: true, $not: { $size: 0 } },
        },
      },

      {
        $project: {
          _id: 1,
        },
      },
    ]);
    console.log(usersId);
    let ids = [];
    for (let i = 0; i < usersId.length; i++) {
      ids.push(usersId[i]._id);
    }
    console.log(ids);

    const updatedUsers = this.userModel.updateMany(
      { _id: { $in: ids } },
      {
        $push: {
          notifications: {
            title: notification.title,
            message: notification.message,
            time: notification.time,
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
    const time = Date.now().toString();
    try {
      await firebase
        .messaging()
        .send({
          notification: {
            title: pushNotification.title,
            body: pushNotification.message,
          },
          // to be replaced by deviceId from db when user_id is specified in the iot system and sent by req
          token: process.env.TOKEN_ID,
          data: {
            time: time,
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
      pushNotification.time = time;
      await this.addNotification(pushNotification);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async setDelete(userId: string) {
    // const updatedUsers = await this.userModel.updateMany(
    //   {
    //     'notifications.time': { $in: times }, // Match notifications with time in times
    //   },
    //   {
    //     $set: {
    //       'notifications.$[elem].deleted': true, // Use array filter to update specific elements
    //     },
    //   },
    //   {
    //     arrayFilters: [
    //       { 'elem.time': { $in: times } }, // Specify the filter for the array elements
    //     ],
    //     new: true,
    //     projection: { notifications: 1 }, // Return only the notifications field
    //   },
    // );
    const updatedUsers = await this.userModel.updateMany(
      {
        _id: userId, // Match documents that have a notifications array
      },
      {
        $set: {
          'notifications.$[].deleted': true, // Update the `deleted` field for all elements in the array
        },
      },
    );

    return updatedUsers;
  }
}

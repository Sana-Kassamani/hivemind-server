import { Module } from '@nestjs/common';
import { HiveDetailsService } from './hive-details.service';
import { HiveDetailsController } from './hive-details.controller';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';
import { NotificationsService } from '../notifications/notifications.service';
import { registerUserModel } from 'src/modelRegistration/user.model';

@Module({
  imports: [registerApiaryModel(), registerUserModel()],
  providers: [NotificationsService, HiveDetailsService],
  controllers: [HiveDetailsController],
})
export class HiveDetailsModule {}

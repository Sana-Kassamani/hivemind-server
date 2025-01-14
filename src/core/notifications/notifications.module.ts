import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { registerUserModel } from 'src/modelRegistration/user.model';

@Module({
  imports: [registerUserModel()],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}

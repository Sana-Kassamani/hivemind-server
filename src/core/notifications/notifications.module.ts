import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { registerUserModel } from 'src/modelRegistration/user.model';
import { firebaseAdminProvider } from './firebase-admin.provider';

@Module({
  imports: [registerUserModel()],
  controllers: [NotificationsController],
  providers: [firebaseAdminProvider, NotificationsService],
})
export class NotificationsModule {}

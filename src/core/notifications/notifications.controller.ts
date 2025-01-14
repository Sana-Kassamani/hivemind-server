import { Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @Public()
  @Post()
  sendNotification(@Body() pushNotification: CreateNotificationDto) {
    this.notificationService.sendPush(pushNotification);
  }
}

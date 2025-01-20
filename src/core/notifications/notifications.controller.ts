import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
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

  @Public()
  @Post(':id')
  addNotification(@Body() notification: CreateNotificationDto) {
    return this.notificationService.addNotification(notification);
  }

  @Patch(':id')
  clearReadMessages(@Param('id') userId: string) {
    return this.notificationService.setDelete(userId);
  }
}

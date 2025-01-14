import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  title: string;

  body: string;

  deviceId: string;
}

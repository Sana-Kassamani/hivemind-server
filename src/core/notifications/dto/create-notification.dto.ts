import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  constructor({ title, message }) {
    this.title = title;
    this.message = message;
  }
  title: string;

  message: string;

  time: string;
}

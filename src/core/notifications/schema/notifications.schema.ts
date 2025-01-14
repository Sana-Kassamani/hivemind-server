import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Notification {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Date, default: Date.now })
  time: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notification);

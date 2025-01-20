import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class UserSettings {
  _id: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  banned: boolean;

  @Prop({ type: Boolean, default: false })
  darkMode: boolean;

  @Prop({ type: Boolean, default: true })
  allowNotifications: boolean;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);

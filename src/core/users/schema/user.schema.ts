import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId, Types } from 'mongoose';
import { UserType } from 'src/utils/enums/userType.enum';
import * as bcrypt from 'bcrypt';
import { UserSettings } from 'src/core/user-settings/schema/userSettings.schema';
import {
  Notification,
  NotificationsSchema,
} from 'src/core/notifications/schema/notifications.schema';
@Schema({ discriminatorKey: 'userType' })
export class User {
  _id: Types.ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({
    type: String,
    enum: UserType,
    required: true,
  })
  userType: string;

  @Prop({
    type: String,
    required: true,
  })
  deviceId: string;

  @Prop({ type: UserSettings, default: () => ({}) })
  settings: UserSettings;

  @Prop({ type: [NotificationsSchema], default: [] })
  notifications: Notification[];
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  const user = this as HydratedDocument<User>;
  if (!user.isModified('password')) next();

  try {
    const salt = 10;
    const hashed = await bcrypt.hash(user.password, salt);
    console.log('hashed password is ', hashed);
    user.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

export { UserSchema };

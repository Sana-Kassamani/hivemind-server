import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';

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
    required: true,
  })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

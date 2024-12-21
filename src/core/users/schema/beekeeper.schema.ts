import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { ObjectId, Types } from 'mongoose';
import { Apiary } from 'src/core/apiaries/schema/apiary.schema';

@Schema()
export class Beekeeper {
  _id: Types.ObjectId;

  username: string;

  email: string;

  password: string;
  userType: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Apiary', default: null })
  assignedApiary: Apiary;
}
export const BeekeeperSchema = SchemaFactory.createForClass(Beekeeper);

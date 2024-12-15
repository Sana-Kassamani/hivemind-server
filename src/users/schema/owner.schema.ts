import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose, { ObjectId } from 'mongoose';
import { Apiary } from 'src/apiaries/schema/apiary.schema';

@Schema()
export class Owner {
  _id: ObjectId;

  username: string;

  email: string;

  password: string;

  userType: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Apiary', default: [] })
  apiaries: Apiary[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);

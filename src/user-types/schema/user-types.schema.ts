import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema()
export class UserType {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: Object, required: false, default: {} })
  _rule: object;
}

export const UserTypesSchema = SchemaFactory.createForClass(UserType);

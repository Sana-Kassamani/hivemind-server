import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  //   @Prop({ required: true })
  //   userType: Enumerator;
}

export const UserSchema = SchemaFactory.createForClass(User);

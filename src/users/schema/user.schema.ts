import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { Apiary } from 'src/apiaries/schema/apiary.schema';

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Apiary' })
  apiaries?: [Apiary];
  //   @Prop({ required: true })
  //   userType: Enumerator;
}

export const UserSchema = SchemaFactory.createForClass(User);

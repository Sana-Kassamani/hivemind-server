import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Apiary {
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  label: string;

  @Prop({ required: true })
  location: string;

  //   @Prop({  })
  //   hives:[]
}

export const ApiarySchema = SchemaFactory.createForClass(Apiary);

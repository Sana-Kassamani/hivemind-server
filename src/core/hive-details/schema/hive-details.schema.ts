import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema()
export class HiveDetails {
  _id: Types.ObjectId;

  @Prop({ type: Number, required: true })
  humidity: number;

  @Prop({ type: Number, required: true })
  temperature: number;

  @Prop({ type: Number, required: true })
  mass: number;

  @Prop({ type: Date, default: Date.now })
  date: Date;
}

export const HiveDetailsSchema = SchemaFactory.createForClass(HiveDetails);

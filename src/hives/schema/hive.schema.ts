import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Hive {
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  label: string;

  @Prop({ required: true, type: Number })
  nbOfFrames: number;

  @Prop({ type: Boolean, default: false })
  harvestStatus: boolean;

  @Prop({ type: Date, required: false })
  lastHarvestDate: Date;
  newHive: import('mongoose').Types.ObjectId;

  //   details:[]
  //   images:[]
  //   audios:[]
}

export const HiveSchema = SchemaFactory.createForClass(Hive);

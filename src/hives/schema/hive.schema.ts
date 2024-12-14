import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class Hive {
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  label: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, type: Number })
  nbOfFrames: Number;

  @Prop({ type: Boolean, default: false })
  harvestStatus: Boolean;

  @Prop({ type: Date, required: false })
  lastHarvestDate: Date;

  //   details:[]
  //   images:[]
  //   audios:[]
}

export const HiveSchema = SchemaFactory.createForClass(Hive);

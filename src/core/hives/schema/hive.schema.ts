import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import {
  HiveDetails,
  HiveDetailsSchema,
} from 'src/core/hive-details/schema/hive-iotDetails.schema';
import {
  HiveMedia,
  HiveMediaSchema,
} from 'src/core/hive-details/schema/hive-media.schema';

@Schema()
export class Hive {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ required: true, type: Number })
  nbOfFrames: number;

  @Prop({ type: Boolean, default: false })
  harvestStatus: boolean;

  @Prop({ type: Date, required: false })
  lastHarvestDate: Date;

  @Prop({ type: [String], default: [] })
  diseases: string[];

  @Prop({ type: [HiveDetailsSchema], default: [], select: false })
  iotDetails: HiveDetails[];

  @Prop({ type: [HiveMediaSchema], default: [], select: false })
  images: HiveMedia[];

  @Prop({ type: [HiveMediaSchema], default: [], select: false })
  audios: HiveMedia[];
}

export const HiveSchema = SchemaFactory.createForClass(Hive);

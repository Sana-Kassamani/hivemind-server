import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import {
  HiveDetails,
  HiveDetailsSchema,
} from 'src/hive-details/schema/hive-details.schema';
import {
  HiveMedia,
  HiveMediaSchema,
} from 'src/hive-media/schema/hive-media.schema';

@Schema()
export class Hive {
  _id: Types.ObjectId;

  @Prop({ type: String, unique: true, required: true })
  label: string;

  @Prop({ required: true, type: Number })
  nbOfFrames: number;

  @Prop({ type: Boolean, default: false })
  harvestStatus: boolean;

  @Prop({ type: Date, required: false })
  lastHarvestDate: Date;

  @Prop({ type: [HiveDetailsSchema], default: [] })
  iotDetails: HiveDetails[];

  @Prop({ type: [HiveMediaSchema], default: [] })
  images: HiveMedia[];

  @Prop({ type: [HiveMediaSchema], default: [] })
  audios: HiveMedia[];
}

export const HiveSchema = SchemaFactory.createForClass(Hive);

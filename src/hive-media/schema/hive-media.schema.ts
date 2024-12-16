import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { MediaType } from 'src/utils/enums/mediaType.enum';

@Schema()
export class HiveMedia {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  path: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: String, enum: MediaType, required: true })
  type: string;
}

export const HiveMediaSchema = SchemaFactory.createForClass(HiveMedia);

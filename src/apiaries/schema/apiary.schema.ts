import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Hive, HiveSchema } from '../../hives/schema/hive.schema';

@Schema()
export class Apiary {
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  label: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: false, type: [HiveSchema] })
  hives?: [Hive];
}

export const ApiarySchema = SchemaFactory.createForClass(Apiary);

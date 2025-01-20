import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Hive, HiveSchema } from 'src/core/hives/schema/hive.schema';
import { Task, TaskSchema } from 'src/core/tasks/schema/task.schema';

// type Location = {
//   latitude: number;
//   longitude: number;
//   location: string;
// };
@Schema()
export class Apiary {
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Number, required: true })
  longitude: number;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: [HiveSchema], default: [] })
  hives: Hive[];

  @Prop({ type: [TaskSchema], default: [] })
  tasks: Task[];
}

export const ApiarySchema = SchemaFactory.createForClass(Apiary);

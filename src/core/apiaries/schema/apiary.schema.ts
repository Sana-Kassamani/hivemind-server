import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Hive, HiveSchema } from '../../hives/schema/hive.schema';
import { Task, TaskSchema } from 'src/core/tasks/schema/task.schema';

@Schema()
export class Apiary {
  _id: Types.ObjectId;

  @Prop({ type: String, unique: true, required: true })
  label: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: [HiveSchema], default: [] })
  hives: Hive[];

  @Prop({ type: [TaskSchema], default: [] })
  tasks: Task[];
}

export const ApiarySchema = SchemaFactory.createForClass(Apiary);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { TaskStatus } from 'src/utils/enums/taskStatus.enum';

@Schema()
export class Task {
  constructor({ title, content }) {
    this.title = title;
    this.content = content;
  }
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.Pending })
  status: string;

  @Prop({ type: String, required: false, default: '' })
  comment: string;

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

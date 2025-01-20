import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
import { User } from 'src/core/users/schema/user.schema';
import { TaskStatus } from 'src/utils/enums/taskStatus.enum';

@Schema()
export class Comment {
  constructor({ userId, content }) {
    this.content = content;
    this.userId = userId;
  }
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  userId: User;

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);

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

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

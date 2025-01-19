import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHiveDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsNumber()
  nbOfFrames: number;
}

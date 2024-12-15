import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateHiveDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsNumber()
  nbOfFrames?: number;
}

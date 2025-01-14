import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateHiveDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsNumber()
  nbOfFrames?: number;

  @IsOptional()
  @IsBoolean()
  harvestStatus?: boolean;
}

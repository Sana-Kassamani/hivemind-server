// import { PartialType } from '@nestjs/mapped-types';
// import { CreateApiaryDto } from './create-apiary.dto';
import { IsOptional, IsString } from 'class-validator';

// export class UpdateApiaryDto extends PartialType(CreateApiaryDto) {
export class UpdateApiaryDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  location?: string;
}

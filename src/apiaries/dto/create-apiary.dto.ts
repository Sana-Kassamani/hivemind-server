import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiaryDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}

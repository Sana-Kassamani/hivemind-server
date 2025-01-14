import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApiaryDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  beekeeperId: string;
}

// type Shape = {
//   area: number;
// };

// type Circle = Shape & {
//   radius: number;
// };

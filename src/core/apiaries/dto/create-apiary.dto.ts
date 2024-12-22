import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApiaryDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  location: string;

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

import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HivesService } from './hives.service';
import { CreateHiveDto } from './dto/create-hive.dto';

@Controller('hives')
export class HivesController {
  constructor(private hivesService: HivesService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async addHive(
    @Param('id') apiaryId: string,
    @Body() createHiveDto: CreateHiveDto,
  ) {
    return this.hivesService.addHive(apiaryId, createHiveDto);
  }
}

import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { CreateHiveDto } from 'src/hives/dto/create-hive.dto';
import { HivesService } from 'src/hives/hives.service';

@Controller('apiaries/hives')
export class HivesController {
  constructor(private apiariesService: ApiariesService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async addHive(
    @Param('id') apiaryId: string,
    @Body() createHiveDto: CreateHiveDto,
  ) {
    return this.apiariesService.addHive(apiaryId, createHiveDto);
  }
}

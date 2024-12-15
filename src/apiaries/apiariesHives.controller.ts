import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { CreateHiveDto } from 'src/hives/dto/create-hive.dto';
import { HivesService } from 'src/hives/hives.service';
import { UpdateHiveDto } from 'src/hives/dto/update-hive.dto';

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

  @Patch(':id/:hiveId')
  updateHive(
    @Param('id') apiaryId: string,
    @Param('hiveId') hiveId: string,
    @Body() updateHiveDto: UpdateHiveDto,
  ) {
    return this.apiariesService.updateHive(apiaryId, hiveId, updateHiveDto);
  }
}

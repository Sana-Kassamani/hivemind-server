import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HivesService } from './hives.service';
import { CreateHiveDto } from './dto/create-hive.dto';
import { UpdateHiveDto } from './dto/update-hive.dto';

@Controller('hives')
export class HivesController {
  constructor(private hivesService: HivesService) {}

  @Get(':id')
  async getAllHives(@Param('id') apiaryId: string) {
    return this.hivesService.getAllHives(apiaryId);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async addHive(
    @Param('id') apiaryId: string,
    @Body() createHiveDto: CreateHiveDto,
  ) {
    return this.hivesService.addHive(apiaryId, createHiveDto);
  }

  @Patch(':id/:hiveId')
  updateHive(
    @Param('id') apiaryId: string,
    @Param('hiveId') hiveId: string,
    @Body() updateHiveDto: UpdateHiveDto,
  ) {
    return this.hivesService.updateHive(apiaryId, hiveId, updateHiveDto);
  }

  @Delete(':id/:hiveId')
  deleteHive(@Param('id') apiaryId: string, @Param('hiveId') hiveId: string) {
    return this.hivesService.deleteHive(apiaryId, hiveId);
  }
}

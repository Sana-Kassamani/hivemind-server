import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HivesService } from './hives.service';
import { CreateHiveDto } from './dto/create-hive.dto';
import { UpdateHiveDto } from './dto/update-hive.dto';
import { RoleGuard } from 'src/auth/guards/authorization.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserType } from 'src/utils/enums/userType.enum';

@Controller('hives')
export class HivesController {
  constructor(private hivesService: HivesService) {}

  @Get(':id')
  async getAllHives(@Param('id') apiaryId: string) {
    return this.hivesService.getAllHives(apiaryId);
  }

  @Role(UserType.Owner)
  @UseGuards(RoleGuard)
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

  @Role(UserType.Owner)
  @UseGuards(RoleGuard)
  @Delete(':id/:hiveId')
  deleteHive(@Param('id') apiaryId: string, @Param('hiveId') hiveId: string) {
    return this.hivesService.deleteHive(apiaryId, hiveId);
  }
}

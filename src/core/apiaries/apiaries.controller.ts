import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import mongoose from 'mongoose';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserType } from 'src/utils/enums/userType.enum';
import { RoleGuard } from 'src/auth/guards/authorization.guard';
import { ReqUser } from 'src/auth/guards/authentication.guard';

@Controller('apiaries')
export class ApiariesController {
  constructor(private apiariesService: ApiariesService) {}

  @Role(UserType.Admin)
  @UseGuards(RoleGuard)
  @Get()
  getApiaries() {
    return this.apiariesService.getApiaries();
  }
  @Get('owner')
  getOwnerApiaries(@Request() req: ReqUser) {
    return this.apiariesService.getOwnerApiaries(req);
  }

  @Get(':id')
  async getApiaryById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Apiary not found', 404);
    const apiary = await this.apiariesService.getApiaryById(id);
    return apiary;
  }

  @Post()
  @Role(UserType.Owner)
  @UseGuards(RoleGuard)
  @UsePipes(new ValidationPipe())
  createApiary(@Body() createApiaryDto: CreateApiaryDto) {
    console.log(createApiaryDto);
    return this.apiariesService.createApiary(createApiaryDto);
  }

  // update parts of apiray doc vs put that updates the entire data doc
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateApiary(
    @Param('id') id: string,
    @Body() updateApiaryDto: UpdateApiaryDto,
  ) {
    //TODO write middleware for validation of id
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);
    const updated = await this.apiariesService.updateApiary(
      id,
      updateApiaryDto,
    );
    if (!updated) throw new HttpException('Apiary not found', 404);
    return updated;
  }

  @Delete(':id')
  @Role(UserType.Owner)
  @UseGuards(RoleGuard)
  async deleteApiary(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);
    const deleted = await this.apiariesService.deleteApiary(id);
    if (!deleted) throw new HttpException('Apiary not found', 404);
    return;
  }
}

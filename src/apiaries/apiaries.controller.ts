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
} from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import mongoose from 'mongoose';

@Controller('apiaries')
export class ApiariesController {
  constructor(private apiariesService: ApiariesService) {}

  @Get()
  getApiaries() {
    return this.apiariesService.getApiaries();
  }

  @Get(':id')
  getApiaryById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Apiary not found', 404);
    const apiary = this.apiariesService.getApiaryById(id);
    if (!apiary) throw new HttpException('Apiary not found', 404);
    return apiary;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createApiary(@Body() createApiaryDto: CreateApiaryDto) {
    console.log(createApiaryDto);
    return this.apiariesService.createApiary(createApiaryDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateApiaryDto: UpdateApiaryDto) {}

  // @Delete(':id')
  // remove(@Param('id') id: string) {}
}

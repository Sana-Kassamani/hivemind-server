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
  remove(@Param('id') id: string) {}
}

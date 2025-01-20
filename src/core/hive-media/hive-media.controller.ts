import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Res,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { HiveMediaService } from './hive-media.service';

@Controller('upload')
export class HiveMediaController {
  constructor(private hivesMediaService: HiveMediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) // Accept a file named 'image'
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Body() body: any,
  ) {
    return this.hivesMediaService.uploadFileToPrdict(
      file,
      res,
      body.hiveId,
      body.apiaryId,
    );
  }
}

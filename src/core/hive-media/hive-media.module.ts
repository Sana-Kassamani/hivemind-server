import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { HiveMediaController } from './hive-media.controller';
import { HiveMediaService } from './hive-media.service';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

// create 'uploads' file to root
const uploadDir = join(process.cwd(), 'uploads');

@Module({
  imports: [
    registerApiaryModel(),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        cb(null, true);
      },
    }),
  ],
  controllers: [HiveMediaController],
  providers: [HiveMediaService],
})
export class HiveMediaModule {}

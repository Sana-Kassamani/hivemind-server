import { Module } from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { ApiariesController } from './apiaries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apiary, ApiarySchema } from './schema/apiary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Apiary.name,
        schema: ApiarySchema,
      },
    ]),
  ],
  controllers: [ApiariesController],
  providers: [ApiariesService],
})
export class ApiariesModule {}

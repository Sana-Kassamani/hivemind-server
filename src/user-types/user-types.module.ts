import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserType, UserTypesSchema } from './schema/user-types.schema';
import { UserTypesController } from './user-types.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserType.name,
        schema: UserTypesSchema,
      },
    ]),
  ],
  controllers: [UserTypesController],
})
export class UserTypesModule {}

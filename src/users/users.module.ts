import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserTypesModule } from 'src/user-types/user-types.module';
import {
  UserType,
  UserTypesSchema,
} from 'src/user-types/schema/user-types.schema';
import { Owner, OwnerSchema } from './schema/owner.schema';
import { Beekeeper, BeekeeperSchema } from './schema/beekeeper.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.discriminator(Owner.name, OwnerSchema);
          schema.discriminator(Beekeeper.name, BeekeeperSchema);

          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

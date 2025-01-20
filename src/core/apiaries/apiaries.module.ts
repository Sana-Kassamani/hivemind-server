import { Module } from '@nestjs/common';
import { ApiariesService } from './apiaries.service';
import { ApiariesController } from './apiaries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apiary, ApiarySchema } from './schema/apiary.schema';
import { User, UserSchema } from '../users/schema/user.schema';
import { Owner, OwnerSchema } from '../users/schema/owner.schema';
import { Beekeeper, BeekeeperSchema } from '../users/schema/beekeeper.schema';
import { registerUserModel } from 'src/modelRegistration/user.model';
import { registerApiaryModel } from 'src/modelRegistration/apiary.model';

@Module({
  imports: [registerApiaryModel(), registerUserModel()],
  controllers: [ApiariesController],
  providers: [ApiariesService],
  exports: [ApiariesService],
})
export class ApiariesModule {}

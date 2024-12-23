import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';
import { registerUserModel } from 'src/modelRegistration/user.model';

@Module({
  imports: [registerUserModel()],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
})
export class UserSettingsModule {}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { SettingsType } from 'src/utils/enums/settingsType.enum';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserType } from 'src/utils/enums/userType.enum';
import { RoleGuard } from 'src/auth/guards/authorization.guard';

type setBan = {
  userId: string;
  state: boolean;
};
@Controller('user-settings')
export class UserSettingsController {
  constructor(private settingsService: UserSettingsService) {}

  @Get('darkmode/:state')
  setDarkmode(@Request() req, @Param('state') state: string) {
    return this.settingsService.toggleSettings(
      req.user,
      SettingsType.darkMode,
      state === '1' ? true : false,
    );
  }
  @Get('notifications/:state')
  setNotifications(@Request() req, @Param('state') state: string) {
    return this.settingsService.toggleSettings(
      req.user,
      SettingsType.notifications,
      state === '1' ? true : false,
    );
  }

  @Role(UserType.Admin)
  @UseGuards(RoleGuard)
  @Post('ban')
  setBan(@Body() setBan: setBan) {
    return this.settingsService.setBan(setBan.userId, setBan.state);
  }
}

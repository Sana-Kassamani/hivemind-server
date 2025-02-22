import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './core/users/users.module';
import { ApiariesModule } from './core/apiaries/apiaries.module';
import { TasksModule } from './core/tasks/tasks.module';
import { HivesModule } from './core/hives/hives.module';
import { HiveDetailsModule } from './core/hive-details/hive-details.module';
import { AuthModule } from './auth/auth.module';
import { UserSettingsModule } from './core/user-settings/user-settings.module';
import { NotificationsModule } from './core/notifications/notifications.module';
import configuration from './config/configuration';
import { HiveMediaModule } from './core/hive-media/hive-media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.connect'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ApiariesModule,
    TasksModule,
    HivesModule,
    HiveDetailsModule,
    AuthModule,
    UserSettingsModule,
    NotificationsModule,
    HiveMediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

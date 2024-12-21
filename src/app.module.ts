import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ApiariesModule } from './apiaries/apiaries.module';
import { TasksModule } from './tasks/tasks.module';
import { HivesModule } from './hives/hives.module';
import { HiveDetailsModule } from './hive-details/hive-details.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

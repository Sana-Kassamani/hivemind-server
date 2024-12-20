import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ApiariesModule } from './apiaries/apiaries.module';
import { UserTypesModule } from './user-types/user-types.module';
import { TasksModule } from './tasks/tasks.module';
import { HivesModule } from './hives/hives.module';
import { HiveDetailsModule } from './hive-details/hive-details.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECT),
    UsersModule,
    ApiariesModule,
    UserTypesModule,
    TasksModule,
    HivesModule,
    HiveDetailsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

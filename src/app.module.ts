import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ApiariesModule } from './apiaries/apiaries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECT),
    UsersModule,
    ApiariesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

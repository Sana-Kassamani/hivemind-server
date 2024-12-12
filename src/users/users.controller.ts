import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') //"users" here is the name of route to acces these apis
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }
}

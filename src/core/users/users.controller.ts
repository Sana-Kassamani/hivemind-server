import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import mongoose from 'mongoose';
import { Role } from 'src/auth/decorators/role.decorator';
import { UserType } from 'src/utils/enums/userType.enum';
import { AuthGuard } from 'src/auth/guards/authentication.guard';

@Controller('users') //"users" here is the name of route to acces these apis
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Role(UserType.Admin)
  @UseGuards(AuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('beekeepers')
  async getBeekeepers() {
    console.log('here');
    return await this.usersService.getBeekeepers();
  }
  //users/:id
  //not used for now
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    console.log(user.userType);
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await this.usersService.createUser(createUserDto);
  }
}

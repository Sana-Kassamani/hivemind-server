import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserType } from './schema/user-types.schema';
import { Model } from 'mongoose';
import { Response } from 'express';

@Controller('user-types')
export class UserTypesController {
  constructor(
    @InjectModel(UserType.name) private userTypesModel: Model<UserType>,
  ) {}
  @Post()
  async createUserType(@Body('name') name: string, @Res() res: Response) {
    const newUserType = await this.userTypesModel.create({ name: name });
    return res.status(HttpStatus.CREATED).json({
      newUserType,
      message: 'User type created succcessfully',
    });
  }
}

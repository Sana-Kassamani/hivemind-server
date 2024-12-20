import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { mongo } from 'mongoose';

type ModifiedUser = Omit<User, 'password'>;
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.getUserByUsername(loginDto.username);
    //TODO compare bcrypt
    if (user?.password !== loginDto.password)
      throw new UnauthorizedException('Invalid Credentials');
    const modifiedUser: ModifiedUser = (({ password, ...rest }) => rest)(
      user.toObject(),
    );
    return modifiedUser;
  }
  async login(loginDto: LoginDto) {
    const user: ModifiedUser = await this.validateUser(loginDto);
    const token = await this.jwtService.signAsync({ userId: user._id });
    return { user: user, token: token };
  }
}

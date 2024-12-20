import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.getUserByUsername(loginDto.username);
    //TODO compare bcrypt
    if (user?.password !== loginDto.password)
      throw new UnauthorizedException('Invalid Credentials');
    const modifiedUser = (({ password, ...rest }) => rest)(user.toObject());
    return modifiedUser;
  }
}

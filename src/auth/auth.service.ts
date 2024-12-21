import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { compare } from 'bcrypt';

type ModifiedUser = Omit<User, 'password'>;
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const user = await this.usersService.getUserByUsername(loginDto.username);
    const check = await compare(loginDto.password, user?.password ?? '');
    if (!user || !check) throw new UnauthorizedException('Invalid Credentials');
    const modifiedUser: ModifiedUser = (({ password, ...rest }) => rest)(
      user.toObject(),
    );
    return modifiedUser;
  }

  async login(loginDto: LoginDto) {
    const user: ModifiedUser = await this.validateUser(loginDto);
    const payload = {
      sub: user._id,
    };
    const token = await this.jwtService.signAsync(payload);
    return { user: user, token: token };
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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

  async signToken(user: ModifiedUser | User) {
    const payload = {
      sub: user._id,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async login(loginDto: LoginDto) {
    const user: ModifiedUser = await this.validateUser(loginDto);
    const token = await this.signToken(user);
    return { user, token };
  }

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const token = await this.signToken(user);
    return { user, token };
  }
}

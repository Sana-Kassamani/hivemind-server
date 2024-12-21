import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type ReqUser = {
  userId: string;
  role: string;
};
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization; // Bearer <token>
    if (!authHeader) throw new UnauthorizedException();
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token);
      const reqUser: ReqUser = {
        userId: payload.sub,
        role: payload.role,
      };
      request.user = reqUser;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

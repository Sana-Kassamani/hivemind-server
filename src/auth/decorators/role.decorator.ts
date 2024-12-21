import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/utils/enums/userType.enum';

export const ROLE_KEY = 'role';
export const Role = (role: UserType) => SetMetadata(ROLE_KEY, role);

import { SetMetadata } from '@nestjs/common';
import { UserRole } from './entities/user.entity';

export type AllowedRoles = keyof typeof UserRole | 'Any';

export const Role = (...args: AllowedRoles[]) => SetMetadata('roles', args);

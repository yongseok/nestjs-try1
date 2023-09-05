import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class EditProfileInput extends PartialType(User) {}

@ObjectType()
export class EditProfileOutput extends CoreOutput {}

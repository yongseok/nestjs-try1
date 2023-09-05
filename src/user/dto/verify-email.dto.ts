import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class VerifyEmailInput {
  @Field((type) => String)
  @IsString()
  @MinLength(36)
  code: string;
}

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}

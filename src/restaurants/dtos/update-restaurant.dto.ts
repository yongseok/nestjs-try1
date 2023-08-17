import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantInput } from './create-restaurant.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantInput,
) {}

@InputType()
export class UpdateRestaurantInput {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}

@ObjectType()
export class UpdateRestaurantOuput extends CoreOutput {}

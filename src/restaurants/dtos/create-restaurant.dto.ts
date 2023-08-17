import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurants.entity';
import { CoreOuput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, [
  'id',
  'owner',
]) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOuput {
  @Field((type) => Int)
  restaurantId?: number;
}

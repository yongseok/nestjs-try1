import { Field, InputType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CreateRestaurantInput extends OmitType(Restaurant, ['id']) {}

@ObjectType()
export class CreateRestaurantOutput {
  @Field((type) => Boolean)
  ok: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}

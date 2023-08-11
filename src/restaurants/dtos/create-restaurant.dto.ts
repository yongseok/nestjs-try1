import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CreateRestaurantsInput {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => String)
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @IsString()
  address: string;
}

@ObjectType()
export class CreateRestaurantsOutput {
  @Field((typep) => Boolean)
  ok: boolean;

  @Field((type) => String)
  error: string;

  @Field((type) => [Restaurant])
  restaurants: Restaurant[];
}

import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CreateRestaurantInput {
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

  @Field((type) => String)
  @IsString()
  ownerName: string;

  @Field((type) => String)
  @IsString()
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput {
  @Field((type) => Boolean)
  ok: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}

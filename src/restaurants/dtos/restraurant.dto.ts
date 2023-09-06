import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurants.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { IsNumber } from 'class-validator';

@InputType()
export class RestaurantInput {
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}

@InputType()
export class RestaurantsInput {
  @Field((type) => Number, { defaultValue: 1 })
  @IsNumber()
  page: number;
}

@ObjectType()
export class RestaurantsOutput extends CoreOutput {
  @Field((type) => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}

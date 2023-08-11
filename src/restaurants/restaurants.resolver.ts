import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantsInput,
  CreateRestaurantsOutput,
} from './dtos/create-restaurant.dto';

@Resolver()
export class RestaurantResolver {
  @Query((type) => [Restaurant])
  restaurants(@Args('name') name: string, @Args('isGood') isGood: boolean) {
    return [
      {
        name,
        isGood,
      },
    ];
  }
  @Mutation((type) => CreateRestaurantsOutput)
  createRestaurants(
    @Args('input') createRestaurantsInput: CreateRestaurantsInput,
  ) {
    return {
      ok: true,
      error: '',
    };
  }
}

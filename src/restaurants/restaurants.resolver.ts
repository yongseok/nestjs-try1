import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantsInput,
  CreateRestaurantsOutput,
} from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((type) => [Restaurant])
  async restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
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

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((type) => [Restaurant])
  async restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((type) => CreateRestaurantOutput)
  async createRestaurants(
    @Args('input') createRestaurantsInput: CreateRestaurantInput,
  ) {
    return this.restaurantService.createRestaurant(createRestaurantsInput);
  }
}

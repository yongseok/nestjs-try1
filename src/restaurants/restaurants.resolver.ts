import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';
import { UpdateRestaurantInput } from './dtos/update-restaurant.dto';
import { AuthUser } from 'src/Auth/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((returns) => [Restaurant])
  async restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => CreateRestaurantOutput)
  async createRestaurants(
    @AuthUser() owner: User,
    @Args('input') createRestaurantsInput: CreateRestaurantInput,
  ) {
    return this.restaurantService.createRestaurant(
      owner,
      createRestaurantsInput,
    );
  }

  @Mutation((returns) => CreateRestaurantOutput)
  async updateRestaurant(
    @Args('input') updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.updateRestaurant(updateRestaurantInput);
  }
}

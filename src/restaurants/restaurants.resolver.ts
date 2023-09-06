import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';
import {
  UpdateRestaurantInput,
  UpdateRestaurantOuput,
} from './dtos/update-restaurant.dto';
import { AuthUser } from 'src/Auth/auth-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Dish } from './entities/dish.entity';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import { MyRestaurantsOutput } from './dtos/my-restaurants.dto';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import { EditProfileOutput } from 'src/user/dto/edit-profile.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import {
  RestaurantInput,
  RestaurantOutput,
  RestaurantsInput,
  RestaurantsOutput,
} from './dtos/restraurant.dto';
import {
  SearchRestaurantOuput,
  SearchRestaurantInput,
} from './dtos/search-restaurant.dto';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((returns) => RestaurantsOutput)
  async restaurants(
    @Args('input') restaurantsInput: RestaurantsInput,
  ): Promise<RestaurantsOutput> {
    return this.restaurantService.allRrestaurants(restaurantsInput);
  }

  @Query((returns) => RestaurantOutput)
  async restaurant(
    @Args('input') restaurantInput: RestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.restaurant(restaurantInput);
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

  @Query((returns) => MyRestaurantsOutput)
  async myRestaurants(@AuthUser() user: User): Promise<MyRestaurantsOutput> {
    return this.restaurantService.myRestaurants(user);
  }

  @Mutation((returns) => EditRestaurantOutput)
  async editRestaurant(
    @AuthUser() user: User,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurant(user, editRestaurantInput);
  }

  @Mutation((returns) => DeleteRestaurantOutput)
  async deleteRestaurant(
    @AuthUser() user: User,
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
  ) {
    return this.restaurantService.deleteRestaurant(user, deleteRestaurantInput);
  }

  @Mutation((returns) => UpdateRestaurantOuput)
  async updateRestaurant(
    @Args('input') updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateRestaurantOuput> {
    return this.restaurantService.updateRestaurant(updateRestaurantInput);
  }

  @Query((returns) => SearchRestaurantOuput)
  async SearchRestaurant(
    @Args('input') searchRestaurantInput: SearchRestaurantInput,
  ): Promise<SearchRestaurantOuput> {
    return this.restaurantService.searchRestaurant(searchRestaurantInput);
  }
}

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((type) => CreateDishOutput)
  createDish(
    @AuthUser() owner: User,
    @Args('input') createDishInput: CreateDishInput,
  ) {
    return this.restaurantService.createDish(owner, createDishInput);
  }

  @Mutation((type) => EditDishOutput)
  async editDish(
    @AuthUser() owner: User,
    @Args('input') editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    return this.restaurantService.editDish(owner, editDishInput);
  }

  @Mutation((type) => DeleteDishOutput)
  deleteDish(
    @AuthUser() owner: User,
    @Args('input') deleteDishInput: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    return this.restaurantService.deleteDish(owner, deleteDishInput);
  }
}

import { Restaurant } from './entities/restaurants.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateRestaurantInput,
  UpdateRestaurantOuput,
} from './dtos/update-restaurant.dto';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { CategoryRepository } from './category.repository';
import { User } from 'src/user/entities/user.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
  ) {
    this.categories.HelloWorld();
  }

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;

      console.log(
        '🚀 | file: restaurants.service.ts:40 | categories:',
        this.categories,
      );

      const category: Category = await this.categories.getOrCreate(
        createRestaurantInput.name,
      );

      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);

      return {
        ok: true,
        restaurantId: newRestaurant.id,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: 'Could not create Restaurant',
      };
    }
  }

  async updateRestaurant({
    id,
    data,
  }: UpdateRestaurantInput): Promise<UpdateRestaurantOuput> {
    try {
      await this.restaurants.update(id, { ...data });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not update Restaurant',
      };
    }
  }

  async editRestaurant() {}
  async deleteRestaurant() {}
  async allCategories() {
    this.categories.find();
  }
  async countRestaurants() {}
  async findCategoryBySlug() {}
  async searhRestaurantByName() {}
}

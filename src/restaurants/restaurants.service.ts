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
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { Dish } from './entities/dish.entity';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
    @InjectRepository(Dish) private readonly dishs: Repository<Dish>,
  ) {
    this.categories.HelloWorld();
  }

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find({
      relations: ['menu'],
    });
  }

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;

      const category: Category = await this.categories.getOrCreate(
        createRestaurantInput.category.name,
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

  async createDish(
    owner: User,
    createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: createDishInput.restaurantId },
      });

      if (!restaurant) {
        return {
          ok: false,
          error: 'Could not create dish.',
        };
      }

      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: 'Could not math id.',
        };
      }

      await this.dishs.save(
        this.dishs.create({ ...createDishInput, restaurant }),
      );

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async editDish(
    owner: User,
    editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    try {
      const dish: Dish = await this.dishs.findOne({
        where: { id: editDishInput.dishId },
        relations: ['restaurant'],
      });
      if (!dish) {
        return {
          ok: false,
          error: 'Could not found dish.',
        };
      }
      if (owner.id !== dish.restaurant.ownerId) {
        return {
          ok: false,
          error: 'Could not math id.',
        };
      }
      this.dishs.save({ ...dish, ...editDishInput });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Could not edit dish.',
      };
    }
  }

  async deleteDish(
    owner: User,
    { dishId }: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    try {
      const dish = await this.dishs.findOne({
        where: { id: dishId },
        relations: ['restaurant'],
      });
      if (!dish) {
        return {
          ok: false,
          error: 'Could not found dish.',
        };
      }
      if (owner.id !== dish.restaurant.ownerId) {
        return {
          ok: false,
          error: 'Could not math id.',
        };
      }
      await this.dishs.delete(dishId);
      return {
        ok: true,
      };
    } catch (e) {
      console.log('🚀 | file: restaurants.service.ts:188 | e:', e);
      return {
        ok: false,
        error: 'Could not delete dish.',
      };
    }
  }
}

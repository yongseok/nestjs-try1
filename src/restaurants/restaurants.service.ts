import { Restaurant } from './entities/restaurants.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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
import { MyRestaurantsOutput } from './dtos/my-restaurants.dto';
import {
  RestaurantInput,
  RestaurantOutput,
  RestaurantsInput,
  RestaurantsOutput,
} from './dtos/restraurant.dto';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { when } from 'joi';
import {
  SearchRestaurantInput,
  SearchRestaurantOuput,
} from './dtos/search-restaurant.dto';
import { Role } from 'src/user/role.decorator';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepo: Repository<Restaurant>,
    private readonly categories: CategoryRepository,
    @InjectRepository(Dish) private readonly dishs: Repository<Dish>,
  ) {}

  async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurantsRepo.create(createRestaurantInput);
      newRestaurant.owner = owner;

      const category: Category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );

      newRestaurant.category = category;
      await this.restaurantsRepo.save(newRestaurant);

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

  async myRestaurants(owner: User): Promise<MyRestaurantsOutput> {
    try {
      // NOTE: 아래 조회 시 에러 발생하여 QueryBuilder를 사용하도록 변경함. 에러 발생 원인을 알수 없으며, typeorm 로그의 쿼리문을 직접 실행시에는 정상 조회 됨.
      // error: EntityPropertyNotFoundError: Property "ownerId" was not found in "Restaurant". Make sure your query is correct.
      // const restaurants = await this.restaurants.find({
      //   where: { ownerId: owner.id },
      //   relations: ['owner'],
      // });

      const restaurants = await this.restaurantsRepo
        .createQueryBuilder('restaurant')
        .where('restaurant.ownerId = :ownerId', { ownerId: owner.id })
        .leftJoinAndSelect('restaurant.category', 'category')
        // .leftJoinAndSelect('restaurant.owner', 'user')
        // .leftJoinAndSelect('restaurant.orders', 'orders')
        // .leftJoinAndSelect('restaurant.menu', 'dish')
        .getMany();

      if (!restaurants) {
        return {
          ok: false,
          error: 'could not find restaurants.',
        };
      }
      return {
        ok: true,
        restaurants,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not found restaturants.',
      };
    }
  }

  async editRestaurant(
    user: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurantsRepo.findOne({
        where: { id: editRestaurantInput.id },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'Could not found restaurant',
        };
      }
      if (restaurant.ownerId !== user.id) {
        return {
          ok: false,
          error: 'Do not have permission.',
        };
      }
      // 카테고리 수정 또는 생성
      const category: Category = await this.categories.getOrCreate(
        editRestaurantInput.categoryName,
      );
      console.log(
        '🚀 | file: restaurants.service.ts:125 | restaurant:',
        restaurant,
      );
      console.log(
        '🚀 | file: restaurants.service.ts:134 | category:',
        category,
      );
      // 레스토랑 업데이트
      await this.restaurantsRepo.save(
        this.restaurantsRepo.create({
          ...restaurant,
          ...editRestaurantInput,
          ...(category && { category }),
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not edit restaurants.',
      };
    }
  }

  async deleteRestaurant(
    { id: userId }: User,
    { id }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    console.log('🚀 | file: restaurants.service.ts:170 | userId:', userId);
    try {
      const restaurant = await this.restaurantsRepo.findOne({
        where: { id },
      });
      if (!restaurant) {
        return {
          ok: false,
          error: 'It is a restaurant that does not exist.',
        };
      }
      if (userId !== restaurant.ownerId) {
        return {
          ok: false,
          error: 'You do not have permission to delete.',
        };
      }
      await this.restaurantsRepo.delete(id);
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not delete Restaurant.',
      };
    }
  }

  async restaurant({
    restaurantId: id,
  }: RestaurantInput): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurantsRepo.findOne({
        where: { id },
        relations: ['owner.restaurants'],
      });
      console.log(
        '🚀 | file: restaurants.service.ts:207 | restaurant:',
        restaurant,
      );
      if (!restaurant) {
        return {
          ok: false,
          error: 'It is a restaurant that does not exist.',
        };
      }
      return {
        ok: true,
        restaurant,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: 'Could not searched restaurant',
      };
    }
  }

  async allRrestaurants({
    page,
  }: RestaurantsInput): Promise<RestaurantsOutput> {
    try {
      const countOfPage = 2;
      const restaurants = await this.restaurantsRepo.find({
        skip: countOfPage * (page - 1),
        take: countOfPage,
      });
      return {
        ok: true,
        restaurants,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: `Could not found restaurants: [Page: ${page}]`,
      };
    }
  }

  async searchRestaurant({
    query,
    page,
  }: SearchRestaurantInput): Promise<SearchRestaurantOuput> {
    try {
      const countOfPage = 2;
      const restaurants = await this.restaurantsRepo.find({
        where: {
          name: Raw((name) => `${name} ILIKE '%${query}%'`),
        },
        take: countOfPage,
        skip: countOfPage * (page - 1),
      });
      return {
        ok: true,
        restaurants,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: `Could not search Restaurant: [${query}]`,
      };
    }
  }

  async updateRestaurant({
    id,
    data,
  }: UpdateRestaurantInput): Promise<UpdateRestaurantOuput> {
    try {
      await this.restaurantsRepo.update(id, { ...data });
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

  async createDish(
    owner: User,
    createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    try {
      const restaurant = await this.restaurantsRepo.findOne({
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
